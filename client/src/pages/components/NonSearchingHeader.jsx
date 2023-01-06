import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { SERVER_URI } from "../../utils";
import "./header.css";

function NonSearchingHeader() {
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState("");
  const [url, setUrl] = useState("");

  console.log(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .post(`${SERVER_URI}/user/user_data`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setUserName(res.data.first_name + " " + res.data.last_name);
        setUrl(res.data.avatar);
      });
  }, []);

  useEffect(() => {
    axios.get(`${SERVER_URI}/notifications`).then((res) => {
      setNotifications(res.data);
    });
  }, []);

  useEffect(() => {
    const icon = document.getElementById("notification_icon");
    function getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    function changeColor() {
      icon.style.color = getRandomColor();
    }
    setInterval(changeColor, 2000);
  }, []);
  function notification_seen(e) {
    e.preventDefault();
    axios.get(`${SERVER_URI}/notification_seen`).then((res) => {
      console.log("notifications seen");
    });
  }
  const statusName = {
    notStarted: "Not Started",
    inProgress: "In Progress",
    complete: "Complete",
    custom: "Custom",
  };
  return (
    <div className="col-12 mt-5">
      <div className="row">
        <div className="col-10 mx-auto">
          <div className="d-flex justify-content-between">
            <div
              className="mb-3"
              style={{ animation: "2s anim-lineUp ease-in-out" }}
            >
             
                
            </div>

            <div
              style={{
                cursor: "pointer",
                animation: "2s anim-lineUp ease-in-out",
              }}
            >
              {notifications.length > 0 ? (
                <i
                  className="fas fa-stopwatch fa-lg vertical-align-middle mr-3"
                  data-toggle="collapse"
                  href="#notification_bar"
                  id="notification_icon"
                  onClick={notification_seen}
                  style={{ cursor: "pointer" }}
                ></i>
              ) : (
                <i
                  className="fas fa-bell-slash fa-lg vertical-align-middle mr-3"
                  title="you have no reminder right now!"
                ></i>
              )}
              <div
                className="collapse"
                style={{
                  width: "400px",
                  position: "absolute",
                  zIndex: "1",
                  right: "0",
                }}
                id="notification_bar"
              >
                <ul className="list-group">
                  {notifications.map((notify, index) => {
                    return (
                      <li
                        className="list-group-item d-flex align-items-baseline"
                        key={index}
                      >
                        <i className="fas fa-stopwatch text-info"></i>&nbsp;
                        <small>
                          You have reached the day{" "}
                          <span className="text-warning">
                            {notify.todo.due_date}
                          </span>
                          ! please complete your task:{" "}
                          <span className="text-danger">
                            {notify.todo.title}
                          </span>
                        </small>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <img
                src={`${url}`}
                alt="profile img"
                style={{
                  width: "35px",
                  height: "30px",
                  borderRadius: "50%",
                  animation: "2s anim-lineUp ease-in-out",
                }}
              />
              <Link
                to="/my-profile"
                className="ml-2"
                style={{
                  fontWeight: 500,
                  animation: "2s anim-lineUp ease-in-out",
                }}
              >
                {userName ? userName : "Anonymous"}
                <i className="fas fa-angle-down rotate-icon align-middle"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-5" style={{ backgroundColor: "#fcfcfc" }} />
    </div>
  );
}

export default NonSearchingHeader;
