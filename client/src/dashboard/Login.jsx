// dashboard/Login.jsx
// The admin types the password (from backend/.env) to open the dashboard.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import { useSettings } from "../context/SettingsContext";
import usePageTitle from "../hooks/usePageTitle";
import Field from "./Field";

function Login() {
  const { settings } = useSettings();
  const navigate = useNavigate();
  usePageTitle("Dashboard login");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(password);

      // Save the token in the browser so we stay logged in
      localStorage.setItem("adminToken", result.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>{settings.siteName}</h1>
        <p>Log in to manage your website.</p>

        <Field label="Password" type="password" value={password} onChange={setPassword} required />

        {error && <p className="alert alert-error">{error}</p>}

        <button type="submit" className="dash-btn dash-btn-primary dash-btn-full" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>

        <Link to="/" className="login-back">Back to website</Link>
      </form>
    </div>
  );
}

export default Login;
