import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URI } from "../utils";
import FallingBG from "./components/DynamicBackground";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function login(e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let email_error = document.getElementById("email_error").classList;
    let password_error = document.getElementById("password_error").classList;

    if (email === null || email === "") {
      email_error.remove("d-none");
    } else {
      email_error.add("d-none");
    }
    if (password === null || password === "") {
      password_error.remove("d-none");
    } else {
      password_error.add("d-none");
    }
    axios
      .post(`${SERVER_URI}/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "success") {
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          document
            .getElementById("login_failed_div")
            .classList.remove("d-none");
          document.getElementById("login_failed_msg").innerText = res.data.msg;
        }
      });
  }
  const style = {
    background: "#f2f2f2",
    border: "0",
  };
  return (
    <>
      <FallingBG></FallingBG>
      <div
        className="container pt-5"
        style={{
          position: "absolute",
          top: "10rem",
          left: "20%",
          backgroundColor: "#fff",
          width: "1000px",
          height: "500px",
          padding: "3rem 4rem",
          borderRadius: "15px",
        }}
      >
        <div
          className="row mt-5"
          style={{ position: "relative", left: "14rem" }}
        >
          <div className="col-md-6 mt-auto mb-auto">
            <h2
              className="font-weight-bold mb-3"
              style={{
                animation: "2s formAnimation ease-in-out",
              }}
            >
              Login
            </h2>
            <div className="d-none" id="login_failed_div">
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <span id="login_failed_msg"></span>
                <button type="button" className="close" data-dismiss="alert">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div className="mb-3" style={{ fontWeight: 600 }}>
              <label
                className="mb-0"
                htmlFor="email"
                style={{
                  animation: "2s formAnimation ease-in-out",
                }}
              >
                Email
              </label>
              <small
                className="ml-2 text-danger font-weight-bold d-none"
                id="email_error"
              >
                Email cannot be empty
              </small>
              <input
                type="email"
                id="email"
                className="form-control"
                style={{
                  ...style,
                  padding: "8px 16px",
                  animation: "2s formAnimation ease-in-out",
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label
                className="font-weight-bold mb-0"
                htmlFor="password"
                style={{
                  fontWeight: 600,
                  animation: "2s formAnimation ease-in-out",
                }}
              >
                Password
              </label>
              <small
                className="ml-2 text-danger font-weight-bold d-none"
                id="password_error"
              >
                Password cannot be empty
              </small>
              <input
                type="password"
                id="password"
                className="form-control"
                style={{ ...style, animation: "2s formAnimation ease-in-out" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <button
              type="button"
              onClick={login}
              className="btn btn-sm w-100 mb-2"
              style={{
                backgroundColor: "#646fd4",
                color: "#ffffff",
                animation: "2s formAnimation ease-in-out",
              }}
            >
              Login
            </button>
            <div className="px-3">
              <Link
                to="/register"
                className="btn btn-sm font-weight-bold w-100"
                style={{
                  backgroundColor: "#d9d9d9",
                  animation: "2s formAnimation ease-in-out",
                }}
              >
                Don't have an account yet ? Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
