import Alert from "react-bootstrap/Alert";

function ErrorMessage({ variant, message }) {
  return <Alert variant={variant}>{message}</Alert>;
}

export default ErrorMessage;
