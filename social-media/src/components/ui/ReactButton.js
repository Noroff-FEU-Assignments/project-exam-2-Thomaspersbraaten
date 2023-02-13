import React, { useState, useRef, useContext } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { AuthContext } from "../context/AuthContext";
import { MdAddReaction } from "react-icons/md";
import ReactionOverlay from "../ReactionOverlay";

export default function ReactButton({ post }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [reactions, setReactions] = useState(post.reactions);

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
          {reactions.map((reaction, index) => (
            <div key={reaction.symbol + index}>{reaction.symbol + ` x${reaction.count}`}</div>
          ))}
        </Tooltip>
      );
    }
  };
  const TotalValue = () => {
    return reactions.reduce((acc, obj) => acc + obj.count, 0);
  };
  return (
    <>
      <OverlayTrigger placement="left" delay={{ show: 750, hide: 400 }} overlay={renderTooltip}>
        <div ref={target} onClick={() => setShow(!show)} className="reactions">
          <MdAddReaction className="reactions__icon" />
          {post.reactions === [] || reactions === [] ? <p>ok</p> : <p>{TotalValue()} Reactions</p>}
        </div>
      </OverlayTrigger>
      <ReactionOverlay show={show} target={target} post={post} reactions={reactions} setReactions={setReactions} />
    </>
  );

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
