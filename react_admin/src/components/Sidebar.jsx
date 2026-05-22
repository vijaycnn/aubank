import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Nav, Image, Button } from "react-bootstrap";
import logo from "../assets/logo.svg";
import {
  BiGridAlt,
  BiGroup,
  BiLogOut,
  BiInfoSquare,
  BiListUl,
  BiUser,
  BiImages,
  BiUpload,
  BiBuildings,
} from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
const adminAlias = import.meta.env.VITE_API_ADMIN_ALIAS;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    localStorage.clear("auth-token");
    localStorage.clear();
    navigate(adminAlias);
  };
  const isActive = (paths) => {
    const currentPath = location.pathname;

    const pathList = Array.isArray(paths) ? paths : [paths];
    return pathList.some(
      (path) => currentPath === path || currentPath.startsWith(path + "/"),
    );
  };
  //to manage menu access //it's static part. update part uploaded soon...
  const authToken = localStorage.getItem("auth-token");
  const user = jwtDecode(authToken);
  // console.log('user >>>', user);
  const userEmail = localStorage.getItem("userEmail");
  let hasAccess = true;
  if (user.userType == "branch") {
    hasAccess = false;
  }
  useEffect(() => {
    // Only for mobile
    if (window.innerWidth < 992) {
      setIsOpen(false);
      document.body.classList.remove("sidebar-collapse");
    }
  }, [location.pathname]);
  const handleCollapseBtn = () => {
    setIsOpen((prev) => !prev);
    document.body.classList.toggle("sidebar-collapse");
  };

  return (
    <>
      <aside className="app-sidebar">
        <Button
          variant="dark"
          className="app-collapse-btn d-lg-none"
          onClick={handleCollapseBtn}
        >
          &nbsp;
        </Button>
        <Link className="app-sidebar-logo" to={`${adminAlias}/dashboard`}>
          <Image src={logo} alt="" />
        </Link>
        <div className="app-sidebar-nav">
          <Nav className="flex-column">
            <Link
              to={`${adminAlias}/dashboard`}
              className={`nav-link ${
                isActive(`${adminAlias}/dashboard`) ? "active" : ""
              }`}
            >
              <span className="nav-link-icon">
                <BiGridAlt />
              </span>
              <span className="nav-link-text">Dashboard</span>
            </Link>
            {/* <Link to={`${adminAlias}/participant`} className={`nav-link ${ isActive(`${adminAlias}/participant`) ? "active" : "" }`} >
              <span className="nav-link-icon">
                <BiUser />
              </span>
              <span className="nav-link-text">Branch</span>
            </Link> */}
            <Link
              to={`${adminAlias}/branches`}
              className={`nav-link ${isActive([`${adminAlias}/branches`, `${adminAlias}/addBranch`, `${adminAlias}/editBranch`, `${adminAlias}/branchInfo`]) ? "active" : ""}`}
            >
              <span className="nav-link-icon">
                <BiBuildings />
              </span>
              <span className="nav-link-text">Branch</span>
            </Link>
            {hasAccess ? (
              <>
                <Link
                  to={`${adminAlias}/users`}
                  className={`nav-link ${isActive([`${adminAlias}/users`, `${adminAlias}/addUser`, `${adminAlias}/editUser`, `${adminAlias}/assign-branch`]) ? "active" : ""}`}
                >
                  <span className="nav-link-icon">
                    <BiGroup />
                  </span>
                  <span className="nav-link-text">Users</span>
                </Link>
              </>
            ) : (
              ""
            )}
          </Nav>
        </div>
        <div className="w-100 p-lg-3 d-lg-flex btn-logout">
          <Button
            variant="primary btn-icon"
            title="Logout"
            onClick={handleLogout}
          >
            <span>
              <BiLogOut size={18} color="white" />
            </span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
