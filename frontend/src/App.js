import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import DashboardPage from "./pages/DashboardPage";
import ReviewPage from "./pages/ReviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/upload" element={<UploadPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/review/:id" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
