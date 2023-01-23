import Alert from "react-bootstrap/Alert";

function ErrorMessage(props) {
  return <Alert variant={props.variant}>{props.message}</Alert>;
}

export default ErrorMessage;
