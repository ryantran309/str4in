import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { SERVER_URI } from "../utils";
import { storage } from "../firebase";

function Profile() {
  const [id, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios
      .post(`${SERVER_URI}/user/user_data`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setID(res.data._id);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setAvatar(res.data.avatar)
      });
  }, []);
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar);
    };
  });

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  }
  function gender_selector() {
    if (gender === "Male") {
      setGender("Female");
    } else {
      setGender("Male");
    }
  }
  function update_user(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${avatar.name}`).put(avatar);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(avatar.name)
          .getDownloadURL()
          .then((url) => {
							console.log(url)
              axios
              .post(`${SERVER_URI}/user/user_update`, {
                	id: id,
                  first_name: firstName,
                  last_name: lastName,
                  email: email,
                  gender: gender,
                  avatar: url,
                })
                .then((res) => {
                    document.getElementById("success_msg").classList.remove("d-none");
                    setTimeout(() => {
                        document.getElementById("success_msg").classList.add("d-none");
                    }, 3000);
                });
            });
            // setUrl(url);
      }
    );
  }
  function password_modifier(e) {
    e.preventDefault();
    axios
      .post(`${SERVER_URI}/user/password_modifier`, {
        id: id,
        password: password,
        oldPassword: oldPassword,
      })
      .then((res) => {
        if (res.data.status === "success") {
          $("[data-dismiss=modal]").trigger({ type: "click" });
          document.getElementById("success_msg").classList.remove("d-none");
          setTimeout(() => {
            document.getElementById("success_msg").classList.add("d-none");
          }, 3000);
        } else {
          document
            .getElementById("old_password_error")
            .classList.remove("d-none");
        }
        setOldPassword("");
        setPassword("");
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
            className="card card-body"
            style={{ borderRadius: "20px", height: "650px" }}
          >
            <div className="d-flex justify-content-between">
              <div></div>
              <h4 className="font-weight-bold text-center mb-3">My Profile</h4>
              <Link to="/">
                <i className="fas fa-times"></i>
              </Link>
            </div>
            <hr className="mt-0 w-25 mx-auto" />
            <div className="row mb-3">
              <div className="col-12 d-none" id="success_msg">
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  user info has been updated
                  <button type="button" className="close" data-dismiss="alert">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div className="col-6">
                <label className="font-weight-bold mb-0" htmlFor="firstName">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="font-weight-bold mb-0" htmlFor="lastName">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="font-weight-bold mb-0" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
              <div className="col-6 mb-3 mt-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="gender">
                      Gender
                    </label>
                  </div>
                  {gender === "Female" ? (
                    <select
                      className="custom-select"
                      id="gender"
                      onChange={gender_selector}
                    >
                      <option value="Female" defaultValue id="g_female">
                        Female
                      </option>
                      <option value="Male" id="g_male">
                        Male
                      </option>
                    </select>
                  ) : (
                    <select
                      className="custom-select"
                      id="gender"
                      onChange={gender_selector}
                    >
                      <option value="Male" defaultValue id="g_male">
                        Male
                      </option>
                      <option value="Female" id="g_female">
                        Female
                      </option>
                    </select>
                  )}
                </div>
              </div>
              <div className="col-12">
                <small
                  data-toggle="modal"
                  data-target="#password_modal"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fas fa-lock text-danger"></i> Password Change
                </small>
              </div>
              <div className="col-12">
                <label
                  className="font-weight-bold"
                  htmlFor="user_avatar"
                  style={{
                    paddingBottom: 8,
                    position: "relative",
                    top: "1rem",
                  }}
                >
                  Choose your avatar:
                </label>
                <input
                  type="file"
                  id="user_avatar"
                  className="form-control"
                  style={{ border: "none" }}
                  onChange={handleFileUpload}
                  accept="image/png, image/jpeg, image/jpg"
                  name="avatar"
                />
              </div>
              <hr className="mt-0 w-25 mx-auto" />
              <div className="col-12">
                {avatar && (
                  <img
                    src={`${avatar.preview}`}
                    alt={`${avatar.preview ? "user avatar" : ""}`}
                    style={{
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      position: "absolute",
                      left: "35%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <div className="col-12 text-center">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={update_user}
                  style={{ position: "relative", top: "15rem" }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="password_modal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-none" id="old_password_error">
                <small className="text-danger font-weight-bold">
                  old password doesn't match!
                </small>
              </div>
              <label htmlFor="old_password">Old Password</label>
              <input
                type="text"
                className="form-control"
                id="old_password"
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
              />
              <label htmlFor="password">New Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="modal-footer d-flex justify-content-between p-0">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={password_modifier}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
