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
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axiosInstance from "../../helper/constants/axiosInstance";
const adminAlias = import.meta.env.VITE_API_ADMIN_ALIAS;
const baseURL = import.meta.env.VITE_API_BASE_URL_BACKEND + "/api";

function User() {
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    userRole : "",
    employeeId: "",
    userEmail: "",
    userMobile: "",
    userName : "",
    userPassword: "",
    confirmPassword: "",
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name || values.name == "" || !values.userRole || values.userRole == "" || values.userName == "" || !values.userName ||  values.userPassword == "" || !values.userPassword ||  values.confirmPassword == "" || !values.confirmPassword) {
      setError("Mandatory fields are missing");
      hasError = true;
    }else if (values.email) {
      if (!regex.test(values.userEmail)) {
        setError("Please enter a valid email");
        hasError = true;
      }
    }else if (values.userMobile) {
       if (values.userMobile.length !== 10) {
        setError("Please fill the correct contact number !"); hasError = true;
       }
    }

    if (values.userPassword) {
        const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!pwdRegex.test(values.userPassword)){
            setError("Password contains 1 Uppercase letter, 1 lowercase letter, 1 number, 1 special character and minimum length should be 8");
            hasError = true;
        }
    }
    if(values.confirmPassword !== values.userPassword){
        setError("Confirm password is not same as password!"); hasError = true;
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
          name: formData.name,
          userRole: formData.userRole,
          employeeId: formData.employeeId,
          userEmail: formData.userEmail,
          userMobile: formData.userMobile,
          userName: formData.userName,
          userPassword: formData.userPassword,
          confirmPassword: formData.confirmPassword,
        };

        await axiosInstance
          .post(`/user/create`, body)
          .then(async (response) => {
            // console.log("response >>> ", response.data);
            if (response.data.status === "success") {
              setFormData({
                name: "",
                userRole : "",
                employeeId: "",
                userEmail: "",
                userMobile: "",
                userName : "",
                userPassword: "",
                confirmPassword: "",
              });
              setSuccessMsg(response?.data?.message);
              setLoading(false);
              setTimeout(() => {
                navigate(`${adminAlias}/users`);
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
            setError("Something went wrong, please try again");
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
  const avoidAlphabets = (event) => {
    var k = event ? event.which : window.event.keyCode;
    if (k >= 48 && k <= 57) {
      return true;
    } else {
      event.preventDefault();
    }
  };
  const avoidSpace = (event) => {
    var k = event ? event.which : window.event.keyCode;
    if (k === 32) {
      event.preventDefault();

    }
  }

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
        <h1 className="h4 mb-0 font-secondary fw-medium">Add User</h1>
        <div>
          <Link to={`${adminAlias}/users`} className="btn btn-primary btn-sm">
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
                  Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter Name"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                  Role<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select name="userRole" onChange={handleChange} value={formData. userRole} >
                      <option value="">Select</option>
                      <option value="ROM">ROM</option>
                      <option value="BOSM">BOSM</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                  Employee Id
                </Form.Label>
                <Form.Control
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  placeholder="Enter Employee Id"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  placeholder="Enter Email"
                  onChange={handleChange} onKeyPress={avoidSpace} maxLength={155}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                  Mobile Number
                </Form.Label>
                <Form.Control
                  type="text"
                  name="userMobile"
                  value={formData.userMobile}
                  placeholder="Enter Mobile Number"
                  onChange={handleChange} onKeyPress={avoidAlphabets} maxLength={10}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                  UserName<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={formData.userName}
                  placeholder="Enter UserName" maxLength={25}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                  Password<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="Password"
                  name="userPassword"
                  value={formData.userPassword}
                  placeholder="Enter Password"
                  onChange={handleChange} maxLength={25}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">
                  Confirm Password<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Enter Confirm Password"
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

export default User;
