import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import { useContext, useRef, useState } from "react";
import { BASE_URL } from "./constants/baseUrl";
import { AuthContext } from "./context/AuthContext";

function ReactionOverlay({ show, target, post, symbols, setSymbols }) {
  // const [show, setShow] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  // const target = useRef(null);

  async function reactToPost(symbol) {
    const reactUrl = BASE_URL + `/social/posts/${post.id}/react/` + symbol + "?_author=true";
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    try {
      const response = await fetch(reactUrl, options);
      const json = await response.json();
      console.log(json);

      symbols.forEach((arr) => {
        if (arr.symbol === json.symbol) {
          console.log("already in use");
        }
      });
      setSymbols([...symbols, json]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {/* <Overlay target={target.current} show={show} placement="top" className="react-tooltip"> */}
      <Overlay show={show} placement="top" target={target.current} className="react-tooltip">
        {(props) => (
          <Tooltip {...props}>
            <ListGroup>
              <ListGroup.Item
                onClick={() => {
                  reactToPost("😄");
                }}
              >
                😄
              </ListGroup.Item>
              <ListGroup.Item
                onClick={() => {
                  reactToPost("🙂");
                }}
              >
                🙂
              </ListGroup.Item>
              <ListGroup.Item
                onClick={() => {
                  reactToPost("👍");
                }}
              >
                👍
              </ListGroup.Item>
              <ListGroup.Item
                onClick={() => {
                  reactToPost("🤝");
                }}
              >
                🤝
              </ListGroup.Item>
              <ListGroup.Item
                onClick={() => {
                  reactToPost("👎");
                }}
              >
                👎
              </ListGroup.Item>
              <ListGroup.Item
                onClick={() => {
                  reactToPost("🙁");
                }}
              >
                🙁
              </ListGroup.Item>
              <ListGroup.Item
                onClick={() => {
                  reactToPost("😭");
                }}
              >
                😭
              </ListGroup.Item>
            </ListGroup>
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default ReactionOverlay;
