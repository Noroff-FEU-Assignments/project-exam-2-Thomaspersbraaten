import React, { useState, useRef, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../constants/baseUrl";

import { MdAddReaction } from "react-icons/md";
import ReactionOverlay from "../ReactionOverlay";

// export default function ReactButton({ post }) {
export default function ReactButton({ post }) {
  // console.log(post);
  const [show, setShow] = useState(false);
  // const [disabled, setDisabled] = useState(false);
  // const [style, setStyle] = useState("");

  const target = useRef(null);
  const [reactions, setReactions] = useState(post.reactions);

  const [auth, setAuth] = useContext(AuthContext);

  // async function reactToPost(symbol) {
  //   const reactUrl = BASE_URL + `/social/posts/${post.id}/react/` + symbol + "?_author=true";
  //   const options = {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer ${auth}`,
  //     },
  //   };

  //   try {
  //     const response = await fetch(reactUrl, options);
  //     const json = await response.json();
  //     console.log(json);

  //     symbols.forEach((arr) => {
  //       if (arr.symbol === json.symbol) {
  //         console.log("already in use");
  //       }
  //     });
  //     setSymbols([...symbols, json]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // let reactionCounter = 0;
  // const calculateReactions = () => {
  //   if (reactions) {
  //     reactions.forEach((sym) => {
  //       reactionCounter = reactionCounter + sym.count;
  //     });
  //   }
  // };
  // calculateReactions();

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
          {/* {symbols.map((reaction, index) => (
            <div key={reaction.symbol + index}>{reaction.symbol + ` x${reaction.count}`}</div>
          ))} */}
          {reactions.map((reaction, index) => (
            <div key={reaction.symbol + index}>{reaction.symbol + ` x${reaction.count}`}</div>
          ))}
        </Tooltip>
      );
    }
  };
  // console.log(post.reactions.length);
  const TotalValue = () => {
    return reactions.reduce((acc, obj) => acc + obj.count, 0);
  };
  return (
    <>
      <OverlayTrigger placement="left" delay={{ show: 750, hide: 400 }} overlay={renderTooltip}>
        <div ref={target} onClick={() => setShow(!show)} className="reactions">
          <MdAddReaction className="reactions__icon" />

          {post.reactions === [] || reactions === [] ? <p>ok</p> : <p>{TotalValue()} Reactions</p>}
          {/* {post.reactions.length > 0 && <p>{post.reactions.length} reactions</p>} */}

          {/* {post.reactions.length === 0 ? <p>0 reactions</p> : <p>{post.reactions.length} reactions</p>} */}
        </div>
      </OverlayTrigger>
      <ReactionOverlay show={show} target={target} post={post} reactions={reactions} setReactions={setReactions} />
    </>
  );
}
{
  /* <Overlay target={target.current} show={show} placement="top" className="react-tooltip">
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
    </Overlay> */
}
// function checkIfSymbolIsUsed(symbol) {
//   symbols.forEach((arr) => {
//     if (arr.symbol === symbol) {
//       setDisabled(true);
//       setStyle("disabled-reaction");
//       return true;
//     } else {
//       setDisabled(false);
//       setStyle("");
//       return false;
//     }
//   });
// }

{
  /* <Button ref={target} onClick={() => setShow(!show)}>
  
          {symbols.length} reactions
        </Button> */
}

{
  /* <ListGroup>
              <ListGroup.Item onClick={() => setShow(!show)}>😄</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>🙂</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>👍</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>🤝</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>👎</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>🙁</ListGroup.Item>
              <ListGroup.Item onClick={() => setShow(!show)}>😭</ListGroup.Item>
            </ListGroup> */
}

{
  /* <p>Click to react</p> */
}
{
  /* {post.reactions.map((reaction, index) => (
            <div key={reaction.symbol + index}>{reaction.symbol}</div>
          ))} */
}
