import React from "react";
import "./Header.css";

function Header() {
  return (
    <>
      <div className="header">
        <div className="headertitles">
          <span className="headertitlesml">React & Node</span>
          <span className="headertitlelg">BLOG</span>
        </div>

        <img src="https://images7.alphacoders.com/801/801765.jpg" className="Headerimg" alt="" />
      </div>
    </>
  );
}

export default Header;
