import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import CustomerDashboard from "../pages/Customer/Dashboard";
import ClaimOfficerDashboard from "../pages/ClaimOfficer/Dashboard";
import SurveyorDashboard from "../pages/Surveyor/Dashboard";
import AdminDashboard from "../pages/Admin/Dashboard";

import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/Signup/Signup";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";

import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";

import ClaimStatus from "../pages/Customer/ClaimStatus";
import MyClaims from "../pages/Customer/Claims/MyClaims";
import CreateClaim from "../pages/Customer/Claims/CreateClaim";
import Policies from "../pages/Customer/Policies";
import Profile from "../pages/Customer/Profile";
import Settings from "../pages/Customer/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      <Route
        path="/customer/settings"
        element={<Settings />}
      />

      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/claim-status"
        element={<ClaimStatus />}
      />

      <Route
        path="/customer/my-claims"
        element={<MyClaims />}
      />

      <Route
        path="/customer/policies"
        element={<Policies />}
      />

      <Route
        path="/customer/create-claim"
        element={<CreateClaim />}
      />  

      <Route
        path="/customer/profile"
        element={<Profile />}
      />

      <Route
        path="/claim-officer/dashboard"
        element={
          <ProtectedRoute role="claimOfficer">
            <ClaimOfficerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/surveyor/dashboard"
        element={
          <ProtectedRoute role="surveyor">
            <SurveyorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;