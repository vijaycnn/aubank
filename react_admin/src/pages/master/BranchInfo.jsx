import {
  Container,
  Alert,
  Form,
  Badge,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../helper/constants/axiosInstance";
import { decode as base64_decode, encode as base64_encode } from "base-64";
const adminAlias = import.meta.env.VITE_API_ADMIN_ALIAS;
const baseURL = import.meta.env.VITE_API_BASE_URL_BACKEND + "/api";
import { ReactTransliterate } from "react-transliterate";

function BranchInfo() {
  const params = useParams();
  const decode = base64_decode(params.id);
  let id = decode.split("+")[1];
  id = parseInt(id);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const [previousData, setPreviousData] = useState(null);

  const getBranchDetails = async () => {
    setLoading(true);
    setPreviousData(null);
    await axiosInstance
      .get(`/branch/getDetailById/${id}`)
      .then((response) => {
        // console.log(">>> ", response.data);
        setLoading(false);
        if (response.data.status === "success") {
          setPreviousData(response?.data?.data);
        }
      })
      .catch((error) => {
        // console.log('>>> ', error.status, error);
        if (error.status === 403) {
          handleLogout();
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    getBranchDetails();
  }, []);

  const [data, setData] = useState({
    managerName: "",
    managerNameHindi: "",

    address: "",
    addressHindi: "",

    contactNumber: "",
    contactNumberHindi: "",

    email: "",
    emailHindi: "",
  });
  useEffect(() => {
    if (previousData) {
      setData({
        managerName: previousData.managerName,
        managerNameHindi: previousData.managerNameHindi,
        
        address: previousData.address,
        addressHindi: previousData.addressHindi,

        contactNumber: previousData.contactNumber,
        contactNumberHindi: previousData.contactNumberHindi,

        email: previousData.email,
        emailHindi: previousData.emailHindi,
      });
    }
  }, [previousData]);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validation = (values) => {
    setError("");
    let hasError = false;
    
    if (!values.branchCode || values.branchCode == "" ) {
      setError("Branch Code field is missing");
      hasError = true;
    }else if((!values.serialNumber || values.serialNumber == "")){
      setError("SerialNumber field is missing");
      hasError = true;
    }
    return hasError;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsSubmit(true);
    // console.log("formData >>", formData);
    try {
      if (id > 0) {
        setLoading(true);
        let detailId = previousData?.id;
        let body = {
            branchId: id, detailId, data
        };
        await axiosInstance
        .post(`/branch/updateBranchInfo`, body)
        .then((response) => {
            // console.log('response >>> ', response.data);
            if (response.data.status === "success") {
            setData({});
            setSuccessMsg(response?.data?.message);
            setLoading(false);
            setTimeout(() => {
                navigate(`${adminAlias}/branches`);
            }, 2000);
            } else if (response.data.status === "error") {
                setError(response.data.message);
            }
        })
        .catch((error) => {
            // console.log(">>> ", error);
            if (error.status === 403) {
            handleLogout();
            }
            setLoading(false);
            setIsSubmit(false);
        });
        setLoading(false);
      }
      setIsSubmit(false);
    } catch (error) {
      // console.log("Catch Err >>", error);
      setError(error.message);
      alert(error.message);
      setLoading(false);
      setIsSubmit(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    localStorage.clear("auth-token");
    localStorage.clear();
    navigate(adminAlias);
  };

  return (
    <>
      {loading == true ? (
        <>
          <div className="loader">
            <div className="loader-spinner"></div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1 className="h4 mb-0 font-secondary fw-medium">GRIEVANCE REDRESSAL MECHANISM</h1>
        <div>
          <Link to={`${adminAlias}/branches`} className="btn btn-primary btn-sm">
            <span className="nav-link-text">Back</span>
          </Link>
        </div>
      </div>
      <div className="table-view bg-white rounded-4 p-4">
        {error && <Alert variant="danger">⚠️{error}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Form
          onSubmit={handleSubmit}
          className="login-form p-xl-0 p-md-5 p-4 col-xl-12 m-auto"
        >
          {/* <Alert alert={alert} /> */}
            
          <Row>
            {/* <Col md={6}>
                <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                    Branch Code<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    name="branchCode"
                    value={data.branchCode}
                    placeholder="Enter Here" 
                    onChange={handleChange}
                />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                    Serial Number
                </Form.Label>
                <Form.Control
                  type="text"
                  name="serialNumber"
                  value={data.serialNumber}
                  placeholder="Enter Here"
                  onChange={handleChange}
                />
                </Form.Group>
            </Col> */}
            <div className="col-md-12 mb-2 justify text-center">
                <h2>NOTICE</h2>
            </div>
            <div className="col-md-6 mb-2">
                While we always strive to provide the best of customer service, there may be occasions, when our customers’ requirement might not be fully met. Such incidents may please be brought to the notice of the Branch Manager.
            </div>
            <div className="col-md-6 mb-2">
                हम हमेशा सर्वश्रेष्ठ ग्राहक सेवा प्रदान करने का प्रयास करते हैं, परन्तु कई बार ऐसे अवसर हो सकते है, जब हमारे ग्राहकों की आवश्यकताओं को पूरा नही किया गया है। ऐसी घटनाओं को कृपया शाखा प्रबंधक के ध्यान में लेकर आये।
            </div>

                {/* English */}
            <div className="col-md-6">

                <input
                    type="text"
                    name="managerName"
                    placeholder="Branch Manager Name"
                    className="form-control mb-3"
                    value={data.managerName}
                    onChange={handleChange}
                />

                <textarea
                    name="address"
                    placeholder="Address"
                    className="form-control mb-3"
                    value={data.address}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    className="form-control mb-3"
                    value={data.contactNumber}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={data.email}
                    onChange={handleChange}
                />
            </div>

            {/* Hindi */}
            <div className="col-md-6">

                <ReactTransliterate
                    placeholder="शाखा प्रबंधक का नाम"
                    value={data.managerNameHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        managerNameHindi: text,
                        })
                    }
                    lang="hi" name="managerNameHindi"
                    className="form-control mb-3"
                    />

                <ReactTransliterate
                    placeholder="पता"
                    value={data.addressHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        addressHindi: text,
                        })
                    }
                    lang="hi" name="addressHindi"
                    className="form-control mb-3"
                    renderComponent={(props) => (
                        <textarea
                        {...props}
                        rows={4}
                        className="form-control mb-3"
                        placeholder="पता"
                        />
                    )}
                />

                <ReactTransliterate
                    placeholder="संपर्क संख्या"
                    value={data.contactNumberHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        contactNumberHindi: text,
                        })
                    }
                    lang="hi" name="contactNumberHindi"
                    className="form-control mb-3"
                />

                <ReactTransliterate
                    placeholder="ईमेल आईडी"
                    value={data.emailHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        emailHindi: text,
                        })
                    }
                    lang="hi" name="emailHindi"
                    className="form-control mb-3"
                    />

            </div>
                        
            <Col md={12}>
                <Form.Group className="text-end">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmit}
                    className="pill"
                    size="lg"
                >
                    <span>Submit</span>
                </Button>
                </Form.Group>
            </Col>
            </Row>

            
        </Form>
      </div>
    </>
  );
}

export default BranchInfo;
