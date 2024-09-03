import TaskIcon from "../images/task.png";
import UsecIconOrange from "../images/user-orange.png";
import "../styles/SideMenu.css";

export default function SideMenu(tasks) {
  const name = localStorage.getItem("name");
  return (
    <div className="menu">
      <div className="menu-heading">
        <span className="orange-color">Task</span>Manager
      </div>
      <p className="heading-undertext">Focus.prioritize.Execute</p>
      <div className="menu-account">
        <img src={UsecIconOrange} className="empty-img" alt="user-icon" />

        <p className="account-username">{name}</p>
      </div>

      <div className="Menu-dropdown">Menu</div>
      <div className={!tasks ? "menu-contents" : "menu-contents active"}>
        <img
          src={TaskIcon}
          alt="task-icon"
          className={!tasks ? "menu-icons" : "menu-icons-active"}
        />
        <p className="menu-content-text">Add task</p>
      </div>
      <div className="menu-contents">
        <img src={TaskIcon} alt="task-icon" className="menu-icons" />
        <p className="menu-content-text">Account</p>
      </div>
      <div className="menu-contents">
        <img src={TaskIcon} alt="task-icon" className="menu-icons" />
        <p className="menu-content-text">Add task</p>
      </div>
    </div>
  );
}
