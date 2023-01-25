import Button from "react-bootstrap/esm/Button";

import { Link, useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="not-found-container">
      <h1>Whoopsey!</h1>
      <div>404 Page not found</div>
      <img src="https://i.kym-cdn.com/photos/images/newsfeed/001/042/619/4ea.jpg" className="not-found-image" />
      <p>This page does not exist, but Travolta is looking....</p>
      <Link to="/">
        <Button>Click here to go to home page</Button>
      </Link>
      {/* <Button onClick={goBack}>Click here to go back</Button> */}
    </div>
  );
}

export default PageNotFound;
