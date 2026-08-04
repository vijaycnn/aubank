import { Container, Row, Col, Table } from "react-bootstrap";

function NoticeC({ data }) {
    return (
        <Container fluid className="notice-b">
        {/* Header */}
        <div className="notice-header">
            Notice - C
        </div>

        <Row>
            {/* LEFT */}
            <Col md={6} className="left-column">
            <section className="notice-section">
                <h5>BANKING FOR THE COMMON MAN</h5>

                <p>
                Being our privileged customer, your safety is paramount at AU Bank premises.
                </p>
            </section>

            </Col>
            {/* RIGHT */}

            <Col md={6} className="right-column">

            <section className="notice-section">
                <h5>GRIEVANCE REDRESSAL MECHANISM</h5>

                <Table bordered>

                <tbody>
                    <tr>
                        <td colSpan={2} >While we always strive to provide the best of customer service, there may be occasions,
when our customers' requirement might not be fully met. Such incidents may please be
brought to the notice of the Branch Manager.</td>
                    </tr>
                    <tr>
                        <td width={400}>Branch Manager Name</td>
                        <td width={600}>
                            <input type="text" value={data.managerName} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            <input type="text" value={data.address} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>Contact Number</td>
                        <td>
                            <input type="text" value={data.contactNumber} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>Email ID</td>
                        <td>
                            <input type="text" value={data.email} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} >In case of non-resolution of grievances within 7 days to your satisfaction, our customers
may escalate their grievance to the Regional Nodal Officer(s) and thereafter to the Principal
Nodal Officer after expiry of further 7 days.</td>
                    </tr>
                    <tr>
                        <td width={400}>Regional Nodal Officer Name</td>
                        <td width={600}>
                            <input type="text" value={data.regionalName} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            <input type="text" value={data.regionalAddress} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>Contact Number</td>
                        <td>
                            <input type="text" value={data.regionalContactNumber} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>Email ID</td>
                        <td>
                            <input type="text" value={data.regionalEmail} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td width={400}><b>Principal Nodal Officer Name</b></td>
                        <td width={600}> :{data.principalName} </td>
                    </tr>
                    <tr>
                        <td><b>Address</b></td>
                        <td>: {data.principalAddress}</td>
                    </tr>
                    <tr>
                        <td><b>Contact Number</b></td>
                        <td>: {data.principalContactNumber} </td>
                    </tr>
                    <tr>
                        <td><b>Email ID</b></td>
                        <td>: {data.principalEmail} </td>
                    </tr>
                    <tr>
                        <td colSpan={2} > If you are still not satisfied with the resolution provided, you may approach the Banking
Ombudsman in whose territorial jurisdiction the matter falls.</td>
                    </tr>
                    <tr>
                        <td width={400}>Name</td>
                        <td width={600}>
                            <input type="text" value={data.ombudsmanPost} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td >Name of Banking Ombudsman</td>
                        <td >
                            <input type="text" value={data.ombudsmanName} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            <input type="text" value={data.ombudsmanAddress} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>Contact Details</td>
                        <td>
                            <input type="text" value={data.ombudsmanContact} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>Email ID</td>
                        <td>
                            <input type="text" value={data.ombudsmanEmail} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}><b>Complaint can be lodged through below details.</b></td>
                    </tr>
                    <tr>
                        <td>URL</td>
                        <td>: {data.complainUrl} </td>
                    </tr>
                    <tr>
                        <td>Email ID</td>
                        <td>: {data.complainEmail} </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>: {data.complainAddress} </td>
                    </tr>
                </tbody>
                </Table>
            </section>

            <section className="notice-section">
                <Table bordered>
                    <tbody>
                        <tr>
                            <td colSpan={2} >हम हमेशा सर्वश्रेष्ठ ग्राहक सेवा प्रदान करने का प्रयास करते हैं,
                परन्तु कई बार ऐसे अवसर हो सकते है, जब हमारे ग्राहकों की
                आवश्यकताओं को पूरा नही किया गया है। ऐसी घटनाओं को कृपया शाखा
                प्रबंधक के ध्यान में लेकर आये।</td>
                        </tr>
                        <tr>
                            <td width={400}>शाखा प्रबंधक का नाम</td>
                            <td width={600}>
                                <input type="text" value={data.managerNameHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>पता</td>
                            <td>
                                <input type="text" value={data.addressHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>संपर्क संख्या</td>
                            <td>
                                <input type="text" value={data.contactNumberHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>ईमेल आईडी</td>
                            <td>
                                <input type="text" value={data.emailHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} > यदि आपकी शिकायत ७ दिनो के भीतर हल नही होती हैं, तो आप हमारे
                क्षेत्रीए नोडल अधिकारी से संपर्क कर सकते हैं। अतिरिक्त ७ दिन की
                समाप्ति के बाद प्रमुख नोडल अिधकारी से संपर्क किया जा सकता है |</td>
                        </tr>
                        <tr>
                            <td>क्षेत्रीय नोडल अधिकारी</td>
                            <td>
                                <input type="text" value={data.regionalNameHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>पता</td>
                            <td>
                                <input type="text" value={data.regionalAddressHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>संपर्क संख्या</td>
                            <td>
                                <input type="text" value={data.regionalContactNumberHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>ईमेल आईडी</td>
                            <td>
                                <input type="text" value={data.regionalEmailHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td><b>प्रधान नोडल अधिकारी का नाम</b></td>
                            <td>: {data.principalNameHindi}</td>
                        </tr>
                        <tr>
                            <td><b>पता</b></td>
                            <td>: {data.principalAddressHindi}</td>
                        </tr>
                        <tr>
                            <td><b>संपर्क संख्या</b></td>
                            <td>: {data.principalContactNumberHindi} </td>
                        </tr>
                        <tr>
                            <td><b>ईमेल आईडी</b></td>
                            <td>: {data.principalEmailHindi} </td>
                        </tr>
                        <tr>
                            <td colSpan={2}> यदि आप अभी भी प्रदान किये गए समाधान से संतुष्ट नहीं है, तो आप उस छेत्रीय अधिकार के बैंकिंग लोकपाल से संपर्क कर सकते हैं |</td>
                        </tr>                        
                        <tr>
                            <td>नाम</td>
                            <td>
                                <input type="text" value={data.ombudsmanPostHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>बैंकिंग लोकपाल का नाम</td>
                            <td>
                                <input type="text" value={data.ombudsmanNameHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>पता</td>
                            <td>
                                <input type="text" value={data.ombudsmanAddressHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>संपर्क विवरण </td>
                            <td>
                                <input type="text" value={data.ombudsmanContactHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>ईमेल आईडी</td>
                            <td>
                                <input type="text" value={data.ombudsmanEmailHindi} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>निम्नलिखित विवरण के माध्यम से शिकायत दर्ज की जा सकती है</td>
                        </tr>
                        <tr>
                            <td>यू. आर. एल.</td>
                            <td>: {data.complainUrlHindi} </td>
                        </tr>
                        <tr>
                            <td>ईमेल आईडी</td>
                            <td>: {data.complainEmailHindi} </td>
                        </tr>
                        <tr>
                            <td>पता</td>
                            <td>: {data.complainAddressHindi} </td>
                        </tr>


                    </tbody>
                </Table>

            </section>

            </Col>
        </Row>
        </Container>

    );

}

export default NoticeC;