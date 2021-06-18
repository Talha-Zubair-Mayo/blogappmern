import React from "react";
import "./posts.css";
import Post from "../Post/Post";

function Posts({ pos }) {
  return (
    <>
      <div className="posts">
        {pos.map((p) => (
          <Post postsss={p} key={p._id} />
        ))}
      </div>
    </>
  );
}

export default Posts;
