import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./scss/main.scss";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Forgot from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";


import Users from "./pages/master/User";
import AddUser from "./pages/master/AddUser";
import EditUser from "./pages/master/EditUser";
import AssignBranch from "./pages/master/AssignBranch";

import Branches from "./pages/master/Branch";
import AddBranch from "./pages/master/AddBranch";
import EditBranch from "./pages/master/EditBranch";
import BranchInfo from "./pages/master/BranchInfo";
import ViewBranchInfo from "./pages/master/ViewBranchInfo";
import ViewBranchScreen from "./pages/master/ViewBranchScreen";

const adminAlias = import.meta.env.VITE_API_ADMIN_ALIAS;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [azureUser, setAzureUser] = useState(true);

  const handleAuthStateChange = (isAuth, user) => {
    setIsAuthenticated(isAuth);
    if (isAuth && user) {
      setAzureUser(user);
    } else {
      setAzureUser(null);
    }
  };
  return (
    <>
      <Router>
        <Routes>
          <Route
            path={adminAlias}
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                onAuthStateChange={handleAuthStateChange}
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Forgot/>
            }
          />
          <Route
            path={`${adminAlias}/forgot-password-update/:id`}
            element={
              <UpdatePassword />
            }
          />
          <Route
            path={`${adminAlias}/dashboard`}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${adminAlias}/branches`}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <Branches />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${adminAlias}/addBranch`}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <AddBranch />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${adminAlias}/editBranch/:id`}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <EditBranch />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path={`${adminAlias}/branchInfo/:id`}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <BranchInfo />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${adminAlias}/viewBranchInfo/:id`}
            element={
              // <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ViewBranchInfo />
              // </ProtectedRoute>
            }
          />
          <Route
            path={`${adminAlias}/viewBranchScreen/:id`}
            element={ <ViewBranchScreen /> }
          />
          <Route
            path={`${adminAlias}/users`}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <Users />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${adminAlias}/addUser`}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <AddUser />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${adminAlias}/editUser/:id`}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <EditUser />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${adminAlias}/assign-branch/:id`}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <AssignBranch />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* <Route path="*" element={<Navigate to="/admin" />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
