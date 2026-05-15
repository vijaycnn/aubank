import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Alert, Table, Button, Form } from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingSpinner";
import axiosInstance from "../../helper/constants/axiosInstance";
import { decode as base64_decode, encode as base64_encode } from "base-64";
const adminAlias = import.meta.env.VITE_API_ADMIN_ALIAS;
const baseURL = import.meta.env.VITE_API_BASE_URL_BACKEND + "/api";

const AssignBranch = () => {
  const params = useParams();
  const decode = base64_decode(params.id);
  let id = decode.split("+")[1];
  id = parseInt(id);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getBranchList();
    getUserDetails();
  }, []);

  // Get all branches
  const getBranchList = async () => {
    setIsLoading(true);
    await axiosInstance
      .get(`/branch/getList`)
      .then((response) => {
        // console.log('>>> ', response.data);
        setIsLoading(false);
        if (response.data.status === "success") {
          setBranchList(response.data?.data);
        }
      })
      .catch((error) => {
        console.log(">>> ", error.status, error);
        if (error.status === 403) {
          handleLogout();
        }
        setIsLoading(false);
      });
  };

  // Get user details
  const getUserDetails = async () => {
    setIsLoading(true);
    setSelectedBranches([]);
    await axiosInstance
      .get(`/user/getById/${id}`)
      .then((response) => {
        // console.log(">>> ", response.data);
        setIsLoading(false);
        if (response.data.status === "success") {
          setSelectedBranches(response?.data?.data?.branchIds || []);
        }
      })
      .catch((error) => {
        // console.log('>>> ', error.status, error);
        if (error.status === 403) {
          handleLogout();
        }
        setIsLoading(false);
      });
  };

  // Checkbox change
  const handleCheckbox = (branchId) => {
    if (selectedBranches.includes(branchId)) {
      setSelectedBranches(selectedBranches.filter((id) => id !== branchId));
    } else {
      setSelectedBranches([...selectedBranches, branchId]);
    }
  };
  ///////////////////////////
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allBranchIds = branchList.map((item) => item.id);

      setSelectedBranches(allBranchIds);
    } else {
      setSelectedBranches([]);
    }
  };

  const isAllSelected =
    branchList.length > 0 && selectedBranches.length === branchList.length;

  const handleSubmit = async () => {
    if (selectedBranches.length == 0) {
      setError("Select one branch atleast");
      return;
    }

    const payload = {
      branchIds: selectedBranches,
    };
    setError("");
    setSuccessMsg("");
    setIsSubmit(true);
    setIsLoading(true);

    await axiosInstance
      .post(`/user/assign-branches/${id}`, payload)
      .then((response) => {
        // console.log('>>> ', response.data);
        setIsLoading(false);
        if (response.data.status === "success") {
          setSuccessMsg(response?.data?.message);
          setIsSubmit(false);
          setTimeout(() => {
            navigate(`${adminAlias}/users`);
          }, 2000);
        } else if (response.data.status === "error") {
          setError(response.data.message);
          setIsSubmit(false);
        }
      })
      .catch((error) => {
        // console.log(">>> ", error.status, error);
        if (error.status === 403) {
          handleLogout();
        }
        setIsLoading(false);
        setIsSubmit(false);
      });
  };

  return (
    <>
      {isLoading == true ? (
        <>
          <div className="loader">
            <div className="loader-spinner"></div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1 className="h4 mb-0 font-secondary fw-medium">Assign Branches</h1>
        <div>
          <Link to={`${adminAlias}/users`} className="btn btn-primary btn-sm">
            <span className="nav-link-text">Back</span>
          </Link>
        </div>
      </div>
      <div className="table-view bg-white rounded-4 p-4">
        {error && <Alert variant="danger">⚠️{error}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  label="Select All"
                  id="selectAll"
                />
              </th>
              <th>Branch Code</th>
              <th>Serial Number</th>
            </tr>
          </thead>

          <tbody>
            {branchList.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedBranches.includes(item.id)}
                    onChange={() => handleCheckbox(item.id)}
                    label=""
                    id={`branch${item.id}`}
                  />
                  {/* <input
                    type="checkbox"
                    checked={selectedBranches.includes(item.id)}
                    onChange={() => handleCheckbox(item.id)}
                  /> */}
                </td>

                <td>{item.branchCode}</td>
                <td>{item.serialNumber}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Form.Group className="text-end">
          <Button
            onClick={handleSubmit}
            disabled={isSubmit}
            className="pill"
            size="lg"
          >
            <span>Submit</span>
          </Button>
        </Form.Group>
      </div>
    </>
  );
};

export default AssignBranch;
