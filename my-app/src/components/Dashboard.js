import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import SideMenu from "./SideMenu";
import CalendarIcon from "../images/calendar.png";
export default function Dashboard() {
  const [task, setTask] = useState("");
  const [fetchTask, setFetchTask] = useState([]);
  const [date, setDate] = useState(new Date());
  const name = localStorage.getItem("name");
  const [username, setUsername] = useState("");
  const todaysDate = date.toDateString();
  const time = new Date();
  const showTime = time.getHours() + ":" + time.getMinutes();

  useEffect(() => {
    const storedUsername = localStorage.getItem("name");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const addToDatabase = async () => {
    console.log(task + " " + username + " " + todaysDate);
    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, username, todaysDate, showTime }),
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
        <div className="header">
          <h1> Hello, {name}</h1>
          <p className="heading-text">
            Add and track your tasks progression here
          </p>
          <div>
            <img
              src={CalendarIcon}
              alt="calendar-icon"
              className="calendar-icon"
            />
            <p className="currentDate">{todaysDate}</p>
          </div>
        </div>

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
        <div className="task-section">
          {fetchTask.map((task) => {
            if (task.username === name) {
              return (
                <div className="note">
                  <div className="task-date-box">
                    <img
                      src={CalendarIcon}
                      alt="calendar-icon"
                      className="task-calendar-icon"
                    />
                    <p>{task.date}</p>
                  </div>
                  <p className="task-task">{task.task} </p>

                  <p>{task.time}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
