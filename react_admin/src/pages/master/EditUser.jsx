import {
  Container,
  Alert,
  Form,
  Badge,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axiosInstance from "../../helper/constants/axiosInstance";
import { decode as base64_decode, encode as base64_encode } from "base-64";
const adminAlias = import.meta.env.VITE_API_ADMIN_ALIAS;
const baseURL = import.meta.env.VITE_API_BASE_URL_BACKEND + "/api";
import { jwtDecode } from "jwt-decode";

function EditUser() {
  const params = useParams();
  const decode = base64_decode(params.id);
  let id = decode.split("+")[1];
  id = parseInt(id);
  
  const authToken = localStorage.getItem("auth-token");
  const user = jwtDecode(authToken);
  
  if (user.userType == "branch") {
    window.location.href = `${adminAlias}/dashboard`;
  }

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const [previousData, setPreviousData] = useState(null);

  const getUser = async () => {
    setLoading(true);
    setPreviousData(null);
    await axiosInstance
      .get(`/user/getById/${id}`)
      .then((response) => {
        // console.log(">>> ", response.data);
        setLoading(false);
        if (response.data.status === "success") {
          setPreviousData(response?.data?.data);
        }
      })
      .catch((error) => {
        // console.log('>>> ', error.status, error);
        if (error.status === 403) {
          handleLogout();
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const [data, setData] = useState({
    name: "",
    userRole : "",
    employeeId: "",
    userMobile: "",
  });
  useEffect(() => {
    if (previousData) {
      setData({
        name: previousData.name,
        userRole : previousData.userRole,
        employeeId: previousData.employeeId,
        userEmail: previousData.userEmail,
        userMobile: previousData.userMobile,
      });
    }
  }, [previousData]);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validation = (values) => {
    setError("");
    let hasError = false;
    // const regex = /^[a-zA-Z0-9\s,./()-]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const regex = /^[a-zA-Z0-9\s._()-]+$/;

    if (!values.name || values.name == "" || !values.userRole || values.userRole == ""|| !values.employeeId || values.employeeId == "") {
      setError("Mandatory fields are missing");
      hasError = true;
    }else{
      if (!nameRegex.test(values.name)) {
        setError("Invalid Name (allow only alphabets)!");
        hasError = true;
      }
      if (!regex.test(values.employeeId)) {
        setError("Invalid Employee Id!");
        hasError = true;
      }
    }    
    if (values.userMobile) {
       if (values.userMobile.length !== 10) {
        setError("Please fill the correct contact number !"); hasError = true;
       }
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
      let hasError = validation(data);
      if (!hasError && previousData.id > 0) {
        setLoading(true);        
        let body = {
          userId: previousData.id,
          name: data.name,
          userRole: data.userRole,
          employeeId: data.employeeId,
          // userEmail: data.userEmail,
          userMobile: data.userMobile,
        };

        await axiosInstance
          .post(`/user/update`, body)
          .then(async (response) => {
            // console.log("response >>> ", response.data);
            if (response.data.status === "success") {
              setData({
                name: "",
                userRole : "",
                employeeId: "",
                // userEmail: "",
                userMobile: "",
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
            // console.log(">>> ", error.status, error);
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
        <h1 className="h4 mb-0 font-secondary fw-medium">Edit User</h1>
        <div>
          <Link to={`${adminAlias}/users`} className="btn btn-primary btn-sm">
            <span className="nav-link-text">Back</span>
          </Link>
        </div>
      </div>
      <div className="table-view bg-white rounded-4 p-4">
        {error && <Alert variant="danger">⚠️{error}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Form
          onSubmit={handleSubmit}
          className="login-form p-xl-0 p-md-5 p-4 col-xl-12 m-auto"
        >
          {/* <Alert alert={alert} /> */}

          <Row>
            <Col md={12} className="ps-md-5">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium">
                      Name<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={data.name}
                      placeholder="Enter Name"
                      onChange={handleChange} maxLength={35} minLength={4} 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium">
                      Role<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select name="userRole" onChange={handleChange} value={data. userRole} >
                          <option value="">Select</option>
                          <option value="ROM">ROM</option>
                          <option value="BOSM">BOSM</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium">
                      Employee Id<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="employeeId"
                      value={data.employeeId}
                      placeholder="Enter Employee Id"
                      onChange={handleChange} maxLength={35}
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
                      value={data.userMobile}
                      placeholder="Enter Mobile Number"
                      onChange={handleChange} onKeyPress={avoidAlphabets} maxLength={10}
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
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default EditUser;
