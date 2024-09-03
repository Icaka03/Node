import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Registration successful!");
    } else {
      setMessage(data.error || "Registration failed");
    }
  };

  return (
    <div className="form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Username:</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Name"
          />
        </div>
        <div>
          <p>Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <div className="register-text">
        <p>
          Allready have an account?{" "}
          <span>
            <Link to="/" style={{ color: "#3554d1" }}>
              Log in
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
