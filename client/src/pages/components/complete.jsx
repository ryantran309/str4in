import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URI } from "../../utils";
import "./utils.css";

function Complete() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get(`${SERVER_URI}/todo/workspace_todos`, {
        params: { status: "complete", workspace: localStorage.getItem("ws") },
      })
      .then((res) => {
        setTodos(res.data.data);
      });
  }, [todos]);
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };
  const onDragOver = (ev) => {
    ev.preventDefault();
    document.getElementById("todoDropzone_ns").style.border = "dashed #ebebeb";
    document.getElementById("todoDropzone_ip").style.border = "dashed #ebebeb";
    document.getElementById("todoDropzone_cm").style.border = "dashed #ebebeb";
  };
  const onDrop = (ev, status_name) => {
    let id = ev.dataTransfer.getData("id");
    axios
      .post(`${SERVER_URI}/todo/status_dnd`, { id: id, status: status_name })
      .then((res) => {
        document.getElementById("todoDropzone_ns").style.border = "none";
        document.getElementById("todoDropzone_ip").style.border = "none";
        document.getElementById("todoDropzone_cm").style.border = "none";
      });
  };
  return (
    <div className="col">
      <div className="row">
        <div className="col-md-9" id="todoDropzone_cm">
          <h5
            style={{ animation: "2s emergeAnimation ease-in-out" }}
            className="d-flex justify-content-between align-items-center font-weight-bold"
          >
            <i
              className="fas fa-circle"
              style={{ fontSize: "13px", color: "#4bb679" }}
            ></i>{" "}
            Complete{" "}
            <span
              className="badge d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "#4bb679",
                color: "#ffffff",
                fontSize: "13px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                animation: "2s emergeAnimation ease-in-out",
              }}
            >
              {todos.length}
            </span>
          </h5>
          <div
            className="d-flex flex-column"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => {
              onDrop(e, "complete");
            }}
          >
            {todos.map((task) => {
              return (
                <Link
                  to="/view"
                  state={task}
                  className="mt-3"
                  key={task._id}
                  draggable
                  onDragStart={(e) => onDragStart(e, task._id)}
                >
                  <div
                    className="card card-body p-0"
                    style={{

                      position: "relative",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow:
                        "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                      animation: "2s emergeAnimation ease-in-out",
                    }}
                  >
                    <div className="d-flex flex-column mx-3 mt-2">
                      <small className="text-muted">Your taks...</small>
                      <span>{task.title}</span>
                    </div>
                    <hr className="mt-1 mb-0" />
                    <div className="mx-3 my-2">
                      <img
                        src={task.assignee.avatar}
                        alt="profile img"
                        style={{
                          width: "34px",
                          height: "32px",
                          borderRadius: "50%",
                          animation: "2s emergeAnimation ease-in-out",
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
            <div className="col-12 text-center mt-3">
              <Link
                to="/add"
                state={{
                  status: "complete",
                  workspace: localStorage.getItem("ws"),
                }}
                className="btn btn-lg px-4"
                style={{
                  fontSize: "14px",
                  color: "#ffffff",
                  backgroundColor: "#5046e5",
                  borderRadius: "10px",
                  animation: "2s emergeAnimation ease-in-out",
                }}
              >
                <i className="fas fa-plus fa-sm"></i> Add New Card
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complete;
