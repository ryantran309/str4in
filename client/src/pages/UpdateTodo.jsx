import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_URI } from "../utils";
import { useState } from "react";

function UpdateTodo() {
  const location = useLocation();
  const { _id, title, description, assignee, status, due_date } =
    location.state;
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [dueDate, setDueDate] = useState(
    due_date.split("/")[2] +
      "-" +
      due_date.split("/")[0] +
      "-" +
      due_date.split("/")[1]
  );
  console.log(_id);
  console.log(location.state);
  function update_todo_title(e) {
    e.preventDefault();
    axios
      .post(`${SERVER_URI}/todo/update_todo_title`, {
        id: _id,
        title: newTitle,
      })
      .then((res) => {
        if (res.data.status === "success") {
          let title_msg = document.getElementById("title_msg");
          title_msg.classList.remove("d-none");
          title_msg.classList.add("text-success");
          title_msg.innerHTML = "title updated successfully";
        } else if (res.data.status === "failed") {
          let title_msg = document.getElementById("title_msg");
          title_msg.classList.remove("d-none");
          title_msg.classList.add("text-danger");
          title_msg.innerHTML = "there is an error!";
        } else {
          let title_msg = document.getElementById("title_msg");
          title_msg.classList.add("d-none");
          title_msg.innerHTML = "";
        }
      });
  }
  function update_todo_description(e) {
    e.preventDefault();
    axios
      .post(`${SERVER_URI}/todo/update_todo_description`, {
        id: _id,
        description: newDescription,
      })
      .then((res) => {
        if (res.data.status === "success") {
          let description_msg = document.getElementById("description_msg");
          description_msg.classList.remove("d-none");
          description_msg.classList.add("text-success");
          description_msg.innerHTML = "description updated successfully";
        } else if (res.data.status === "failed") {
          let description_msg = document.getElementById("description_msg");
          description_msg.classList.remove("d-none");
          description_msg.classList.add("text-danger");
          description_msg.innerHTML = "there is an error!";
        } else {
          let description_msg = document.getElementById("description_msg");
          description_msg.classList.add("d-none");
          description_msg.innerHTML = "";
        }
      });
  }
  function due_date_changer(value) {
    axios
      .post(`${SERVER_URI}/todo/due_date_changer`, { id: _id, due_date: value })
      .then((res) => {
        setDueDate(value);
      });
  }
  return (
    <div className="container">
      <div
        className="row d-flex align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col-md-9 mx-auto">
          <div
            className="card card-body d-flex flex-column"
            style={{ borderRadius: "20px" }}
          >
            <div className="d-flex justify-content-end">
              <Link to="/">
                <i className="fas fa-times"></i>
              </Link>
            </div>
            <div className="d-flex justify-content-between px-3">
              <div className="text-center w-75">
                <small className="d-none" id="title_msg"></small>
                <input
                  type="text"
                  className="form-control mb-2"
                  onChange={(e) => setNewTitle(e.target.value)}
                  value={newTitle}
                  placeholder="title..."
                />
                <button
                  type="button"
                  className="btn btn-success btn-sm mr-2"
                  style={{ width: "70px", borderRadius: "5px" }}
                  onClick={update_todo_title}
                >
                  Save
                </button>
                <Link
                  to="/view"
                  state={location.state}
                  className="btn btn-danger btn-sm"
                  style={{ width: "70px", borderRadius: "5px" }}
                >
                  Cancel
                </Link>
              </div>

              <div>
                <i className="fas fa-pen-alt text-info mr-5"></i>
              </div>
            </div>
            <div className="row mt-4 px-3">
              <div className="col-12">
                <table>
                  <small>
                    <tbody>
                      <tr>
                        <td
                          className="font-weight-bold text-muted"
                          width="125px"
                        >
                          Status:
                        </td>
                        <td className="font-weight-bold">{status}</td>
                      </tr>
                      <tr style={{ lineHeight: "2.5" }}>
                        <td
                          className="font-weight-bold text-muted"
                          width="125px"
                        >
                          Assignee:
                        </td>
                        <td className="font-weight-bold">
                          <img
                            src={assignee.avatar}
                            alt="profile img"
                            style={{
                              width: "25px",
                              height: "25px",
                              borderRadius: "50%",
                            }}
                          />
                          <span className="font-weight-bold ml-2">
                            {assignee.first_name} {assignee.last_name}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="font-weight-bold text-muted"
                          width="125px"
                        >
                          Due date:
                        </td>
                        <td className="font-weight-bold">
                          <input
                            type="date"
                            className="form-control"
                            value={dueDate}
                            onChange={(e) => due_date_changer(e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </small>
                </table>
              </div>
            </div>
            <hr className="my-4 mx-3" />
            <div className="px-3">
              <h6 className="font-weight-bold mb-3">To do</h6>
              <small className="d-none" id="description_msg"></small>
              <textarea
                className="form-control mb-2"
                rows="8"
                onChange={(e) => setNewDescription(e.target.value)}
              >
                {newDescription}
              </textarea>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-success btn-sm mr-2"
                  style={{ width: "70px", borderRadius: "5px" }}
                  onClick={update_todo_description}
                >
                  Save
                </button>
                <Link
                  to="/view"
                  state={location.state}
                  className="btn btn-danger btn-sm"
                  style={{ width: "70px", borderRadius: "5px" }}
                >
                  Cancel
                </Link>
              </div>
            </div>
            <hr className="my-4 mx-3" />
            <div className="px-3">
              <Link
                to="/delete"
                state={location.state}
                className="btn btn-secondary btn-sm"
              >
                <i className="fas fa-trash"></i> Delete
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTodo;
