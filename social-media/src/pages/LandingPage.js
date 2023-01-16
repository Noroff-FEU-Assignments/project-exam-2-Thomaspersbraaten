import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <button>
        <Link to="/login">Login</Link>
      </button>
      <button>
        <Link to="/create-account">Create account</Link>
      </button>
    </>
  );
}

export default LandingPage;
