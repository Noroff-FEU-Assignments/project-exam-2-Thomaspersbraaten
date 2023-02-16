import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import { useContext, useEffect, useRef, useState } from "react";
import { BASE_URL } from "./constants/baseUrl";
import { TrackReactionContext } from "./context/ReactionContext";
import { AuthContext } from "./context/AuthContext";

function ReactionOverlay({ show, target, post, reactions, setReactions }) {
  const [auth, setAuth] = useContext(AuthContext);
  const [trackReaction, setTrackReaction] = useContext(TrackReactionContext);
  const [canReact, setCanReact] = useState(true);
  // this component also Tracks if the user have reacted to a post or not and saves it to localstorage
  // This is just for demonstrating purposes since the API does not
  // support tracking of reactions.

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
      if (json.postId) {
        setTrackReaction([...trackReaction, post]);
        reactions.forEach((arr) => {
          if (arr.symbol === json.symbol) {
            console.log("already in use");
          }
        });
        setReactions([...reactions, json]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const checkedItem = trackReaction.some((reaction) => reaction.id === post.id);
    if (checkedItem === true) {
      setCanReact(false);
    } else {
      setCanReact(true);
    }
  }, [setTrackReaction]);

  return (
    <>
      {/* <Overlay target={target.current} show={show} placement="top" className="react-tooltip"> */}
      <Overlay show={show} placement="top" target={target.current} className="react-tooltip">
        {canReact ? (
          (props) => (
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
          )
        ) : (
          <Tooltip>
            <ListGroup>You have already reacted</ListGroup>
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default ReactionOverlay;
