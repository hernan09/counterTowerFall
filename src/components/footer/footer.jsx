import React from "react";
import "./index.css";
import LinkediIcon from "../../assets/linkedin.png";
import GitIcon from "../../assets/github.png";

const footer = () => {
  return (
    <div className="content-footer">
        <a className="footer-link" rel="noopener noreferrer" target="_blank" href="https://github.com/hernan09/">© Powered by Hernan Ssr</a>
      <span className="content-icons">
        <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/hern%C3%A1n-gomez/">
          <img className="icon-footer" src={LinkediIcon} alt="" />
        </a>
        <a rel="noopener noreferrer" target="_blank" href="https://github.com/hernan09/">
          <img className="icon-footer git" src={GitIcon} alt="" />
        </a>
      </span>
    </div>
  );
};

export default footer;
