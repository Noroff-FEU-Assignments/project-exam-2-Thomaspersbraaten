import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);

  if (auth) {
    return (
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/login">login</Link>
        <Link to="/create-account">create</Link>
        <Link to="/create-Post">Create Post</Link>
        <Link to="/my-profile">Profile</Link>

        <button
          onClick={() => {
            localStorage.removeItem("auth");
          }}
        >
          logout
        </button>
      </nav>
    );
  }
}

export default NavBar;
