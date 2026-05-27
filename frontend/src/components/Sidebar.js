import React, { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../styles/dashboard.css";

function Sidebar() {

  const [open, setOpen] =
    useState(false);

  const [collapsed, setCollapsed] =
    useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (
    <>

      {/* MOBILE TOPBAR */}

      <div
        className="d-lg-none d-flex justify-content-between align-items-center px-3 py-3"
        style={{
          backgroundColor: "#212529",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >

        <h4 style={{ margin: 0 }}>
          Breathe ESG
        </h4>

        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE SIDEBAR */}

      <div
        className="d-lg-none"
        style={{
          width: open ? "240px" : "0px",
          height: "100vh",
          backgroundColor: "#212529",
          position: "fixed",
          top: 0,
          left: 0,
          overflowX: "hidden",
          transition: "0.3s",
          zIndex: 1001,
          padding: open ? "20px" : "0px",
        }}
      >

        {
          open && (
            <>

              <div className="d-flex justify-content-between align-items-center">

                <h3 style={{ color: "white" }}>
                  ESG
                </h3>

                <button
                  className="btn btn-light btn-sm"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>

              </div>

              <hr style={{ borderColor: "#555" }} />

              <Link
                to="/dashboard"
                className="sidebar-link"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                to="/upload"
                className="sidebar-link"
                onClick={() => setOpen(false)}
              >
                Upload Data
              </Link>

              <button
                className="btn btn-danger w-100 mt-4"
                onClick={logout}
              >
                Logout
              </button>

            </>
          )
        }

      </div>

      {/* DESKTOP SIDEBAR */}

      <div
        className="d-none d-lg-flex flex-column justify-content-between"
        style={{
          width: collapsed ? "90px" : "250px",
          height: "100vh",
          backgroundColor: "#212529",
          color: "white",
          padding: "20px",
          position: "fixed",
          top: 0,
          left: 0,
          transition: "0.3s",
          zIndex: 1000,
        }}
      >

        <div>

          {/* HEADER */}

          <div className="d-flex justify-content-between align-items-center">

            {
              !collapsed && (
                <h3 style={{ margin: 0 }}>
                  Breathe ESG
                </h3>
              )
            }

            <button
              className="btn btn-outline-light btn-sm"
              onClick={() =>
                setCollapsed(!collapsed)
              }
            >
              {collapsed ? "→" : "←"}
            </button>

          </div>

          <hr />

          {/* LINKS */}

          <Link
            to="/dashboard"
            className="sidebar-link"
            style={{
              color:
                location.pathname === "/dashboard"
                  ? "#0d6efd"
                  : "white",
            }}
          >
            {collapsed ? "📊" : "Dashboard"}
          </Link>

          <Link
            to="/upload"
            className="sidebar-link"
            style={{
              color:
                location.pathname === "/upload"
                  ? "#0d6efd"
                  : "white",
            }}
          >
            {collapsed ? "📤" : "Upload Data"}
          </Link>

        </div>

        {/* LOGOUT */}

        <button
          className="btn btn-danger w-100"
          onClick={logout}
        >
          {collapsed ? "⎋" : "Logout"}
        </button>

      </div>

    </>
  );
}

export default Sidebar;