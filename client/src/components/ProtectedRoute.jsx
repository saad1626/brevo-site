// components/ProtectedRoute.jsx
// Wraps the dashboard. If the admin is not logged in,
// it sends them to the login page instead.

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkLogin } from "../api";
import Loader from "./Loader";

function ProtectedRoute(props) {
  // "checking", "allowed" or "denied"
  const [status, setStatus] = useState("checking");

  useEffect(function () {
    async function check() {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setStatus("denied");
        return;
      }

      // Ask the server if the saved token is still valid
      try {
        await checkLogin();
        setStatus("allowed");
      } catch (err) {
        localStorage.removeItem("adminToken");
        setStatus("denied");
      }
    }

    check();
  }, []);

  if (status === "checking") {
    return <Loader />;
  }

  if (status === "denied") {
    return <Navigate to="/dashboard/login" replace />;
  }

  return props.children;
}

export default ProtectedRoute;
