import React from "react";
import { Link } from "react-router-dom";

const ProfileSide = ({ name, onLogout }) => {
  return (
    <div className="nav__profile">
      <p className="nav__profile--name">{name}</p>
      <Link to="/logout" className="logout-profile" onClick={onLogout}>
        Logout
      </Link>
    </div>
  );
};

export default ProfileSide;
