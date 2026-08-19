import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { decode as base64_decode } from "base-64";
import axios from "axios";
import logo from "../../assets/logo.svg";
import "../../scss/components/_preview.scss";

import axiosInstance from "../../helper/constants/axiosInstance";
const baseURL = import.meta.env.VITE_API_BASE_URL_BACKEND + "/api";

import NoticeA from "../../components/NoticeA";
import NoticeB from "../../components/NoticeB";
import NoticeC from "../../components/NoticeC";

function BranchInfo() {
  const [currentNotice, setCurrentNotice] = useState(0); // [0 / 1 / 2 ] for one by one notice section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotice((prev) => {
        if (prev === 2) return 0;
        return prev + 1;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    document.body.classList.add("preview-page");

    return () => {
      document.body.classList.remove("preview-page");
    };
  }, []);

  const params = useParams();
  const decode = base64_decode(params.id);
  let id = decode.split("+")[1];
  id = parseInt(id);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getBranchDetails = async () => {
    setLoading(true);
    await axios
      .get(`${baseURL}/branch/getBranchDetailById/${id}`)
      .then((response) => {
        // console.log(">>> ", response.data);
        setLoading(false);
        if (response.data.status === "success") {
          setData(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log("Error>>> ", error.status, error);
        if (error.status === 403) {
          // handleLogout();
        }
        setLoading(false);
      });
  };
  const [data, setData] = useState({
    managerName: "",
    managerNameHindi: "",

    address: "",
    addressHindi: "",

    contactNumber: "",
    contactNumberHindi: "",

    email: "",
    emailHindi: "",

    regionalOfficer: "",
    regionalName: "",
    regionalAddress: "",
    regionalContactNumber: "",
    regionalEmail: "",

    regionalOfficerHindi: "",
    regionalNameHindi: "",
    regionalAddressHindi: "",
    regionalContactNumberHindi: "",
    regionalEmailHindi: "",

    principalOfficer: "",
    principalName: "",
    principalAddress: "",
    principalContactNumber: "",
    principalEmail: "",

    principalOfficerHindi: "",
    principalNameHindi: "",
    principalAddressHindi: "",
    principalContactNumberHindi: "",
    principalEmailHindi: "",

    ombudsmanPost: "",
    ombudsmanName: "",
    ombudsmanAddress: "",
    ombudsmanContact: "",
    ombudsmanEmail: "",

    ombudsmanPostHindi: "",
    ombudsmanNameHindi: "",
    ombudsmanAddressHindi: "",
    ombudsmanContactHindi: "",
    ombudsmanEmailHindi: "",

    complainUrl: "",
    complainEmail: "",
    complainAddress: "",
    complainUrlHindi: "",
    complainEmailHindi: "",
    complainAddressHindi: "",

    officerName: "",
    branchName: "",
    branchMangerName: "",
    branchMangerContact: "",
    branchServiceMangerName: "",
    branchServiceMangerContact: "",
    policeName: "",
    policeContact: "",
    fireName: "",
    fireContact: "",
    hospitalName: "",
    hospitalContact: "",
    ambulanceName: "",
    ambulanceContact: "",
  });
  useEffect(() => {
    // Initial API call
    getBranchDetails();

    // Refresh every 3 seconds
    const interval = setInterval(() => {
      getBranchDetails();
      // setLoading(true);
      setPreviousData(null);
    }, 5000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [id]);

  return (
    <>
      {loading == true ? (
        <>
          {/* <div className="loader">
            <div className="loader-spinner"></div>
          </div> */}
        </>
      ) : (
        ""
      )}
      <section className="branch-form-preview">
        {currentNotice === 0 && <NoticeA data={data} />}
        {currentNotice === 1 && <NoticeB data={data} />}
        {currentNotice === 2 && <NoticeC data={data} />}

        <div className="text-center form-logo">
          <img src={logo} alt="logo" />
        </div>
      </section>
    </>
  );
}

export default BranchInfo;
