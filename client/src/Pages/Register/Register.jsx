import React, { useState } from "react";
import "./Register.css";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import PersonIcon from "@material-ui/icons/Person";

function Register() {
  const [error, setError] = useState(false);
  const [Fdata, SetFdata] = useState({
    Fname: "",
    username: "",
    email: "",
    pass: "",
    about: "",
  });

  const history = useHistory();

  const inputhandler = (e) => {
    const { name, value } = e.target;
    SetFdata((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const [file, setfile] = useState();
  const Submitt = async (e) => {
    e.preventDefault();

   
    try {
      if (file) {
        const NewUser = {
          name: Fdata.Fname,
          username: Fdata.username,
          email: Fdata.email,
          pass: Fdata.pass,
          about: Fdata.about,
        };

        setError(false);
        const data = new FormData();
        const filename = "user_" + Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        NewUser.profilepic = filename;
        try {
          await axios.post("/upload", data);
        } catch (error) {}
        const res = await axios
          .post("/auth/register", NewUser)
          .then((Response) => Response);

        if (res.status === 400) {
          window.alert("Failed to Register");
        } else if (res.status === 201) {
          history.push("/login");
        }
      } else {
        alert("Please Select Profile Pic");
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <div className="Register">
        <span className="RegisterTitle">Register</span>
        <form className="RegisterForm" onSubmit={Submitt}>
          <div>
            {file && (
              <img
                className="PPimg"
                src={URL.createObjectURL(file)}
                alt="profilepic"
              />
            )}
            <label htmlFor="fileInput">
              <PersonIcon className="SettingsPPIcon" />
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setfile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <label>Name</label>
          <input
            className="RegisterInputs"
            type="text"
            placeholder="Enter name....."
            required
            onChange={inputhandler}
            value={Fdata.Fname}
            name="Fname"
          />
          <label>Username</label>
          <input
            className="RegisterInputs"
            type="text"
            placeholder="Enter Username....."
            required
            onChange={inputhandler}
            value={Fdata.username}
            name="username"
          />
          <label>Email</label>
          <input
            className="RegisterInputs"
            type="email"
            placeholder="Enter Email....."
            required
            onChange={inputhandler}
            value={Fdata.email}
            name="email"
          />
          <label> Password</label>
          <input
            className="RegisterInputs"
            type="password"
            required
            onChange={inputhandler}
            value={Fdata.pass}
            name="pass"
          />
          <label> ABOUT Me</label>
          <textarea
            name="about"
            id=""
            cols="5"
            rows="5"
            onChange={inputhandler}
            value={Fdata.about}
          ></textarea>
          <button className="RegisterBtn">Register</button>
        </form>
        <button className="login">
          <NavLink to="/login" className="linkk">
            LOGIN
          </NavLink>
        </button>
        {error && <span style={{ color: "red" }}>Something Went Wrong</span>}
      </div>
    </>
  );
}

export default Register;
