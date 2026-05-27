import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/dashboard.css";

function LoginPage() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await API.post("token/", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="custom-card login-card">
        <h2 className="text-center mb-4">ESG Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-dark w-100" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;