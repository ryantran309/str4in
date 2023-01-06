import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URI } from "../utils";

function AddTodo() {
    const location = useLocation();
    const navigate = useNavigate();
    const {status, workspace} = location.state;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    function add_todo(e){
        e.preventDefault();
        axios.post(`${SERVER_URI}/todo/add_todo`, {
            title: title,
            description: description,
            assignee: localStorage.getItem("token"),
            status: status,
            dueDate: dueDate,
            workspace: workspace
        }).then((res) => {
            if(res.data.status === "success"){
                navigate("/");
            }else{
                console.log(res.data.msg);
            }
        });
    }
    return (
        <div className="container">
        <div className="row d-flex align-items-center" style={{height: "100vh"}}>
        <div className="col-md-9 mx-auto">
        <div className="card card-body" style={{borderRadius: "20px"}}>
            <div className="d-flex flex-column">
                <label htmlFor="title" className="text-muted mb-0">Title: </label>
                <input type="text" className="form-control py-4 mb-3" id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                <label htmlFor="description" className="text-muted mb-0">Description: </label>
                <textarea className="form-control mb-3" rows="8" id="description" onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                <label htmlFor="due_date" className="text-muted mb-0">Due date: </label>
                <input type="date" className="form-control w-75 mb-3" id="due_date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
                <div><hr /></div>
                <div className="d-flex justify-content-between">
                    <div><Link to="/" className="btn btn-secondary btn-sm"><i class="fas fa-undo-alt"></i> Back to Dashboard</Link></div>
                    <button type="button" className="btn btn-primary btn-sm" onClick={add_todo}>Add <i className="fas fa-plus-circle"></i></button>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}

export default AddTodo;