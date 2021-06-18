import React from "react";
import "./Single.css";
import SideBar from "../../Components/Sidebar/SideBar";
import SinglePost from "../../Components/SinglePost/SinglePost";

function Single() {
  return (
    <>
      <div className="Single">
        <SinglePost />
        <SideBar/>
      </div>
    </>
  );
}

export default Single;
