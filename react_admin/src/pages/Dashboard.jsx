import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Row, Col, Card } from "react-bootstrap";
import { BiBuildings, BiRightArrowAlt, BiUser } from "react-icons/bi";
import LoadingSpinner from "../components/LoadingSpinner";
import axiosInstance from "../helper/constants/axiosInstance";
const adminAlias = import.meta.env.VITE_API_ADMIN_ALIAS;
import { decode as base64_decode, encode as base64_encode } from "base-64";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();
  const [branchData, setBranchData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authToken = localStorage.getItem("auth-token");
  const user = jwtDecode(authToken);
  let hasAccess = true;
  if (user.userType == "branch") {
    hasAccess = false;
  }

  const getDashboardCount = async () => {
    setIsLoading(true);
    await axiosInstance
      .get(`/dashboard/getCount`)
      .then((response) => {
        console.log(">>> ", response.data);
        setIsLoading(false);
        if (response.data.status === "success") {
          setBranchData(response.data?.data?.branchData);
          setUserData(response?.data?.data?.userData);
        }
      })
      .catch((error) => {
        console.log(">>> ", error.status, error);
        if (error.status === 403) {
          // alert('Session Timeout');
          handleLogout();
        }
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (!isLoading) {
      getDashboardCount();
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    localStorage.clear("auth-token");
    localStorage.clear();
    navigate(adminAlias);
  };

  return (
    <div className="d-flex align-items-center justify-content-center h-100 dash-widget">
      <Row className="w-100 g-xl-5 g-4 justify-content-center">
        <Col md={4}>
          <Card>
            <Card.Body>
              <div className="card-icon">
                <BiBuildings size={48} />
              </div>
              <Card.Title>Branches</Card.Title>
              <Row className="mt-5">
                <Col xs={6} className="d-flex flex-column">
                  <small className="text-muted">ACTIVE</small>
                  <span className="fs-3 fw-bold">
                    {branchData?.activeCount}{" "}
                  </span>
                </Col>
                <Col xs={6} className="d-flex flex-column">
                  <small className="text-muted">INACTIVE</small>
                  <span className="fs-3 fw-bold">
                    {branchData?.inactiveCount}
                  </span>
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

        {hasAccess &&
          userData?.map((item, index) => {
            return (
              <>
                <Col md={4} key={index}>
                  <Card>
                    <Card.Body>
                      <div className="card-icon">
                        <BiUser size={48} />
                      </div>
                      <Card.Title>{item.userRole}</Card.Title>
                      <Row className="mt-5">
                        <Col xs={6} className="d-flex flex-column">
                          <small className="text-muted">ACTIVE</small>
                          <span className="fs-3 fw-bold">
                            {item.activeCount}
                          </span>
                        </Col>
                        <Col xs={6} className="d-flex flex-column">
                          <small className="text-muted">INACTIVE</small>
                          <span className="fs-3 fw-bold">
                            {item.inactiveCount}
                          </span>
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
              </>
            );
          })}
      </Row>
    </div>
  );
};

export default Dashboard;
