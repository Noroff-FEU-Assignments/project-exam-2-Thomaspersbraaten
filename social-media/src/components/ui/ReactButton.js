import React, { useState, useRef, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../constants/baseUrl";

export default function ReactButton({ post }) {
  console.log(post.reactions);
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [style, setStyle] = useState("");

  const target = useRef(null);
  const [symbols, setSymbols] = useState(post.reactions);
  const [auth, setAuth] = useContext(AuthContext);
  //   console.log(symbols);
  //   setSymbols(post.reactions);
  async function reactToPost(symbol) {
    const reactUrl = BASE_URL + `/social/posts/${post.id}/react/` + symbol;
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

  const renderTooltip = (props) => {
    if (!post.reactions || !post.reactions[0] || post.reactions.length === 0) {
      return (
        <Tooltip id="button-tooltip" className="hover-overlay" {...props}>
          No one has reacted
        </Tooltip>
      );
    } else {
      return (
        <Tooltip id="button-tooltip" className="hover-overlay" {...props}>
          <p>Reactions</p>
          {post.reactions.map((reaction, index) => (
            <div key={reaction.symbol + index}>{reaction.symbol}</div>
          ))}
        </Tooltip>
      );
    }
  };
  function checkIfSymbolIsUsed(symbol) {
    symbols.forEach((arr) => {
      if (arr.symbol === symbol) {
        setDisabled(true);
        setStyle("disabled-reaction");
        return true;
      } else {
        setDisabled(false);
        setStyle("");
        return false;
      }
    });
  }

  return (
    <>
      <OverlayTrigger placement="left" delay={{ show: 750, hide: 400 }} overlay={renderTooltip}>
        <Button ref={target} onClick={() => setShow(!show)}>
          {/* {post._count.reactions} Reactions */}
          {symbols.length} reactions
        </Button>
      </OverlayTrigger>
      <Overlay target={target.current} show={show} placement="top" className="react-tooltip">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            <p>Click to react</p>

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
            {/* <ListGroup>
              <ListGroup.Item onClick={() => setShow(!show)}>😄</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>🙂</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>👍</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>🤝</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>👎</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>🙁</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>😭</ListGroup.Item>
            </ListGroup> */}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}
