import { Link } from "react-router-dom";

function LandingPage() {
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
