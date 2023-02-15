import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AiFillHome } from "react-icons/ai";
import { BsPlusLg, BsPeopleFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { NameContext } from "../context/NameContext";
import smallLogo from "../../images/small-logo.png";

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);
  const [authName, setAuthName] = useContext(NameContext);

  // const navigate = useNavigate();

  // function logOut() {
  //   setAuthName(null);
  //   setAuth(null);
  //   navigate("/welcome");
  // }

  if (auth) {
    return (
      <nav>
        <Link to="/">
          <img src={smallLogo} className="small-logo" />
        </Link>
        <Link to="/">
          <AiFillHome />
        </Link>
        <Link to="/create-Post">
          <BsPlusLg />
        </Link>
        <Link to={`/profiles/${authName}`}>
          <FaUserAlt />
        </Link>
        <Link to="/profiles">
          <BsPeopleFill />
        </Link>
        {/* <button onClick={logOut}>logout</button> */}
      </nav>
    );
  }
}

export default NavBar;
