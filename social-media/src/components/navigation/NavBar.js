import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AiFillHome } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { NameContext } from "../context/NameContext";

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);
  const [name, setName] = useContext(NameContext);

  const navigate = useNavigate();

  function logOut() {
    setName(null);
    setAuth(null);
    navigate("/welcome");
  }

  if (auth) {
    return (
      <nav>
        <Link to="/">
          <AiFillHome />
        </Link>
        <Link to="/create-Post">
          <BsPlusLg />
        </Link>
        <Link to={`/profiles/my-profile`}>
          <FaUserAlt />
        </Link>
        <button onClick={logOut}>logout</button>
      </nav>
    );
  }
}

export default NavBar;
