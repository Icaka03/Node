import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../MyContext";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [users, setUsers] = useState([]);
  const { username } = useContext(MyContext);
  const addToDatabase = async () => {
    console.log("done");

    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, username }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("succefuly added task");
    } else {
      console.log(data.error || "failed to add task");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div>
      <h1>{username}</h1>
      <h1>Dashboard</h1>
      {users.map((user) => (
        <li key={user.id}>
          {user.username} - {user.password}
        </li>
      ))}
      <p>add text to your account and database</p>
      <input
        placeholder="write here"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={() => addToDatabase()}>Submit</button>
      {task ? <p>{task}</p> : null}
    </div>
  );
}
