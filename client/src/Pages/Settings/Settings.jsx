import React, { useContext, useState } from "react";
import "./Settings.css";
import SideBar from "../../Components/Sidebar/SideBar";
import PersonIcon from "@material-ui/icons/Person";
import { Context } from "../../contexts/Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Settings() {
  const [Data, setData] = useState({
    username: "",
    email: "",
    pass: "",
    about:""
  });
  const [file, setfile] = useState();
  const [success, Setsuccess] = useState();
  const { user , dispatch } = useContext(Context);

  const inputhandler = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const Submitt = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_Start" });
    const UpdatedUser = {
      userId: user._id,
      username: user.username,
    };

    if (file) {
      const data = new FormData();
      const filename = "user_" + Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      UpdatedUser.profilepic = filename;
      if (Data.email) {
        UpdatedUser.email = Data.email;
      } else if (Data.pass) {
        UpdatedUser.pass = Data.pass;
      }
      else if(Data.about)
      {
        UpdatedUser.pass = Data.about;
      }

      try {
        await axios.post("/upload", data);
      } catch (error) {}
      try {
        const res = await axios.put(
          `http://localhost:5000/api/users/${user._id}`,
          UpdatedUser
        );
        Setsuccess(true);
        setTimeout(() => {
          Setsuccess(false);
        }, 2000);
        dispatch({ type: "UPDATE_Success"  , payload:res.data});
      } catch (error) {
        dispatch({ type: "UPDATE_Failure" });
      }
    } else {
      Setsuccess(false);
    }
  };
  const PF = "http://localhost:5000/images/";

  // DeleteProfile
 
  const DeleteProfile = async () => {
    await axios.delete(`http://localhost:5000/api/users/${user._id}`, {
      data: { userId: user._id, username: user.username },
    });

    dispatch({ type: "LOGOUT" });

    window.location.replace("/");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {success &&
        toast.success("🦄 Wow so easy!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })}
      <div className="Settings">
        <div className="SettingsWrapper">
          <div className="SettingsTitle">
            <span className="SettingsUpdateTitle">Update Your Account</span>
            <span className="SettingsDeleteTitle" onClick={DeleteProfile}>
              Delete Account
            </span>
          </div>
          <form className="SettingsForm" onSubmit={Submitt}>
            <label> Profile Picture</label>
            <div className="SettingsPP">
              {file ? (
                <img src={URL.createObjectURL(file)} alt="profilepic" />
              ) : (
                <img src={PF + user.profilepic} alt="profilepic" />
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

            <label> Username</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={inputhandler}
              name="username"
              disabled
            />
            <label> Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={inputhandler}
              name="email"
              value={Data.email}
            />
            <label> Password</label>
            <input
              type="password"
              onChange={inputhandler}
              name="pass"
              value={Data.pass}
            />
            <label> About</label>
            <textarea
              type="text"
              placeholder={user.about}
              onChange={inputhandler}
              name="about"
              cols="5"
            rows="5"
              
            ></textarea>
            <button className="SettingsSubmit" type="submit">
              Update
            </button>
          </form>
        </div>
        <SideBar />
      </div>
    </>
  );
}

export default Settings;
