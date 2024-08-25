import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./components/LoginForm";
import Register from "./components/Register";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Register />
    <Login />
  </React.StrictMode>
);
