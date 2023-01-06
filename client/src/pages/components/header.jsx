import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { SERVER_URI } from "../../utils";
import "./header.css";

function Header() {
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState("");
  const [url, setUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryList, setSearchQueryList] = useState([]);

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
  function searchQuery_handler(e) {
    e.preventDefault();
    if (searchQuery.length > 1) {
      axios
        .get(`${SERVER_URI}/todo/search_todo`, {
          params: { query: searchQuery },
        })
        .then((res) => {
          if (res.data.status === "success") {
            $("#search_result_list").removeClass("d-none");
            setSearchQueryList(res.data.data);
          }
        });
    } else {
      $("#search_result_list").addClass("d-none");
    }
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
        <div className="col-10 mx-auto" style={{ border: "none" }}>
          <div className="d-flex justify-content-between" c>
            <div
              className="mb-3"
              style={{
                animation: "2s anim-lineUp ease-in-out",
                background: "transparent",
              }}
            >
              <div
                className="input-group"
                style={{
                  width: "400px",
                  position: "relative",
                  borderRadius: "8px",
                  border: "none",
                  animation: "2s emergeAnimation ease-in-out",
                  background: "transparent",
                }}
              >
                <div className="input-group-prepend" style={{ border: "none" }}>
                  <span
                    className="input-group-text header_search_field_icon"
                    style={{ border: "none" }}
                  >
                    <i className="fas fa-search" style={{position: 'relative', fontSize: '1.2rem', left: '3rem'}}></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control header_search_field"
                  placeholder="Search your own workspaces"
                  onKeyUp={searchQuery_handler}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  style={{
                    border: "none",
                    background: "transparent",
                    boxShadow:
                      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                    padding: "20px 24px 20px 48px",
										fontSize: '.95rem'
                  }}
                />
              </div>
              <ul
                className="list-group position-absolute d-none mt-2"
                id="search_result_list"
                style={{ width: "400px", zIndex: "1" }}
              >
                {searchQueryList.map((item, index) => {
                  return (
                    <Link to="/view" state={item} key={index}>
                      <li className="list-group-item d-flex flex-column">
                        <div className="text-center mb-2">
                          <span style={{ color: "#17B794", fontWeight: 600 }}>
                            Your task:
                          </span>{" "}
                          {item.title}
                        </div>
                        <div className="d-flex justify-content-between">
                          <small>{statusName[item.status]}</small>
                          <small>{item.due_date}</small>
                        </div>
                      </li>
                    </Link>
                  );
                })}
              </ul>
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
                <i style={{fontSize: '1.2rem', position: 'relative', left: '1rem'}} className="fas fa-angle-down rotate-icon align-middle"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-5" style={{ backgroundColor: "#fcfcfc" }} />
    </div>
  );
}

export default Header;
