import { Container, Row, Col, Table } from "react-bootstrap";
import sign from "../assets/sign.jpg";

function NoticeA({ data }) {
  return (
    <Container fluid className="notice-b">
      <div className="notice-header">
        Notice - A
      </div>

      <Row>

        {/* LEFT */}

        <Col md={6} className="left-column">

          <section className="notice-section">
            <h5>
              FACILTY FOR SENIOR CITIZEN & DIFFERENTLY ABLED PERSONS
            </h5>

            <p>
              We give preferential treatment to senior citizens, differently - abled, and visually impaired persons.
            </p>
            <p>In case you require any assistance, please contact AU Branch Official.</p>            
          </section>
          <section className="notice-section">
          
          </section>

          {/* NOTICE ON NOMINATION FACILITY */}

          <section className="notice-section">

            <h5>NOTICE ON NOMINATION FACILITY</h5>

            <p>NOMINATION FACILITY IS AVAILABLE FOR ALL TYPES OF DEPOSIT ACCOUNTS AND LOCKERS (for individuals).</p>
            <p>IT IS ADVISABLE FOR YOU TO OPT FOR THE NOMINATION FACILITY. LOOKING FORWARD FOR YOUR CO-OPERATION.</p>
          </section>

            {/* Hindi  */}
          <section className="notice-section">

            <p>NOMINATION FACILITY IS AVAILABLE FOR ALL TYPES OF DEPOSIT ACCOUNTS AND LOCKERS (for individuals).</p>
            <p>IT IS ADVISABLE FOR YOU TO OPT FOR THE NOMINATION FACILITY. LOOKING FORWARD FOR YOUR CO-OPERATION.</p>
          </section>

          {/* CLEAN NOTE POLICY */}
          <section className="notice-section">

            <h5>CLEAN NOTE POLICY</h5>

            <p>
              Government of India...
            </p>

          </section>


        </Col>

        {/* RIGHT */}

        <Col md={6} className="right-column">

          <section className="notice-section">
            <h5>AUTHORITY TO RECEIVE NOTICES ON BEHALF OF AU SFB</h5>

            <p>
It is hereby notified that all notices under the payment of Gratuity Act, 1972 may be sent
to {data?.officerName != '' ? data?.officerName : '...............................................................' } (Officer's Name) associated 
with the Bank as Branch Manager (Designation), who is authorised to receive all such Notices on behalf of AU Small Finance Bank (Company).
            </p>
            <p>This may be treated as Notice under Rule 4 of the Payment of Gratuity (Central Rules), 1972.</p>

            <div className="text-end">
              <img src={sign} alt="Signature" />
              <p>
                <strong>Name: Mr. Yogesh Soni</strong> <br />
                Designation: Head of Branch Banking Operations
              </p>
            </div>

          </section>

          {/* INFORMATION ABOUT TDS ON CASH WITHDRAWAL* */}
          <section className="notice-section">
            <h5>INFORMATION ABOUT TDS ON CASH WITHDRAWAL*</h5>

            <ol>
                <li>
                    As per the Income-tax regulations, TDS on cash withdrawal will be applicable as under:
                </li>


                <li>List of persons and entities who are exempt from TDS on cash withdrawal are as under:</li>
            </ol>

          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default NoticeA;