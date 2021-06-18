import React, { useContext, useState } from "react";
import "./SinglePost.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Context } from "../../contexts/Context";

function SinglePost() {
  const [PostData, SetPostData] = useState([]);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getposts = async () => {
      const res = await axios.get("/posts/" + path);

      SetPostData(res.data);
      seTtitle(res.data.title);
      seTdesc(res.data.desc);
    };

    getposts();
  }, [path]);

  const PF = "http://localhost:5000/images/";

  const { user , dispatch } = useContext(Context);

  // Delete

  const DeletePost = async () => {
    await axios.delete(`http://localhost:5000/api/posts/${PostData._id}`, {
      data: { postId: PostData._id, username: user.username },
    });

    window.location.replace("/");
  };

  // Update Post

  const [title, seTtitle] = useState("");
  const [desc, seTdesc] = useState("");
  const [updateMode, setupdateMode] = useState(false);

  const Submittt = async () => {
    const res = await axios.put(
      `http://localhost:5000/api/posts/${PostData._id}`,
      {
        postId: PostData._id,
        username: user.username,
        title , desc
      }
    );
    // window.location.reload();
    setupdateMode(false);
  };

  return (
    <>
      <div className="SinglePost">
        <div className="SinglePostWraper">
          {PostData.photo && (
            <img
              className="postimg"
              src={PF + PostData.photo}
              alt="PostImage"
            />
          )}
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singleposttitleinput"
              autofocus
              onChange={(e) => seTtitle(e.target.value)}
            />
          ) : (
            <h1 className="SinglePostTitle">
              {title}
              {PostData.username === user?.username && (
                <div className="SinglePostEdit">
                  <EditIcon
                    className="SinglePostIcon1"
                    onClick={() => setupdateMode(true)}
                  />
                  <DeleteIcon
                    className="SinglePostIcon2"
                    onClick={DeletePost}
                  />
                </div>
              )}
            </h1>
          )}
          <div className="SinglePostInfo">
            <span className="SinglePostAuthor">
              Author:
              <b>
                <NavLink to={`/?user=${PostData.username}`} className="linkk">
                  {PostData.username}
                </NavLink>
              </b>
            </span>
            <span className="SinglePostDate">
              {new Date(PostData.createdAt).toDateString()}
            </span>
          </div>
          {updateMode ? (
            <>
              <textarea
                className="SinglePostDescInput"
                onChange={(e) => seTdesc(e.target.value)}
              >
                {desc}
              </textarea>

              <div className="Buttonss">
                <button className="singlepostbtn1" onClick={Submittt}>
                  Update
                </button>
                <button
                  className="singlepostbtn2"
                  onClick={(e) => setupdateMode(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p className="SinglePostDesc">{desc}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SinglePost;
