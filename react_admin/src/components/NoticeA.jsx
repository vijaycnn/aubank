import { Container, Row, Col, Table } from "react-bootstrap";
import sign from "../assets/signature.png";

function NoticeA({ data }) {
  return (
    <>
      <div className="text-center rounded-4 form-header fw-normal">
        <h1>Notice - A</h1>
      </div>

      <div className="table-view flex-grow-1">
        <Row className="h-100">
          <Col md={6} className="col-left">
            <h5 className="form-sub-title text-center">
              FACILTY FOR SENIOR CITIZEN & DIFFERENTLY ABLED PERSONS
            </h5>
            <p>
              We give preferential treatment to senior citizens, differently -
              abled, and visually impaired persons.
            </p>
            <p>
              In case you require any assistance, please contact AU Branch
              Official.
            </p>
            <hr />

            <p>
              हम वरिष्ठ नागरिकों, दिव्यांग और दृष्टिहीन व्यक्तियों को प्राथमिकता
              देते हैं।
            </p>
            <p>
              यदि आपको किसी भी प्रकार की सहायता की आवश्यकता है, तो कृपया ए. यू.
              शाखा अधिकारी से संपर्क करें।
            </p>
            <hr />
            <h5 className="form-sub-title text-center">
              NOTICE ON NOMINATION FACILITY
            </h5>

            <p>
              NOMINATION FACILITY IS AVAILABLE FOR ALL TYPES OF DEPOSIT ACCOUNTS
              AND LOCKERS (for individuals).
            </p>
            <p>IT IS ADVISABLE FOR YOU TO OPT FOR THE NOMINATION FACILITY.</p>
            <p>LOOKING FORWARD FOR YOUR CO-OPERATION.</p>
            <hr />
            <p>नामांकन सुविधा सभी जमा खातों और लाकर्स के लिए उपलब्ध है ।</p>
            <p>
              सभी व्यक्तिगत ग्राहको को सलाह दी जाती है कि वे नामांकन सुविधा का
              लाभ उठाए ।{" "}
            </p>
            <p>आपके सहयोग के प्रार्थी है।</p>
            <hr />
            <h5 className="form-sub-title text-center">CLEAN NOTE POLICY</h5>
            <p>
              At AU Small Finance Bank, we are committed to provide good quality
              currency notes to the customers.
            </p>
            <ul>
              <li>
                RBI has issued a directive under section 35A of the Banking
                Regulation Act, 1949, prohibiting the stapling of currency
                notes/note packets.
              </li>
              <li>
                All customers are requested to tender currency notes only in
                unstapled condition.
              </li>
              <li>
                The Bank will also issue currency notes in unstapled condition
                only.
              </li>
            </ul>
            <hr />
            <ul>
              <li>
                AU Small Finance Bank ग्राहक को अच्छी गुणवत्ता वाले मुद्रा नोट
                प्रदान करने के लिए प्रतिबद्ध हैं।
              </li>
              <li>
                RBI ने बैंकिंग विनियमन अधिनियम, 1949 की धारा 35 ए के तहत मुद्रा
                नोट्स / नोट पैकेट की स्टैप्लिंग पर रोक है।
              </li>
              <li>बैंक केवल unstapled condition में मुद्रा नोट जारी करेगा।</li>
            </ul>

            <hr />
            <h5 className="form-sub-title text-center">RTGS/NEFT TIMINGS</h5>
            <Table bordered className="notice-table">
              <thead>
                <tr className="text-center">
                  <th>
                    Transaction Timings <br />
                    लेनदेन समय
                  </th>
                  <th>Ref.</th>
                  <th>
                    NEFT <br />
                    एन ई एफ टी
                  </th>
                  <th>
                    RTGS <br />
                    आर टी जी एस
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="3" width="20%" className="text-center">
                    From Monday to Saturday <br />
                    (except 2nd & 4th Saturday of the month) सोमवार से शनिवार (2
                    और 4 शनिवार को छोड़कर)
                  </td>
                  <td>
                    At Branch <br />
                    शाखा में
                  </td>
                  <td>From 09:30 am to 06:00 pm</td>
                  <td>From 09:30 am to 06:00 pm </td>
                </tr>
                <tr>
                  <td>
                    Retail Net Banking <br /> रिटेल नेट बैंकिंग
                  </td>
                  <td>All Day 24x 7 </td>
                  <td>All Day 24x 7 </td>
                </tr>
                <tr>
                  <td>
                    Corporate Net Banking <br /> कॉर्पोरेट नेट बैंकिंग
                  </td>
                  <td>All Day 24x 7 </td>
                  <td>All Day 24x 7 </td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col md={6} className="col-right">
            <h5 className="form-sub-title text-center">
              AUTHORITY TO RECEIVE NOTICES ON BEHALF OF AU SFB
            </h5>
            <p>
              It is hereby notified that all notices under the payment of
              Gratuity Act, 1972 may be sent to{" "}
              <b>
                {data?.officerName != ""
                  ? data?.officerName
                  : "..............................................................."}
              </b>{" "}
              (Officer's Name) associated with the Bank as Branch Manager
              (Designation), who is authorised to receive all such Notices on
              behalf of AU Small Finance Bank (Company).
            </p>
            <p>
              This may be treated as Notice under Rule 4 of the Payment of
              Gratuity (Central Rules), 1972.
            </p>
            <div>
              <img src={sign} alt="Signature" className="signature" />
              <p>
                (Signature)
                <br />
                <strong>Name: Mr. Yogesh Soni</strong> <br />
                Designation: Head of Branch Banking Operations
              </p>
            </div>

            <hr />
            <h5 className="form-sub-title text-center">
              INFORMATION ABOUT TDS ON CASH WITHDRAWAL*
            </h5>
            <ol>
              <li>
                As per the Income-tax regulations, TDS on cash withdrawal will
                be applicable as under:
                <ol type="a">
                  <li>
                    Case wherein the customer has filed Income Tax Returns
                    ("ITR's") for 3 previous years (i.e. ITR compliant): If the
                    customer has filed ITR of3 previous years preceding the
                    previous year in which cash is withdrawn, for which the time
                    limit of filing under section 139(1) has expired, then TDS
                    will be applicable @2% on cash withdrawal exceeding Rs. 1
                    crore during the Financial Year. Customer is required to
                    submit signed declaration along with copies of ITR
                    acknowledgement with bank branch evidencing that he/she is
                    ITR compliant.
                  </li>
                  <li>
                    Case wherein the customer has not filed Income Tax Returns
                    ("ITR's") for 3 previous years (i.e. ITR non-compliant): If
                    the customer has not filed ITR of 3 previous years preceding
                    the previous year in which cash is withdrawn, for which the
                    time limit of filing under section 139(1) has expired, then
                    TDS will be applicable as under w.e.f. 1st July 2020:
                    <ul>
                      <li>
                        Cash withdrawal exceeding Rs. 20 Lakhs but upto Rs. 1
                        Crore during the Financial Year: TDS will be applicable
                        @2%
                      </li>
                      <li>
                        Cash withdrawal exceeding Rs. 1 Crore during the
                        Financial Year: TDS will be applicable @5%
                      </li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li>
                List of persons and entities who are exempt from TDS on cash
                withdrawal are as under:
                <ol type="a">
                  <li>the Government;</li>
                  <li>
                    any banking company or co-operative society engaged in
                    carrying on the business of banking or a post office;
                  </li>
                  <li>
                    any business correspondent of a banking company or
                    co-operative society engaged in carrying on the business of
                    banking in accordance with the RBI guidelines;
                  </li>
                  <li>
                    any white label automated teller machine operator of a
                    banking company or co-operative society engaged in carrying
                    on the business of banking, in accordance with the
                    authorization issued by the Reserve Bank of India;
                  </li>
                  <li>
                    such other person(s) as the Central Government may notify in
                    the Official Gazette.
                  </li>
                </ol>
              </li>
            </ol>
            <p>
              <strong>NOTICE AND STATUTORY INFORMATION ABOUT PAN</strong>
            </p>
            <ol>
              <li>
                Section 139A of the Income Tax Act and Rule 114B of Income Tax
                Rules make it mandatory for furnishing of PAN for opening of any
                account. Further, it is mandatory for the Bank to mention the
                PAN of the customer on the TDS certificate and in TDS returns
                filed by it. In order to avail proper credit for the TDS while
                filing income tax returns, customers are requested to furnish
                copy of PAN card along with the original card for verification.
              </li>
              <li>
                In case PAN is not provided by the customer or the one provided
                is incorrect or invalid, the Bank shall not be responsible for
                denial of TDS claims by the tax authorities.
              </li>
              <li>
                Further, you may please note tax rules relating to PAN
                requirement have undergone change with effect from 01st April,
                2010 and following additional rules shall be applicable from
                01st April, 2010:
                <ol type="a">
                  <li>
                    It shall be mandatory for deductees (customers) to furnish
                    PAN details to deductors (AUSF Bank), failing which Tax on
                    interest on resident deposits shall be deducted at source at
                    a higher rate of 20%.
                  </li>
                  <li>
                    Where the PAN provided to the deductor (AUSF Bank) is
                    invalid or does not belong to the customer, it will be
                    ignored and the higher rate of TDS (20%) shall be
                    applicable.
                  </li>
                </ol>
              </li>
            </ol>
            <p>
              <i>
                *All the above information are subject to change without prior
                notice by bank. This document is only for the purpose of
                guidance, please contact branch representative for any
                clarification or exact implication in your account.
              </i>
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default NoticeA;
