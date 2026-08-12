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
  Tab,
} from "react-bootstrap";

function NoticeB({ data }) {
  return (
    <>
      {/* Header */}

      <div className="text-center rounded-4 form-header fw-normal">
        <h1>Notice - B</h1>
      </div>
      <div className="table-view flex-grow-1">
        <Row className="h-100">
          <Col md={6} className="col-left">
            <h5 className="form-sub-title text-center">
              BUSINESS CONTINUITY AND BRANCH EVACUATION PLAN IN CASE OF
              EMERGENCY
            </h5>
            <p>
              Being our privileged customer, your safety is paramount at AU Bank
              premises.
            </p>
            <p>
              <strong>In case of following emergencies</strong>
            </p>
            <ul>
              <li>
                Natural Calamities like Earthquake, Flood, Cyclonic storm, etc.
              </li>
              <li>Fire</li>
              <li>Robbery</li>
              <li>Mob</li>
              <li>In case hooter/fire alarms are activated</li>
            </ul>
            <p>
              <strong>Customers are requested to</strong>
            </p>
            <ul>
              <li>
                In case of natural calamities and fire, don't panic, proceed to
                the nearest exit and evacuate the premises in an orderly manner
              </li>
              <li>Use staircase, don't use elevator</li>
              <li>
                Walk along the LEFT side of staircase and leave the RIGHT side
                for rescue team
              </li>
              <li>
                Give preference to physically challenged, children, expectant
                mothers and elderly
              </li>
              <li>
                If your clothes catch fire, do not panic and run, drop and roll
                to extinguish the fire
              </li>
              <li>
                Branches are equipped with fire extinguisher, use fire
                extinguisher on the source of fire
              </li>
              <li>
                In case of robbery do not attempt to overpower the robbers and
                follow their instructions. Just note description of robbers to
                assist Police during investigation
              </li>
              <li>
                In case of Mob do not indulge in verbal violence or fisticuffs
              </li>
              <li>
                If hooter/fire alarm is activated kindly evacuate the premises
              </li>
              <li>
                After evacuation kindly assist us by calling fire brigade
                /police/ ambulance
              </li>
              <li>
                If it is a false alarm or branch is declared safe, you can enter
                the branch and continue your transactions
              </li>
              <li>
                If branch is not open for transaction, kindly contact BM/ABM to
                assist you by providing address of nearby branches
              </li>
            </ul>

            <hr />
            <h5 className="form-sub-title text-center">
              MAGNIFYING GLASS IS AVAILABLE AT THE BRANCH FOR THE VISUALLY
              IMPAIRED
            </h5>
            <p>
              Magnifying glass is available for the use of customer on request
            </p>
            <p>
              Please contact Branch Manager/Asst. Branch Manager in case of
              requirement.
            </p>
            <hr />
            <p>
              अनुरोध पर ग्राहक के उपयोग के लिए मैग्नीफाइंग ग्लास उपलब्ध है ।
            </p>
            <p>कृपया आवश्यकता के मामले शाखा प्रबंधक / सहायक से संपर्क करें ।</p>
            <hr />
            <h5 className="form-sub-title text-center">SMOKING PROHIBITED</h5>
            <p>
              The Government of India has under the Cigarettes and other Tobacco
              Products (Prohibition of Advertisement and Regulation of Trade and
              Commerce, Production, Supply and Distribution) Act - 2003 notified
              revised rules on the Prohibition of Smoking in Public Places.
              These rules have come into effect from October 2, 2008. As per the
              revised rules, smoking is banned private work places. The ban
              covers public and private work places. All employees & Customers
              are requested to take note of the rules and refrain from smoking
              in Bank Premises.
            </p>
            <hr />
            <p>
              भारत सरकार की सिगरेट और अन्य तम्बाकू उत्पाद अधिनियम (विज्ञापन और
              व्यापार और वाणिज्य, उत्पादन, आपूर्ति का विनियमन और वितरण निषेध) –
              2003 के संशोधित नियमों के अंतर्गत सार्वजनिक स्थलों पर धूम्रपान
              निषेध है। ये नियम 2 अक्टूबर, 2008 से प्रभावी हो गए हैं। संशोधित
              नियमों के अनुसार, धूम्रपान निजी कार्य स्थलों पर वर्जित है।
              प्रतिबंध में सार्वजनिक और निजी कार्य स्थलों को शामिल किया गया है।
              सभी कर्मचारियों और ग्राहकों से अनुरोध है कि वे नियमों को नोट करें
              और बैंक परिसर में धूम्रपान से परहेज करें।
            </p>

            <hr />
            <h5 className="form-sub-title text-center">
              LOCKER ANNUAL CHARGES
            </h5>
            <Table className="notice-table" bordered>
              <thead>
                <tr className="text-center">
                  <th>Locker Specifications</th>
                  <th colSpan={4}>Branch Category</th>
                </tr>
                <tr className="text-center">
                  <th>Locker Type</th>
                  <th>A (in ₹)</th>
                  <th>B (in ₹)</th>
                  <th>C (in ₹)</th>
                  <th>D (in ₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Small</td>
                  <td>2000</td>
                  <td>1800</td>
                  <td>1400</td>
                  <td>800</td>
                </tr>
                <tr>
                  <td>Medium</td>
                  <td>2800</td>
                  <td>2400</td>
                  <td>2000</td>
                  <td>1400</td>
                </tr>
                <tr>
                  <td>File</td>
                  <td>4000</td>
                  <td>3400</td>
                  <td>2800</td>
                  <td>1800</td>
                </tr>
                <tr>
                  <td>Large</td>
                  <td>6000</td>
                  <td>5000</td>
                  <td>4000</td>
                  <td>2400</td>
                </tr>
                <tr>
                  <td>Extra Large</td>
                  <td>10000</td>
                  <td>8000</td>
                  <td>6000</td>
                  <td>4000</td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col md={6} className="col-right">
            <h5 className="form-sub-title text-center">
              IMPORTANT NOTICE ON APPLICABILITY OF GST
            </h5>
            <ol>
              <li>
                This is to inform you that Goods and Service Tax Laws (GST)
                shall be applicable w.e.f. 1st July 2017 and shall replace
                current Service Tax and other indirect tax laws.
              </li>
              <li>
                The rate of GST rate has been fixed as 18% on taxable services
                provided by Banking and Financial institutions. Accordingly,
                w.e.f. 1st July 2017 Au Bank shall charge GST @ 18% instead of
                service tax @15% from its customers for rendering taxable
                banking services.
              </li>
              <li>
                Input tax credit of the taxes levied by the Au Bank can be taken
                by providing GST registration number to AU Bank. Registration
                number can be provided to AU bank by contacting to your branch
                representative.
              </li>
              <li>
                As per GST law, place of supply in case of banking service shall
                be address on record i.e. registered address as per GST
                registration number provided and for the purpose of levying GST
                such registered address shall be considered address on record
                every time.
              </li>
              <li>
                Invoice would be sent periodically to your registered email
                address or can be obtained from the branch office. Accordingly,
                it is requested to kindly provide your email-id to the bank
                along with the GST registration details.
              </li>
            </ol>
            <p>
              <strong>
                Please note that customer shall not be able to avail input tax
                credit of GST levied, if GST registration number is not provided
                to the AU bank before entering this transaction.
              </strong>
            </p>
            <p>
              *All the above information are subject to change without prior
              notice by bank. This document is only for the purpose of guidance,
              please contact your branch representative for any clarification or
              exact implication in your account
            </p>
            <hr />
            <h5 className="form-sub-title text-center">
              TIME - NORMS FOR VARIOUS BANKING TRANSACTIONS
            </h5>
            <Table bordered className="notice-table">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Particulars</th>
                  <th>Time Taken</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>Cash payment/ नकद भुगतान</td>
                  <td>Up to 15 minutes / 15 मिनट तक </td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>Receipt of cash / नकद प्राप्ति की रसीद</td>
                  <td>Up to 15 minutes / 15 मिनट तक</td>
                </tr>
                <tr>
                  <td>03</td>
                  <td>
                    For issuance of demand draft / डिमांड ड्राफ्ट जारी करने के
                    लिए
                  </td>
                  <td>Up to 20 minutes / 20 मिनट तक </td>
                </tr>
                <tr>
                  <td>04</td>
                  <td>Payment of demand drafts / डिमांड ड्राफ्ट का भुगतान</td>
                  <td>Up to 15 minutes / 15 मिनट तक </td>
                </tr>
                <tr>
                  <td>05</td>
                  <td>
                    Payment of fixed deposit receipts / सावधि जमा रसीदों का
                    भुगतान
                  </td>
                  <td>Up to 20 minutes / 20 मिनट तक </td>
                </tr>
                <tr>
                  <td>06</td>
                  <td>
                    Opening or Closing of an account / खाते खोलना या बंद करना
                  </td>
                  <td>Up to 4 working days / 4 कार् य दिवस तक</td>
                </tr>
                <tr>
                  <td>07</td>
                  <td>
                    Statement of accounts (request for duplicate) / खातों का
                    विवरण (डुप्लिकेट के लिए अनुरोध)
                  </td>
                  <td>Up to 1 working days / 1 कार् य दिवस तक</td>
                </tr>
                <tr>
                  <td>08</td>
                  <td>Transfer; RTGS; NEFT / स्थानांतरण; आरटीजीएस, एनईएफटी</td>
                  <td>Up to 15 minutes / 15 मिनट तक </td>
                </tr>
                <tr>
                  <td>09</td>
                  <td>Passbook Request / पासबुक अनुरोध</td>
                  <td>Up to 1 working days / 1 कार् य दिवस तक</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Passbook Updation / पासबुक अद्यतन</td>
                  <td>Up to 15 minutes / 15 मिनट तक </td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Nomination Updation / नामांकन अद्यतन</td>
                  <td>Up to 4 working days / 4 कार् य दिवस तक</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Collection of Local Cheques / स्थानीय चेक का संग्रह</td>
                  <td>
                    As per clearing house rules / क्ल ियरिंग हाउस के नियमों के
                    अिुसाि
                  </td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>
                    Collection of Outstation Cheques / आउटस्टेशन चेक का संग्रह
                  </td>
                  <td>
                    Upto 14 days depending on the location / स्थ ान के आधार पर
                    14 दिनों तक
                  </td>
                </tr>
              </tbody>
            </Table>

            <hr />
            <h5 className="form-sub-title text-center">
              EMERGENCY CONTACT NUMBER
            </h5>
            <Table bordered className="notice-table">
              <thead>
                <tr>
                  <th colSpan={3}>Branch Name / शाखा {data.branchName}</th>
                </tr>
                <tr>
                  <th>Particulars / विवरण</th>
                  <th>Name / नाम</th>
                  <th>Phone No. / फोन नंबर</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Branch Manager / शाखा प्रबंधक</td>
                  <td>{data.branchMangerName}</td>
                  <td>{data.branchMangerContact}</td>
                </tr>
                <tr>
                  <td>
                    Branch Operations & Service Manager / शाखा संचालन एवं सेवा
                    प्रबंधक
                  </td>
                  <td>{data.branchServiceMangerName}</td>
                  <td>{data.branchServiceMangerContact}</td>
                </tr>
                <tr>
                  <td>Police / पुलिस</td>
                  <td>{data.policeName}</td>
                  <td>{data.policeContact}</td>
                </tr>
                <tr>
                  <td>Fire / आग</td>
                  <td>{data.fireName}</td>
                  <td>{data.fireContact}</td>
                </tr>
                <tr>
                  <td>Nearest Hospital / निकटतम अस्पताल</td>
                  <td>{data.hospitalName}</td>
                  <td>{data.hospitalContact}</td>
                </tr>
                <tr>
                  <td>Ambulance / रोगी वाहन</td>
                  <td>{data.ambulanceName}</td>
                  <td>{data.ambulanceContact}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default NoticeB;
