import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/Login.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const onFinish = (e) => {
    e.preventDefault();
    console.log("done");

    axios
      .post("http://localhost:3001/validatePassword", { username, password })
      .then((res) => {
        if (res.data.validation) {
          alert("Your password is correct");
          setIsLogged(true);
        } else {
          alert("Your password is not correct");
        }
      });
    console.log(isLogged);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/dashboard");
    }
  }, [isLogged, navigate]);

  return (
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={onFinish}>
        <div>
          <p>Username</p>
          <input
            name="username"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Log in</button>
      </form>
      <div className="register-text">
        <p>
          Don't have an account?{" "}
          <span>
            <Link to="/register" style={{ color: "#3554d1" }}>
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
