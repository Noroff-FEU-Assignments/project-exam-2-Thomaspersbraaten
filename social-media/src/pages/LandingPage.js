import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";

function LandingPage() {
  const authenticated = localStorage.getItem("auth");
  const navigate = useNavigate();

  if (authenticated) {
    navigate("/home");
  }
  return (
    <div className="landing-container">
      <div className="signup">
        <p>Sign up for an account</p>
        <button className="signup__button">
          <Link to="/create-account">Sign up</Link>
        </button>
      </div>

      <div className="login">
        <p>Already have an account? </p>
        <button className="login__button login-button">
          <Link to="/login">Log in</Link>
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
