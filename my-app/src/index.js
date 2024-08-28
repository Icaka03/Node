import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./components/LoginForm";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
