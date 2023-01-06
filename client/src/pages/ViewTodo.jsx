import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ViewTodo.css";

function ViewTodo() {
    const location = useLocation();
    const {title, description, assignee, due_date, status} = location.state;
    const [statusName, setStatusName] = useState(status);
    const [calendarVisible, setCalendarVisible] = useState(false);
    useEffect(() => {
        if(status === "notStarted"){
            setStatusName("Not Started");
        }else if(status === "inProgress"){
            setStatusName("In Progress");
        }else if(status === "complete"){
            setStatusName("Complete");
        }
        document.querySelector(".react-calendar").classList.add("d-none");
    }, [status]);
    function calenderSwitch(){
        if(!calendarVisible){
            document.querySelector(".react-calendar").classList.remove("d-none");
            setCalendarVisible(true);
        }else{
            document.querySelector(".react-calendar").classList.add("d-none");
            setCalendarVisible(false);
        }
    }
    const db_date = due_date.split("/");
    const defaultDate = new Date(db_date[2], db_date[0]-1, db_date[1]);
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
                  <i
                    className="far fa-calendar-alt mr-3"
                    onClick={calenderSwitch}
                  ></i>
                  <Link to="/update" state={location.state}>
                    <i className="fas fa-pen-alt mr-5"></i>
                  </Link>
                  <Calendar value={defaultDate} />
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
                            style={{ color: "#FF5959" }}
                          >
                            <span style={{ color: "#54B435" }}>Status:</span>
                          </td>
                          <td className="font-weight-bold">{statusName}</td>
                        </tr>
                        <tr style={{ lineHeight: "2.5" }}>
                          <td
                            className="font-weight-bold text-muted"
                            width="125px"
                          >
                            <span style={{ color: "#FF5959" }}>Assignee:</span>
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
                            <span style={{ color: "#FFBD69" }}>Due date:</span>
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

export default ViewTodo;