import React, { useContext, useState } from "react";
import "./SideBar.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Context } from "../../contexts/Context";

function SideBar() {
  const [Cat, SetCat] = useState([]);
  const { user, dispatch } = useContext(Context);
  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/Category");
      console.log(res.data);
      SetCat(res.data);
    };
    getCategory();
  }, []);

  // SideBar Pic

  const PF = "http://localhost:5000/images/";

  return (
    <>
      <div className="sidebar">
        <div className="sidebaritem">
          <span className="sidebartitle">ABOUT</span>
          {user ? (
            <>
              <img src={PF + user.profilepic} alt="" className="Sidebarimggg" />
              <p>{user.about}</p>
            </>
          ) : (
            <>
              <img
                src="https://wallpapercave.com/uwp/uwp1181101.jpeg"
                alt=""
                className="Sidebarimggg"
              />
              <p>Hello Welcome To My First MERN Stack Blog application,</p>
            </>
          )}
        </div>

        <div className="sidebaritem">
          <div className="sidebartitle">
            <ul className="sidebarList">
              {Cat.map((ca) => (
                <li className="SidebarListitem" key={ca._id}>
                  <NavLink to={`/?CatName=${ca.CatName}`} className="linkk">
                    {ca.CatName}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sidebaritem">
          <span className="sidebartitle">FOLLOW US</span>
          <div className="sidebarsocial">
            <FacebookIcon className="sidebarIcons" />
            <TwitterIcon className="sidebarIcons" />
            <LinkedInIcon className="sidebarIcons" />
            <InstagramIcon className="sidebarIcons" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
