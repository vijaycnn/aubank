import {
  Container,
  Alert,
  Form,
  Badge,
  Row,
  Col,
  Button,
  ListGroup,
} from "react-bootstrap";
import sign from "../../assets/sign.jpg";
import logo from "../../assets/logo.svg";
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

    officerName: "",
    branchName: "",
    branchMangerName: "",
    branchMangerContact: "",
    branchServiceMangerName: "",
    branchServiceMangerContact: "",
    policeName: "",
    policeContact: "",
    fireName: "",
    fireContact: "",
    hospitalName: "",
    hospitalContact: "",
    ambulanceName: "",
    ambulanceContact: "",
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

        officerName: previousData.officerName,
        branchName: previousData.branchName,
        branchMangerName: previousData.branchMangerName,
        branchMangerContact: previousData.branchMangerContact,
        branchServiceMangerName: previousData.branchServiceMangerName,
        branchServiceMangerContact: previousData.branchServiceMangerContact,
        policeName: previousData.policeName,
        policeContact: previousData.policeContact,
        fireName: previousData.fireName,
        fireContact: previousData.fireContact,
        hospitalName: previousData.hospitalName,
        hospitalContact: previousData.hospitalContact,
        ambulanceName: previousData.ambulanceName,
        ambulanceContact: previousData.ambulanceContact,
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
      <section className="container py-5">
        <img src={logo} alt="logo" />

        <div className="table-view bg-white rounded-4 p-5 mt-4">
          {error && <Alert variant="danger">⚠️{error}</Alert>}
          {successMsg && <Alert variant="success">{successMsg}</Alert>}

          <Form>
            <div className="text-center mb-4 bg-light rounded-4 p-3 h3 fw-normal">
              <b>NOTICE - C</b>
              <h1
                className="h6 opacity-50 text-center fw-medium mt-2 mb-0"
                style={{ letterSpacing: "2px" }}
              >
                GRIEVANCE REDRESSAL MECHANISM
              </h1>
            </div>

            <Row>
              <Col md={6} className="mb-4 fw-bold">
                While we always strive to provide the best of customer service,
                there may be occasions, when our customers’ requirement might
                not be fully met. Such incidents may please be brought to the
                notice of the Branch Manager.
              </Col>
              <Col md={6} className="mb-4 fw-bold">
                हम हमेशा सर्वश्रेष्ठ ग्राहक सेवा प्रदान करने का प्रयास करते हैं,
                परन्तु कई बार ऐसे अवसर हो सकते है, जब हमारे ग्राहकों की
                आवश्यकताओं को पूरा नही किया गया है। ऐसी घटनाओं को कृपया शाखा
                प्रबंधक के ध्यान में लेकर आये।
              </Col>
            </Row>

            <ListGroup as="ul" variant="flush" className="mb-5">
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Branch Manager Name</small>
                    <p className="fw-medium m-0">{data.managerName}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">शाखा प्रबंधक का नाम</small>
                    <p className="fw-medium m-0">{data.managerNameHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Address</small>
                    <p className="fw-medium m-0">{data.address}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">पता</small>
                    <p className="fw-medium m-0">{data.addressHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Contact Number</small>
                    <p className="fw-medium m-0">{data.contactNumber}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">संपर्क संख्या</small>
                    <p className="fw-medium m-0">{data.contactNumberHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Email</small>
                    <p className="fw-medium m-0">{data.email}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">ईमेल</small>
                    <p className="fw-medium m-0">{data.emailHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <Row>
              <Col md={6} className="mb-4 fw-bold">
                In case of non-resolution of grievances within 7 days to your
                satisfaction, our customers may escalate their grievance to the
                Regional Nodal Officer(s) and thereafter to the Principal Nodal
                Officer after expiry of further 7 days.
              </Col>
              <Col md={6} className="mb-4 fw-bold">
                यदि आपकी शिकायत ७ दिनो के भीतर हल नही होती हैं, तो आप हमारे
                क्षेत्रीए नोडल अधिकारी से संपर्क कर सकते हैं। अतिरिक्त ७ दिन की
                समाप्ति के बाद प्रमुख नोडल अिधकारी से संपर्क किया जा सकता है |
              </Col>
            </Row>
            <ListGroup as="ul" variant="flush" className="mb-5">
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Regional Nodal Officer</small>
                    <p className="fw-medium m-0">{data.regionalOfficer}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">क्षेत्रीय नोडल अधिकारी</small>
                    <p className="fw-medium m-0">{data.regionalOfficerHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Name</small>
                    <p className="fw-medium m-0">{data.regionalName}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">नाम</small>
                    <p className="fw-medium m-0">{data.regionalNameHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Address</small>
                    <p className="fw-medium m-0">{data.regionalAddress}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">पता</small>
                    <p className="fw-medium m-0">{data.regionalAddressHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Contact Number</small>
                    <p className="fw-medium m-0">
                      {data.regionalContactNumber}
                    </p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">संपर्क संख्या</small>
                    <p className="fw-medium m-0">
                      {data.regionalContactNumberHindi}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Email</small>
                    <p className="fw-medium m-0">{data.regionalEmail}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">ईमेल</small>
                    <p className="fw-medium m-0">{data.regionalEmailHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup as="ul" variant="flush" className="mb-5">
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">
                      Principal Nodal Officer
                    </small>
                    <p className="fw-medium m-0">{data.principalOfficer}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">क्षेत्रीय नोडल अधिकारी</small>
                    <p className="fw-medium m-0">
                      {data.principalOfficerHindi}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Name</small>
                    <p className="fw-medium m-0">{data.principalName}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">नाम</small>
                    <p className="fw-medium m-0">{data.principalNameHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Address</small>
                    <p className="fw-medium m-0">{data.principalAddress}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">पता</small>
                    <p className="fw-medium m-0">
                      {data.principalAddressHindi}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Contact Number</small>
                    <p className="fw-medium m-0">
                      {data.principalContactNumber}
                    </p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">संपर्क संख्या</small>
                    <p className="fw-medium m-0">
                      {data.principalContactNumberHindi}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Email</small>
                    <p className="fw-medium m-0">{data.principalEmail}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">ईमेल</small>
                    <p className="fw-medium m-0">{data.principalEmailHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <Row>
              <Col md={6} className="mb-4 fw-bold">
                Complaint can be lodged through below details.
              </Col>
              <Col md={6} className="mb-4 fw-bold">
                निम्नलिखित विवरण के माध्यम से शिकायत दर्ज की जा सकती है
              </Col>
            </Row>
            <ListGroup as="ul" variant="flush" className="mb-5">
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Complain URL</small>
                    <p className="fw-medium m-0">{data.complainUrl}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">यू. आर. एल.</small>
                    <p className="fw-medium m-0">{data.complainUrlHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Email</small>
                    <p className="fw-medium m-0">{data.complainEmail}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">ईमेल</small>
                    <p className="fw-medium m-0">{data.complainEmailHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={6}>
                    <small className="text-muted">Address</small>
                    <p className="fw-medium m-0">{data.complainAddress}</p>
                  </Col>
                  <Col sm={6}>
                    <small className="text-muted">पता</small>
                    <p className="fw-medium m-0">{data.complainAddressHindi}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <h5 className="mb-2 text-primary">
              Authority to receive notices on behalf of AU Small Finance
              Bank{" "}
            </h5>
            <div className="mb-4">
              It is hereby notified that all notices under the payment of
              GratuityAct, 1972 may be sent to <b>{data.officerName}</b>{" "}
              (Officer’s Name) associated with the Bank as Bank Manager
              (Designation), who is authorized to receive all such Notices on
              behalf of AU Small Finance Bank (Company). This may be treated as
              Notice under Rule 4 of the Payment of Gratuity (Central Rules),
              1972.
            </div>

            <h5 className="mb-4 text-primary">Emergency Contact Number </h5>
            <ListGroup as="ul" variant="flush" className="mb-5">
              <ListGroup.Item as="li">
                <small className="text-muted">Branch Name / शाखा नाम</small>
                <p className="fw-medium m-0">{data.branchName}</p>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={4}>Particulars / विवरण</Col>
                  <Col sm={4}>Name / नाम</Col>
                  <Col sm={4}>Phone No. / फोन नंबर</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={4}>Branch Manager / शाखा प्रबंधक</Col>
                  <Col sm={4}>{data.branchMangerName}</Col>
                  <Col sm={4}>{data.branchMangerContact}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={4}>
                    Branch Operations & Service Manager / शाखा संचालन एवं सेवा
                    प्रबंधक
                  </Col>
                  <Col sm={4}>{data.branchServiceMangerName}</Col>
                  <Col sm={4}>{data.branchServiceMangerContact}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={4}>Police / पुलिस</Col>
                  <Col sm={4}>{data.policeName}</Col>
                  <Col sm={4}>{data.policeContact}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={4}>Fire / आग</Col>
                  <Col sm={4}>{data.fireName}</Col>
                  <Col sm={4}>{data.fireContact}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={4}>Nearest Hospital / निकटतम अस्पताल</Col>
                  <Col sm={4}>{data.hospitalName}</Col>
                  <Col sm={4}>{data.hospitalContact}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Row className="g-4">
                  <Col sm={4}>Ambulance / रोगी वाहन</Col>
                  <Col sm={4}>{data.ambulanceName}</Col>
                  <Col sm={4}>{data.ambulanceContact}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <div className="text-end">
              <img src={sign} alt="Signature" />
              <p>
                <strong>Name: Mr. Yogesh Soni</strong> <br />
                Designation: Head of Branch Banking Operations
              </p>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}

export default BranchInfo;
