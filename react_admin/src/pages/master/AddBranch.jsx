import {
  Container,
  Alert,
  Form,
  Badge,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../helper/constants/axiosInstance";
const adminAlias = import.meta.env.VITE_API_ADMIN_ALIAS;

function Branch() {
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    branchCode: "",
    serialNumber: "",
  });
  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validation = (values) => {
    setError("");
    let hasError = false;
    
    if (!values.branchCode || values.branchCode == "" ) {
      setError("Branch Code field is missing");
      hasError = true;
    }else if((!values.serialNumber || values.serialNumber == "")){
      setError("SerialNumber field is missing");
      hasError = true;
    }
    return hasError;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsSubmit(true);
    // console.log("formData >>", formData);
    try {
      let hasError = validation(formData);
      if (!hasError) {
        setLoading(true);
        
        let body = {
            branchCode: formData.branchCode,
            serialNumber: formData.serialNumber,
        };
        // console.log("data >>", data);
        await axiosInstance
            .post(`/branch/create`, body)
            .then((response) => {
            // console.log('response >>> ', response.data);
            if (response.data.status === "success") {
                setFormData({
                branchCode: "",
                serialNumber: "",
                });
                setSuccessMsg(response?.data?.message);
                setLoading(false);
                setTimeout(() => {
                    navigate(`${adminAlias}/branches`);
                }, 2000);
            } else if (response.data.status === "error") {
                setError(response.data.message);
            }
         })
        .catch((error) => {
            console.log(">>> ", error.status, error);
            if (error.status === 403) {
                handleLogout();
            }
            setLoading(false);
            setIsSubmit(false);
         });
        
        setLoading(false);
      }
      setIsSubmit(false);
    } catch (error) {
      // console.log("Catch Err >>", error);
      setError(error.message);
      alert(error.message);
      setLoading(false);
      setIsSubmit(false);
    }
  };

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
        <h1 className="h4 mb-0 font-secondary fw-medium">Add Branch</h1>
        <div>
          <Link to={`${adminAlias}/branches`} className="btn btn-primary btn-sm">
            <span className="nav-link-text">Back</span>
          </Link>
        </div>
      </div>

      <div className="table-view bg-white rounded-4 p-4">
        {error && <Alert variant="danger">⚠️{error}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* <Alert alert={alert} /> */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                  Branch Code<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="branchCode"
                  value={formData.branchCode}
                  placeholder="Enter Here"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                  Serial Number<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  placeholder="Enter Here"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            
            <Col md={12}>
              <Form.Group className="text-end">
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
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default Branch;
