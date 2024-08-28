import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
    <div>
      <form onSubmit={onFinish}>
        <input
          name="username"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      {isLogged ? <p>you are logged</p> : <p>you are not logged</p>}
    </div>
  );
}
