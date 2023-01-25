import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AiFillHome } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("auth");
    localStorage.removeItem("name");
    navigate("/");
  }

  if (auth) {
    return (
      <nav>
        <Link to="/">
          <AiFillHome />
        </Link>
        {/* <Link to="/login">login</Link> */}
        {/* <Link to="/create-account">create account</Link> */}
        <Link to="/create-Post">
          <BsPlusLg />
        </Link>
        <Link to="/my-profile">
          <FaUserAlt />
        </Link>

        <button onClick={logOut}>logout</button>
      </nav>
    );
  }
}

export default NavBar;
