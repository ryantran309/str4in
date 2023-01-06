import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URI } from "../utils";

function DeleteTodo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { _id, title, description, assignee, status, due_date } =
    location.state;
  function delete_todo(e) {
    e.preventDefault();
    axios.post(`${SERVER_URI}/todo/delete_todo`, { id: _id }).then((res) => {
      if (res) {
        navigate("/");
      }
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
              <h4 className="font-weight-bold">{title}</h4>
              <div>
                <Link to="/update" state={location.state}>
                  <i className="fas fa-pen-alt mr-5"></i>
                </Link>
                <i className="fas fa-ellipsis-h text-muted mr-5"></i>
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
                        <td className="font-weight-bold">{due_date}</td>
                      </tr>
                    </tbody>
                  </small>
                </table>
              </div>
            </div>
            <hr className="my-4 mx-3" />
            <div className="px-3">
              <h6 className="font-weight-bold mb-3">To do</h6>
              <p className="mb-0">{description}</p>
            </div>
            <hr className="my-4 mx-3" />
            <h6 className="font-weight-bold mx-3">
              Are you sure to delete your current task ?
            </h6>
            <div className="row px-3">
              <div className="col-5">
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-success btn-sm mr-2"
                    style={{ width: "70px", borderRadius: "5px" }}
                    onClick={delete_todo}
                  >
                    Yes
                  </button>
                  <a
                    href="javascript:history.back()"
                    className="btn btn-danger btn-sm"
                    style={{ width: "70px", borderRadius: "5px" }}
                  >
                    No
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTodo;
