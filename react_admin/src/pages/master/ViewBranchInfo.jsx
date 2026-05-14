import {
  Container,
  Alert,
  Form,
  Badge,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import sign from "../../assets/sign.jpg";
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
  const navigate = useNavigate();
  const [previousData, setPreviousData] = useState(null);

  const getBranchDetails = async () => {
    setLoading(true);
    setPreviousData(null);
    await axiosInstance
      .get(`/branch/getBranchDetailById/${id}`)
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

    regionalOfficer: "",
    regionalName: "",
    regionalAddress: "",
    regionalContactNumber: "",
    regionalEmail: "",

    regionalOfficerHindi: "",
    regionalNameHindi: "",
    regionalAddressHindi: "",
    regionalContactNumberHindi: "",
    regionalEmailHindi: "",

    principalOfficer: "",
    principalName: "",
    principalAddress: "",
    principalContactNumber: "",
    principalEmail: "",

    principalOfficerHindi: "",
    principalNameHindi: "",
    principalAddressHindi: "",
    principalContactNumberHindi: "",
    principalEmailHindi: "",

    complainUrl: "",
    complainEmail: "",
    complainAddress: "",
    complainUrlHindi: "",
    complainEmailHindi: "",
    complainAddressHindi: "",

    officerName : "",
    branchName : "",
    branchMangerName : "",
    branchMangerContact : "",
    branchServiceMangerName : "",
    branchServiceMangerContact : "",
    policeName : "",
    policeContact : "",
    fireName : "",
    fireContact : "",
    hospitalName : "",
    hospitalContact : "",
    ambulanceName : "",
    ambulanceContact : "",

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

        regionalOfficer: previousData.regionalOfficer,
        regionalName: previousData.regionalName,
        regionalAddress: previousData.regionalAddress,
        regionalContactNumber: previousData.regionalContactNumber,
        regionalEmail: previousData.regionalEmail,

        regionalOfficerHindi: previousData.regionalOfficerHindi,
        regionalNameHindi: previousData.regionalNameHindi,
        regionalAddressHindi: previousData.regionalAddressHindi,
        regionalContactNumberHindi: previousData.regionalContactNumberHindi,
        regionalEmailHindi: previousData.regionalEmailHindi,

        principalOfficer: previousData.principalOfficer,
        principalName: previousData.principalName,
        principalAddress: previousData.principalAddress,
        principalContactNumber: previousData.principalContactNumber,
        principalEmail: previousData.principalEmail,

        principalOfficerHindi: previousData.principalOfficerHindi,
        principalNameHindi: previousData.principalNameHindi,
        principalAddressHindi: previousData.principalAddressHindi,
        principalContactNumberHindi: previousData.principalContactNumberHindi,
        principalEmailHindi: previousData.principalEmailHindi,

        complainUrl: previousData.complainUrl,
        complainEmail: previousData.complainEmail,
        complainAddress: previousData.complainAddress,
        complainUrlHindi: previousData.complainUrlHindi,
        complainEmailHindi: previousData.complainEmailHindi,
        complainAddressHindi: previousData.complainAddressHindi,

        officerName : previousData.officerName,
        branchName : previousData.branchName,
        branchMangerName : previousData.branchMangerName,
        branchMangerContact : previousData.branchMangerContact,
        branchServiceMangerName : previousData.branchServiceMangerName,
        branchServiceMangerContact : previousData.branchServiceMangerContact,
        policeName : previousData.policeName,
        policeContact : previousData.policeContact,
        fireName : previousData.fireName,
        fireContact : previousData.fireContact,
        hospitalName : previousData.hospitalName,
        hospitalContact : previousData.hospitalContact,
        ambulanceName : previousData.ambulanceName,
        ambulanceContact : previousData.ambulanceContact,

      });
    }
  }, [previousData]);

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
        <h1 className="h4 mb-0 font-secondary fw-medium">
          GRIEVANCE REDRESSAL MECHANISM
        </h1>
        <div>
          {/* <Link
            to={`${adminAlias}/branches`}
            className="btn btn-primary btn-sm"
          >
            <span className="nav-link-text">Back</span>
          </Link> */}
        </div>
      </div>
      <div className="table-view bg-white rounded-4 p-4">
        {error && <Alert variant="danger">⚠️{error}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Form className="login-form p-xl-0 p-md-5 p-4 col-xl-12 m-auto" >
          <Row>
            <div className="col-md-12 mb-2 justify text-center">
              <h2>Notice - C</h2>
            </div>
            <Col md={6} className="mb-4 fw-bold">
              While we always strive to provide the best of customer service,
              there may be occasions, when our customers’ requirement might not
              be fully met. Such incidents may please be brought to the notice
              of the Branch Manager.
            </Col>
            <Col md={6} className="mb-4 fw-bold">
              हम हमेशा सर्वश्रेष्ठ ग्राहक सेवा प्रदान करने का प्रयास करते हैं,
              परन्तु कई बार ऐसे अवसर हो सकते है, जब हमारे ग्राहकों की आवश्यकताओं
              को पूरा नही किया गया है। ऐसी घटनाओं को कृपया शाखा प्रबंधक के ध्यान
              में लेकर आये।
            </Col>

            {/* English */}
            <div className="col-md-6">
              <input
                type="text"
                name="managerName"
                placeholder="Branch Manager Name"
                className="form-control mb-3"
                value={data.managerName}
                disabled 
              />

              <textarea
                name="address"
                placeholder="Address"
                className="form-control mb-3"
                value={data.address}
                disabled
              />

              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                className="form-control mb-3"
                value={data.contactNumber}
                disabled
                maxLength={10}
              />

              <input
                type="text"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                value={data.email}
                disabled
                maxLength={55}
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
                lang="hi"
                name="managerNameHindi"
                className="form-control mb-3" disabled
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
                lang="hi"
                name="addressHindi"
                className="form-control mb-3"
                renderComponent={(props) => (
                  <textarea
                    {...props}
                    rows={4}
                    className="form-control mb-3"
                    placeholder="पता" disabled
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
                lang="hi"
                name="contactNumberHindi"
                className="form-control mb-3"
                maxLength={10} disabled
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
                lang="hi"
                name="emailHindi"
                className="form-control mb-3"
                maxLength={55} disabled
              />
            </div>
            <Col md={6} className="mb-4 fw-bold">
              In case of non-resolution of grievances within 7 days to your
              satisfaction, our customers may escalate their grievance to the
              Regional Nodal Officer(s) and thereafter to the Principal Nodal
              Officer after expiry of further 7 days. .
            </Col>
            <Col md={6} className="mb-4 fw-bold">
              यदि आपकी शिकायत ७ दिनो के भीतर हल नही होती हैं, तो आप हमारे
              क्षेत्रीए नोडल अधिकारी से संपर्क कर सकते हैं। अतिरिक्त ७ दिन की
              समाप्ति के बाद प्रमुख नोडल अिधकारी से संपर्क किया जा सकता है |
            </Col>
            {/* English */}
            <div className="col-md-6">
              <input
                type="text"
                name="regionalOfficer"
                placeholder="Regional Nodal Officer"
                className="form-control mb-3"
                value={data.regionalOfficer}
                disabled
              />

              <input
                type="text"
                name="regionalName"
                placeholder="Name"
                className="form-control mb-3"
                value={data.regionalName}
                disabled
              />

              <textarea
                name="regionalAddress"
                placeholder="Address"
                className="form-control mb-3"
                value={data.regionalAddress}
                disabled
              />

              <input
                type="text"
                name="regionalContactNumber"
                placeholder="Contact Number"
                className="form-control mb-3"
                value={data.regionalContactNumber}
                disabled
                maxLength={10}
              />

              <input
                type="text"
                name="regionalEmail"
                placeholder="Email"
                className="form-control mb-3"
                value={data.regionalEmail}
                disabled
                maxLength={55}
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
                lang="hi"
                name="regionalOfficerHindi"
                className="form-control mb-3" disabled
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
                lang="hi"
                name="regionalNameHindi"
                className="form-control mb-3" disabled
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
                lang="hi"
                name="regionalAddressHindi"
                className="form-control mb-3"
                renderComponent={(props) => (
                  <textarea
                    {...props}
                    rows={4}
                    className="form-control mb-3"
                    placeholder="पता" disabled
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
                lang="hi"
                name="regionalContactNumberHindi"
                className="form-control mb-3"
                maxLength={10} disabled
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
                lang="hi"
                name="regionalEmailHindi"
                className="form-control mb-3"
                maxLength={55} disabled
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
                disabled
              />

              <input
                type="text"
                name="principalName"
                placeholder="Name"
                className="form-control mb-3"
                value={data.principalName}
                disabled
              />

              <textarea
                name="principalAddress"
                placeholder="Address"
                className="form-control mb-3"
                value={data.principalAddress}
                disabled
              />

              <input
                type="text"
                name="principalContactNumber"
                placeholder="Contact Number"
                className="form-control mb-3"
                value={data.principalContactNumber}
                disabled
                maxLength={10}
              />

              <input
                type="text"
                name="principalEmail"
                placeholder="Email"
                className="form-control mb-3"
                value={data.principalEmail}
                disabled
                maxLength={55}
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
                lang="hi"
                name="principalOfficerHindi"
                className="form-control mb-3" disabled
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
                lang="hi"
                name="principalNameHindi"
                className="form-control mb-3" disabled
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
                lang="hi"
                name="principalAddressHindi"
                className="form-control mb-3"
                renderComponent={(props) => (
                  <textarea
                    {...props}
                    rows={4}
                    className="form-control mb-3"
                    placeholder="पता" disabled
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
                lang="hi"
                name="principalContactNumberHindi"
                className="form-control mb-3"
                maxLength={10} disabled
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
                lang="hi"
                name="principalEmailHindi"
                className="form-control mb-3"
                maxLength={55} disabled
              />
            </div>
            <hr />
            <Col md={6} className="mb-4 fw-bold">
              Complaint can be lodged through below details.
            </Col>
            <Col md={6} className="mb-4 fw-bold">
              निम्नलिखित विवरण के माध्यम से शिकायत दर्ज की जा सकती है
            </Col>
            {/* English */}
            <div className="col-md-6">
              <input
                type="text"
                name="complainUrl"
                placeholder="URL"
                className="form-control mb-3"
                value={data.complainUrl}
                disabled
              />

              <input
                type="text"
                name="complainEmail"
                placeholder="Email"
                className="form-control mb-3"
                value={data.complainEmail}
                disabled
                maxLength={55}
              />

              <input
                type="text"
                name="complainAddress"
                placeholder="Address"
                className="form-control mb-3"
                value={data.complainAddress}
                disabled
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
                lang="hi"
                name="complainUrlHindi"
                className="form-control mb-3" disabled
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
                lang="hi"
                name="complainEmailHindi"
                className="form-control mb-3"
                maxLength={55} disabled
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
                lang="hi"
                name="complainAddressHindi"
                className="form-control mb-3" disabled
              />
            </div>
            <Col md={6} className="mb-4">
              <h5 className="mb-4 text-primary">
                Authority to receive notices on behalf of AU Small Finance
                Bank{" "}
              </h5>
              <div className="">
                It is hereby notified that all notices under the payment of
                GratuityAct, 1972 may be sent to{" "}
                <Form.Control
                  type="text"
                  className="d-inline-block w-auto"
                  placeholder="Officer's Name"
                  name="officerName"
                  value={data.officerName}
                  disabled maxLength={55}
                />{" "}
                (Officer’s Name) associated with the Bank as Bank Manager
                (Designation), who is authorized to receive all such Notices on
                behalf of AU Small Finance Bank (Company). This may be treated
                as Notice under Rule 4 of the Payment of Gratuity (Central
                Rules), 1972.
              </div>
            </Col>
            <Col md={6} className="mb-3">
              <h5 className="mb-4 text-primary">Emergency Contact Number </h5>
              <Form.Group className="mb-3">
                <Form.Control 
                name="branchName"
                value={data.branchName}
                disabled maxLength={155} placeholder="Branch Name / शाखा" />
              </Form.Group>
              <Row className="g-3">
                <Col md={4}>
                  <label htmlFor="">Particulars / विवरण</label>
                </Col>
                <Col md={4}>
                  <label htmlFor=""> Name / नाम </label>
                </Col>
                <Col md={4}>
                  <label htmlFor="">Phone No. / फोन नंबर</label>
                </Col>
                <Col md={4}>
                  <label htmlFor=""> Branch Manager / शाखा प्रबंधक </label>
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="branchMangerName"
                  value={data.branchMangerName}
                  disabled maxLength={155} placeholder="Name / नाम" />
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="branchMangerContact"
                  value={data.branchMangerContact}
                  disabled maxLength={10} placeholder="Phone No. / फोन नंबर" />
                </Col>
                <Col md={4}>
                  <label htmlFor="">
                    Branch Operations & Service Manager शाखा संचालन एवं सेवा
                    प्रबंधक
                  </label>
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="branchServiceMangerName"
                  value={data.branchServiceMangerName}
                  disabled maxLength={155} placeholder="Name / नाम" />
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="branchServiceMangerContact"
                  value={data.branchServiceMangerContact}
                  disabled maxLength={10} placeholder="Phone No. / फोन नंबर" />
                </Col>
                <Col md={4}>
                  <label htmlFor="">Police / पुलिस</label>
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="policeName"
                  value={data.policeName}
                  disabled maxLength={155} placeholder="Name / नाम" />
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="policeContact"
                  value={data.policeContact}
                  disabled maxLength={10} placeholder="Phone No. / फोन नंबर" />
                </Col>
                <Col md={4}>
                  <label htmlFor="">Fire / आग </label>
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="fireName"
                  value={data.fireName}
                  disabled maxLength={155} placeholder="Name / नाम" />
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="fireContact"
                  value={data.fireContact}
                  disabled maxLength={10} placeholder="Phone No. / फोन नंबर" />
                </Col>
                <Col md={4}>
                  <label htmlFor="">Nearest Hospital / निकटतम अस्पताल </label>
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="hospitalName"
                  value={data.hospitalName}
                  disabled maxLength={155} placeholder="Name / नाम" />
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="hospitalContact"
                  value={data.hospitalContact}
                  disabled maxLength={10} placeholder="Phone No. / फोन नंबर" />
                </Col>
                <Col md={4}>
                  <label htmlFor="">Ambulance / रोगी वाहन</label>
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="ambulanceName"
                  value={data.ambulanceName}
                  disabled maxLength={155} placeholder="Name / नाम" />
                </Col>
                <Col md={4}>
                  <Form.Control 
                  name="ambulanceContact"
                  value={data.ambulanceContact}
                  disabled maxLength={10} placeholder="Phone No. / फोन नंबर" />
                </Col>
              </Row>
            </Col>

            <Col md={6}>
              <img src={sign} alt="Signature" />
              <p>
                <strong>Name: Mr. Yogesh Soni</strong> <br />
                Designation: Head of Branch Banking Operations
              </p>
            </Col>
            {/* <Col md={6}>
              <Form.Group className="text-end mt-4">
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
            </Col> */}
          </Row>
        </Form>
      </div>
    </>
  );
}

export default BranchInfo;
