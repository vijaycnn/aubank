import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Row, Col, Card } from "react-bootstrap";
import { BiBuildings, BiRightArrowAlt, BiUser } from "react-icons/bi";

const Dashboard = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   sessionStorage.removeItem("isAuthenticated");
  //   navigate("/");
  // };

  return (
    <div className="d-flex align-items-center justify-content-center h-100 dash-widget">
      <Row className="w-100 g-md-5 g-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <div className="card-icon">
                <BiBuildings size={48} />
              </div>
              <Card.Title>Branches</Card.Title>
              <Row className="mt-5">
                <Col xs={6} className="d-flex flex-column">
                  <small className="text-muted">ACTIVE BRANCHES</small>
                  <span className="fs-3 fw-bold">213</span>
                </Col>
                <Col xs={6} className="d-flex flex-column">
                  <small className="text-muted">INACTIVE BRANCHES</small>
                  <span className="fs-3 fw-bold">15</span>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Link to="/admin/branches" className="btn btn-primary w-100">
                <span>
                  View All <BiRightArrowAlt size={20} />
                </span>
              </Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <div className="card-icon">
                <BiUser size={48} />
              </div>
              <Card.Title>BOSM</Card.Title>
              <Row className="mt-5">
                <Col xs={6} className="d-flex flex-column">
                  <small className="text-muted">ACTIVE BOSM</small>
                  <span className="fs-3 fw-bold">20</span>
                </Col>
                <Col xs={6} className="d-flex flex-column">
                  <small className="text-muted">INACTIVE BOSM</small>
                  <span className="fs-3 fw-bold">05</span>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Link to="/admin/users" className="btn btn-primary w-100">
                <span>
                  View All <BiRightArrowAlt size={20} />
                </span>
              </Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <div className="card-icon">
                <BiUser size={48} />
              </div>
              <Card.Title>ROM</Card.Title>
              <Row className="mt-5">
                <Col xs={6} className="d-flex flex-column">
                  <small className="text-muted">ACTIVE ROM</small>
                  <span className="fs-3 fw-bold">10</span>
                </Col>
                <Col xs={6} className="d-flex flex-column">
                  <small className="text-muted">INACTIVE ROM</small>
                  <span className="fs-3 fw-bold">03</span>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Link to="/admin/users" className="btn btn-primary w-100">
                <span>
                  View All <BiRightArrowAlt size={20} />
                </span>
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
