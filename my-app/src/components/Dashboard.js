import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../MyContext";
import "../styles/Dashboard.css";
import SideMenu from "./SideMenu";
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
    <div className="flex">
      <SideMenu />
      <div className="task-box">
        <h1> Hello, {name}</h1>
        <p className="heading-text">
          Add and track your tasks progression here
        </p>
        <div className="line"></div>
        <div className="add-task">
          <h2>Add task to your account</h2>
          <input
            placeholder="write here"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={() => addToDatabase()}>Submit</button>
        </div>

        <h1>My tasks:</h1>
        {fetchTask.map((task) => {
          if (task.username === name) {
            return <p>{task.task} </p>;
          }
        })}
      </div>
    </div>
  );
}
