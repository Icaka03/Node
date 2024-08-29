import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../MyContext";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [fetchTask, setFetchTask] = useState([]);
  const { username } = useContext(MyContext);
  const name = localStorage.getItem("name");
  const addToDatabase = async () => {
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
      .get("http://localhost:3001/fetchTasks")
      .then((response) => {
        setFetchTask(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  return (
    <div>
      <h1> Welcome {name}</h1>
      <h1>Dashboard</h1>
      <p>add task to your account</p>
      <input
        placeholder="write here"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={() => addToDatabase()}>Submit</button>

      <h1>My tasks:</h1>
      {fetchTask.map((task) => {
        if (task.username === name) {
          return <p>{task.task} </p>;
        }
      })}
    </div>
  );
}
