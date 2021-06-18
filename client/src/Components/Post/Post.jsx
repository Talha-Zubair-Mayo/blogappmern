import React from "react";
import "./Post.css";
import { NavLink } from "react-router-dom";

function Post({ postsss }) {
  const PF = "http://localhost:5000/images/";

  return (
    <>
      <div className="post">
        {postsss.photo && (
          <img className="postimg" src={PF + postsss.photo} alt="PostImage" />
        )}

        <div className="postinfo">
          <div className="postCat">
            {postsss.categories.map((ca) => (
              <span className="postcats">{ca.catName}</span>
            ))}
          </div>

          <NavLink to={`/post/${postsss._id}`} className="linkk">
            <span className="postTitle">{postsss.title}</span>
          </NavLink>

          <hr />
          <span className="postDate">
            {new Date(postsss.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{postsss.desc}</p>
      </div>
    </>
  );
}

export default Post;
