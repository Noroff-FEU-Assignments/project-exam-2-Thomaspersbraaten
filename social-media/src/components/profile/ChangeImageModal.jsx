import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import imagePlaceholder from "../../images/image-placeholder.png";
import avatarPlaceholder from "../../images/avatar-placeholder.png";

import removeProfilePicture from "./removeProfilePicture";
import { NameContext } from "../context/NameContext";
import { AuthContext } from "../context/AuthContext";
// import CreatePostImage from "../imageComponents/CreatePostImage";

function ChangeImageModal({ profile }) {
  const [authName, setAuthName] = useContext(NameContext);
  const [auth, setAuth] = useContext(AuthContext);

  const [imageUrl, setImageUrl] = useState("");

  const [showInput, setShowInput] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-top">
        <Modal.Body>
          <img src={!profile.avatar ? avatarPlaceholder : profile.avatar} className="modal-image" />
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose} className="modal-bottom">
        <Modal.Body className="modal-bottom__body">
          <div className="modal-actions">
            {showInput && (
              <>
                <input
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                ></input>
              </>
            )}
            {showInput ? (
              <p
                onClick={() => {
                  removeProfilePicture(auth, authName, "avatar", imageUrl, "change");
                }}
              >
                Confirm
              </p>
            ) : (
              <>
                <p
                  onClick={() => {
                    setShowInput(true);
                  }}
                >
                  Change Profile picture
                </p>
                <p
                  variant="danger"
                  className="modal-actions__remove"
                  onClick={() => {
                    removeProfilePicture(auth, authName, "avatar", imageUrl, "change");
                  }}
                >
                  Remove profile picture
                </p>
              </>
            )}

            <p onClick={handleClose}>Cancel</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangeImageModal;
