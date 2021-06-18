import React, { useContext } from "react";
import "./TopBar.css";
import { NavLink } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import SearchIcon from "@material-ui/icons/Search";
import { Context } from "../../contexts/Context";

function TopBar() {

  const {user , dispatch} = useContext(Context);

  const Logoutt= ()=>
  {
    dispatch({type:"LOGOUT"});
  }

  const PF = "http://localhost:5000/images/";
  return (
    <>
      <div className="top">
        <div className="topleft">
          <FacebookIcon className="topicons" />
          <TwitterIcon className="topicons" />
          <LinkedInIcon className="topicons" />
          <InstagramIcon className="topicons" />
        </div>
        <div className="topcenter">
          <ul className="topList">
            <li className="list-items">
              <NavLink to="/" className="linkk">
                HOME
              </NavLink>
            </li>
            <li className="list-items">
              <NavLink to="/" className="linkk">
                ABOUT
              </NavLink>
            </li>
            <li className="list-items">
              <NavLink to="/" className="linkk">
                CONTACT
              </NavLink>
            </li>
            <li className="list-items">
              <NavLink to="/write" className="linkk">
                WRITE
              </NavLink>
            </li>
            <li className="list-items" onClick={Logoutt}>{user && "LOGOUT"}</li>
          </ul>
        </div>
        <div className="topright">
          {user ? (
            <NavLink to="/settings" className="linkk">
            <img
              src={PF + user.profilepic}
              alt="Profile"
              className="topimg"
            />
                  </NavLink>
            
          ) : (
            <>
            <ul className="topListt">
                <li className="list-items">
                  <NavLink to="/login" className="linkk">
                  
                   LOGIN
                  </NavLink>
                </li>
                <li className="list-items">
                  <NavLink to="/register" className="linkk">
                  REGISTER
                  </NavLink>
                </li>
              </ul>
            </>
          )}

          <SearchIcon className="topSearchicon" />
        </div>
      </div>
    </>
  );
}

export default TopBar;
