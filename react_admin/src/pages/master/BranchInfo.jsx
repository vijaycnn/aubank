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

    regionalOfficer       : "",
    regionalName          : "",
    regionalAddress       : "",  
    regionalContactNumber : "",
    regionalEmail         : "",

    regionalOfficerHindi  : "",
    regionalNameHindi     : "",
    regionalAddressHindi  : "",
    regionalContactNumberHindi  : "",
    regionalEmailHindi    : "",

    principalOfficer      : "",
    principalName         : "",
    principalAddress      : "",
    principalContactNumber      : "",
    principalEmail        : "",

    principalOfficerHindi : "",
    principalNameHindi    : "",
    principalAddressHindi : "",
    principalContactNumberHindi : "",
    principalEmailHindi   : "",

    complainUrl           : "",
    complainEmail         : "",
    complainAddress       : "",  
    complainUrlHindi      : "",
    complainEmailHindi    : "",
    complainAddressHindi  : "",


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

        regionalOfficer       : previousData.regionalOfficer,
        regionalName          : previousData.regionalName,
        regionalAddress       : previousData.regionalAddress,  
        regionalContactNumber : previousData.regionalContactNumber,
        regionalEmail         : previousData.regionalEmail,

        regionalOfficerHindi  : previousData.regionalOfficerHindi,
        regionalNameHindi     : previousData.regionalNameHindi,
        regionalAddressHindi  : previousData.regionalAddressHindi,
        regionalContactNumberHindi  : previousData.regionalContactNumberHindi,
        regionalEmailHindi    : previousData.regionalEmailHindi,

        principalOfficer      : previousData.principalOfficer,
        principalName         : previousData.principalName,
        principalAddress      : previousData.principalAddress,
        principalContactNumber      : previousData.principalContactNumber,
        principalEmail        : previousData.principalEmail,

        principalOfficerHindi : previousData.principalOfficerHindi,
        principalNameHindi    : previousData.principalNameHindi,
        principalAddressHindi : previousData.principalAddressHindi,
        principalContactNumberHindi : previousData.principalContactNumberHindi,
        principalEmailHindi   : previousData.principalEmailHindi,

        complainUrl           : previousData.complainUrl,
        complainEmail         : previousData.complainEmail,
        complainAddress       : previousData.complainAddress,  
        complainUrlHindi      : previousData.complainUrlHindi,
        complainEmailHindi    : previousData.complainEmailHindi,
        complainAddressHindi  : previousData.complainAddressHindi,


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
                    onChange={handleChange} maxLength={10}
                />

                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={data.email}
                    onChange={handleChange}  maxLength={55}
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
                    className="form-control mb-3"  maxLength={10}
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
                    className="form-control mb-3"  maxLength={55}
                    />

            </div>
            <div className="col-md-6 mb-2">
                In case of non-resolution of grievances within 7 days to your satisfaction, our customers may escalate their grievance to the Regional Nodal Officer(s) and thereafter to the Principal Nodal Officer after expiry of further 7 days. .
            </div>
            <div className="col-md-6 mb-2">
                यदि आपकी शिकायत ७ दिनो के भीतर हल नही होती हैं, तो आप हमारे क्षेत्रीए नोडल अधिकारी से संपर्क कर सकते हैं। अतिरिक्त ७ दिन की समाप्ति के बाद प्रमुख नोडल अिधकारी से संपर्क किया जा सकता है |
            </div>
            {/* English */}
            <div className="col-md-6">
                <input
                    type="text"
                    name="regionalOfficer"
                    placeholder="Regional Nodal Officer"
                    className="form-control mb-3"
                    value={data.regionalOfficer}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="regionalName"
                    placeholder="Name"
                    className="form-control mb-3"
                    value={data.regionalName}
                    onChange={handleChange}
                />

                <textarea
                    name="regionalAddress"
                    placeholder="Address"
                    className="form-control mb-3"
                    value={data.regionalAddress}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="regionalContactNumber"
                    placeholder="Contact Number"
                    className="form-control mb-3"
                    value={data.regionalContactNumber}
                    onChange={handleChange}  maxLength={10}
                />

                <input
                    type="text"
                    name="regionalEmail"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={data.regionalEmail}
                    onChange={handleChange}  maxLength={55}
                />
            </div>
            {/* Hindi */}        
            <div className="col-md-6">
                <ReactTransliterate
                    placeholder="क्षेत्रीय नोडल अधिकारी"
                    value={data.regionalOfficerHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        regionalOfficerHindi: text,
                        })
                    }
                    lang="hi" name="regionalOfficerHindi"
                    className="form-control mb-3"
                    />
                <ReactTransliterate
                    placeholder="नाम"
                    value={data.regionalNameHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        regionalNameHindi: text,
                        })
                    }
                    lang="hi" name="regionalNameHindi"
                    className="form-control mb-3"
                    />

                <ReactTransliterate
                    placeholder="पता"
                    value={data.regionalAddressHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        regionalAddressHindi: text,
                        })
                    }
                    lang="hi" name="regionalAddressHindi"
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
                    value={data.regionalContactNumberHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        regionalContactNumberHindi: text,
                        })
                    }
                    lang="hi" name="regionalContactNumberHindi"
                    className="form-control mb-3"  maxLength={10}
                />

                <ReactTransliterate
                    placeholder="ईमेल आईडी"
                    value={data.regionalEmailHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        regionalEmailHindi: text,
                        })
                    }
                    lang="hi" name="regionalEmailHindi"
                    className="form-control mb-3"  maxLength={55}
                    />

            </div>
            {/* English */}
            <div className="col-md-6">
                <input
                    type="text"
                    name="principalOfficer"
                    placeholder="Principal Nodal Officer"
                    className="form-control mb-3"
                    value={data.principalOfficer}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="principalName"
                    placeholder="Name"
                    className="form-control mb-3"
                    value={data.principalName}
                    onChange={handleChange}
                />

                <textarea
                    name="principalAddress"
                    placeholder="Address"
                    className="form-control mb-3"
                    value={data.principalAddress}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="principalContactNumber"
                    placeholder="Contact Number"
                    className="form-control mb-3"
                    value={data.principalContactNumber}
                    onChange={handleChange} maxLength={10}
                />

                <input
                    type="text"
                    name="principalEmail"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={data.principalEmail}
                    onChange={handleChange} maxLength={55}
                />
            </div>
            {/* Hindi */}        
            <div className="col-md-6">
                <ReactTransliterate
                    placeholder="प्रधान नोडल अधिकारी"
                    value={data.principalOfficerHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        principalOfficerHindi: text,
                        })
                    }
                    lang="hi" name="principalOfficerHindi"
                    className="form-control mb-3"
                    />
                <ReactTransliterate
                    placeholder="नाम"
                    value={data.principalNameHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        principalNameHindi: text,
                        })
                    }
                    lang="hi" name="principalNameHindi"
                    className="form-control mb-3"
                    />

                <ReactTransliterate
                    placeholder="पता"
                    value={data.principalAddressHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        principalAddressHindi: text,
                        })
                    }
                    lang="hi" name="principalAddressHindi"
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
                    value={data.principalContactNumberHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        principalContactNumberHindi: text,
                        })
                    }
                    lang="hi" name="principalContactNumberHindi"
                    className="form-control mb-3" maxLength={10}
                />

                <ReactTransliterate
                    placeholder="ईमेल आईडी"
                    value={data.principalEmailHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        principalEmailHindi: text,
                        })
                    }
                    lang="hi" name="principalEmailHindi"
                    className="form-control mb-3" maxLength={55}
                    />

            </div>
            <hr/>
            <div className="col-md-6 mb-2">
                Complaint can be lodged through below details.
            </div>
            <div className="col-md-6 mb-2">
                निम्नलिखित विवरण के माध्यम से शिकायत दर्ज की जा सकती है 
            </div>
            {/* English */}
            <div className="col-md-6">
                <input
                    type="text"
                    name="complainUrl"
                    placeholder="URL"
                    className="form-control mb-3"
                    value={data.complainUrl}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="complainEmail"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={data.complainEmail}
                    onChange={handleChange} maxLength={55}
                />

                <input
                    type="text"
                    name="complainAddress"
                    placeholder="Address"
                    className="form-control mb-3"
                    value={data.complainAddress}
                    onChange={handleChange}
                />
            </div>
            {/* Hindi */}        
            <div className="col-md-6">
                <ReactTransliterate
                    placeholder="यू. आर. एल."
                    value={data.complainUrlHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        complainUrlHindi: text,
                        })
                    }
                    lang="hi" name="complainUrlHindi"
                    className="form-control mb-3"
                    />
                <ReactTransliterate
                    placeholder="ईमेल आईडी"
                    value={data.complainEmailHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        complainEmailHindi: text,
                        })
                    }
                    lang="hi" name="complainEmailHindi"
                    className="form-control mb-3" maxLength={55}
                    />

                <ReactTransliterate
                    placeholder="पता"
                    value={data.complainAddressHindi}
                    onChangeText={(text) =>
                        setData({
                        ...data,
                        complainAddressHindi: text,
                        })
                    }
                    lang="hi" name="complainAddressHindi"
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
