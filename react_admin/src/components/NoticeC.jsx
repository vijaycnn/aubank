import {
  Container,
  Alert,
  Form,
  Badge,
  Row,
  Col,
  Button,
  ListGroup,
  Table,
  ListGroupItem,
} from "react-bootstrap";
import infoImage from "../assets/notice-c-info.jpg";

function NoticeC({ data }) {
  return (
    <>
      {/* Header */}
      <div className="text-center rounded-4 form-header fw-normal">
        <h1>Notice - C</h1>
      </div>
      <div className="table-view flex-grow-1">
        <Row className="h-100">
          <Col md={6} className="col-left">
            <h5 className="form-sub-title text-center">
              BANKING FOR THE COMMON MAN
            </h5>
            <img src={infoImage} alt="Info Graphics Notice C" />
          </Col>
          <Col md={6} className="col-right">
            <h5 className="form-sub-title text-center">
              GRIEVANCE REDRESSAL MECHANISM
            </h5>

            <Table className="dynamic-table">
              <tbody>
                <tr>
                  <td colSpan={2} className="form-head fw-bold">
                    While we always strive to provide the best of customer
                    service, there may be occasions, when our customers’
                    requirement might not be fully met. Such incidents may
                    please be brought to the notice of the Branch Manager.
                  </td>
                </tr>
                <tr>
                  <td>Branch Manager Name:</td>
                  <td className="fw-semi-bold">
                    {data.managerName?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td className="fw-semi-bold">
                    {data.address?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Contact Number:</td>
                  <td className="fw-semi-bold">
                    {data.contactNumber?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td className="fw-semi-bold">{data.email?.trim() || "--"}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="form-head fw-bold">
                    In case of non-resolution of grievances within 7 days to
                    your satisfaction, our customers may escalate their
                    grievance to the Regional Nodal Officer(s) and thereafter to
                    the Principal Nodal Officer after expiry of further 7 days.
                  </td>
                </tr>
                <tr>
                  <td>Regional Nodal Officer:</td>
                  <td className="fw-semi-bold">
                    {data.regionalOfficer?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td className="fw-semi-bold">
                    {data.regionalName?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td className="fw-semi-bold">
                    {data.regionalAddress?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Contact Number:</td>
                  <td className="fw-semi-bold">
                    {data.regionalContactNumber?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td className="fw-semi-bold">
                    {data.regionalEmail?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Principal Nodal Officer:</td>
                  <td className="fw-semi-bold">
                    {data.principalOfficer?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td className="fw-semi-bold">
                    {data.principalName?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td className="fw-semi-bold">
                    {data.principalAddress?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Contact Number:</td>
                  <td className="fw-semi-bold">
                    {data.principalContactNumber?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td className="fw-semi-bold">
                    {data.principalEmail?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="form-head fw-bold">
                    If you are still not satisfied with the resolution provided,
                    you may approach the Banking Ombudsman in whose territorial
                    jurisdiction the matter falls.
                  </td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td className="fw-semi-bold">
                    {data.ombudsmanPost?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Name of Banking Ombudsman:</td>
                  <td className="fw-semi-bold">
                    {data.ombudsmanName?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td className="fw-semi-bold">
                    {data.ombudsmanAddress?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Contact Details:</td>
                  <td className="fw-semi-bold">
                    {data.ombudsmanContact?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Email ID:</td>
                  <td className="fw-semi-bold">
                    {data.ombudsmanEmail?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="form-head fw-bold">
                    Complaint can be lodged through below details.
                  </td>
                </tr>
                <tr>
                  <td>Complain URL:</td>
                  <td className="fw-semi-bold">
                    {data.complainUrl?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td className="fw-semi-bold">
                    {data.complainEmail?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td className="fw-semi-bold">
                    {data.complainAddress?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="form-head fw-bold">
                    हम हमेशा सर्वश्रेष्ठ ग्राहक सेवा प्रदान करने का प्रयास करते
                    हैं, परन्तु कई बार ऐसे अवसर हो सकते है, जब हमारे ग्राहकों की
                    आवश्यकताओं को पूरा नही किया गया है। ऐसी घटनाओं को कृपया शाखा
                    प्रबंधक के ध्यान में लेकर आये।
                  </td>
                </tr>
                <tr>
                  <td>शाखा प्रबंधक का नाम:</td>
                  <td className="fw-semi-bold">
                    {data.managerNameHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>पता:</td>
                  <td className="fw-semi-bold">
                    {data.addressHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>संपर्क संख्या:</td>
                  <td className="fw-semi-bold">
                    {data.contactNumberHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>ईमेल:</td>
                  <td className="fw-semi-bold">
                    {data.emailHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="form-head fw-bold">
                    यदि आपकी शिकायत ७ दिनो के भीतर हल नही होती हैं, तो आप हमारे
                    क्षेत्रीए नोडल अधिकारी से संपर्क कर सकते हैं। अतिरिक्त ७ दिन
                    की समाप्ति के बाद प्रमुख नोडल अिधकारी से संपर्क किया जा सकता
                    है|
                  </td>
                </tr>
                <tr>
                  <td>क्षेत्रीय नोडल अधिकारी:</td>
                  <td className="fw-semi-bold">
                    {data.regionalOfficerHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>नाम:</td>
                  <td className="fw-semi-bold">
                    {data.regionalNameHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>पता:</td>
                  <td className="fw-semi-bold">
                    {data.regionalAddressHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>संपर्क संख्या:</td>
                  <td className="fw-semi-bold">
                    {data.regionalContactNumberHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>ईमेल:</td>
                  <td className="fw-semi-bold">
                    {data.regionalEmailHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>प्रधान नोडल अधिकारी का नाम:</td>
                  <td className="fw-semi-bold">
                    {data.principalNameHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>पता:</td>
                  <td className="fw-semi-bold">
                    {data.principalAddressHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>संपर्क संख्या:</td>
                  <td className="fw-semi-bold">
                    {data.principalContactNumberHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>ईमेल आईडी:</td>
                  <td className="fw-semi-bold">
                    {data.principalEmailHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="form-head fw-bold">
                    यदि आप अभी भी प्रदान किये गए समाधान से संतुष्ट नहीं है, तो
                    आप उस छेत्रीय अधिकार के बैंकिंग लोकपाल से संपर्क कर सकते
                    हैं|
                  </td>
                </tr>
                <tr>
                  <td>नाम:</td>
                  <td className="fw-semi-bold">
                    {data.ombudsmanPostHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>बैंकिंग लोकपाल का नाम:</td>
                  <td className="fw-semi-bold">
                    {data.ombudsmanNameHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>पता:</td>
                  <td className="fw-semi-bold">
                    {data.ombudsmanAddressHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>संपर्क विवरण:</td>
                  <td className="fw-semi-bold">
                    {data.ombudsmanContactHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>ईमेल आईडी:</td>
                  <td className="fw-semi-bold">
                    {data.ombudsmanEmailHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="form-head fw-bold">
                    निम्नलिखित विवरण के माध्यम से शिकायत दर्ज की जा सकती है|
                  </td>
                </tr>
                <tr>
                  <td>यू. आर. एल.:</td>
                  <td className="fw-semi-bold">
                    {data.complainUrlHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>ईमेल आईडी:</td>
                  <td className="fw-semi-bold">
                    {data.complainEmailHindi?.trim() || "--"}
                  </td>
                </tr>
                <tr>
                  <td>पता:</td>
                  <td className="fw-semi-bold">
                    {data.complainAddressHindi?.trim() || "--"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default NoticeC;
