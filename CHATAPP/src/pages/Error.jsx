import React from "react";
import ErrorImage from "../assets/images/404.png";
import ErrorSideImage from "../assets/images/Rectangle.png";
import "../assets/css/Error.css";
import { NavLink } from "react-router-dom";

export default function Error() {
  return (
    <div className="error-container">
      <div className="container-one">
        <img src={ErrorImage} alt="errorbackGround" />
      </div>
      <div className="container-two">
        <img src={ErrorSideImage} alt="errorsideimage" />
      </div>

      <div className="text-content">
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <p>Sorry...! We couldn't find the page you're looking for.</p>
        <NavLink to="/home">Back to Home</NavLink>
      </div>
    </div>
  );
}
