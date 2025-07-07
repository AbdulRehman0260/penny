import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { CirclePoundSterling } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  if (authUser) {
    return (
      <div className="navbar-container">
        <div>
          <CirclePoundSterling className="nav-coin" />
          <CirclePoundSterling className="nav-coin" />
          <CirclePoundSterling className="nav-coin" />
        </div>
        <button
          className="navbar-btn"
          type="button"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="navbar-container">
        <button
          className="navbar-btn"
          type="button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Join us
        </button>
        <button
          className="navbar-btn"
          type="button"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    );
  }
};

export default Navbar;
