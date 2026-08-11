import { Container, Row, Col, Table } from "react-bootstrap";

function NoticeB({ data }) {
  return (
    <Container fluid className="notice-b">

      {/* Header */}

      <div className="notice-header">
        Notice - B
      </div>

      <Row>

        {/* LEFT */}

        <Col md={6} className="left-column">

          {/* Business Continuity */}

          <section className="notice-section">
            <h5>
              BUSINESS CONTINUITY AND BRANCH EVACUATION PLAN
              IN CASE OF EMERGENCY
            </h5>

            <p>
              Being our privileged customer, your safety is paramount at AU Bank premises.
            </p>
            <b>In case of following emergencies</b>
            <ul>
              <li>Natural Calamities like Earthquake, Flood, Cyclonic storm, etc.</li>
              <li>Fire</li>
              <li>Robbery</li>
              <li>Mob</li>
              <li>In case hooter/fire alarms are activated</li>
            </ul>
            <b>Customers are requested to</b>
          </section>

          {/* Magnifying */}

          <section className="notice-section">

            <h5>
              MAGNIFYING GLASS IS AVAILABLE AT THE BRANCH FOR THE VISUALLY IMPAIRED
            </h5>

            <p>
              Magnifying glass is available for the use of customer on request
            </p>
            <p>Please contact Branch Manager/Asst. Branch Manager in case of requirement</p>

          </section>

          {/* Smoking */}

          <section className="notice-section">

            <h5>SMOKING PROHIBITED</h5>

            <p>
              Government of India...
            </p>

          </section>

          {/* Locker */}

          <section className="notice-section">

            <h5>LOCKER ANNUAL CHARGES</h5>

            <Table bordered size="sm">

              ...

            </Table>

          </section>

        </Col>

        {/* RIGHT */}

        <Col md={6} className="right-column">

          {/* GST */}

          <section className="notice-section">

            <h5>
              IMPORTANT NOTICE ON APPLICABILITY OF GST
            </h5>

            <ol>

              <li>This is to inform you that Goods and Service Tax Laws (GST) shall be applicable w.e.f. 1st July 2017 and shall replace current Service Tax and other indirect tax laws.</li>
              <li>This is to inform you that Goods and Service Tax Laws (GST) shall be applicable w.e.f. 1st July 2017 and shall replace current Service Tax and other indirect tax laws.</li>
              <li>This is to inform you that Goods and Service Tax Laws (GST) shall be applicable w.e.f. 1st July 2017 and shall replace current Service Tax and other indirect tax laws.</li>
              

            </ol>

          </section>

          {/* Time Norms */}

          <section className="notice-section">

            <h5>
              TIME - NORMS FOR VARIOUS BANKING TRANSACTIONS
            </h5>

            <Table bordered>

            ...

            </Table>

          </section>

          {/* Emergency */}

          <section className="notice-section">

            <h5>EMERGENCY CONTACT NUMBER</h5>

            <Table bordered>

              <tbody>

                <tr>
                  <td colSpan={3}>Branch Name / शाखा  {data.branchName}</td>
                </tr>
                <tr>
                    <td width={300}>Particulars / विवरण</td>
                    <td width={400}>Name / नाम</td>
                    <td width={300}>Phone No. / फोन नंबर</td>
                </tr>
                <tr>
                    <td>Branch Manager / शाखा प्रबंधक</td>
                    <td>{data.branchMangerName}</td>
                    <td>{data.branchMangerContact}</td>
                </tr>
                <tr>
                    <td>Branch Operations & Service Manager / शाखा संचालन एवं सेवा
                    प्रबंधक</td>
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
          </section>

        </Col>
      </Row>
    </Container>
  );
}

export default NoticeB;