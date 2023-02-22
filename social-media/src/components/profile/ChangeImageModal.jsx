import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import bannerPlaceholder from "../../images/image-placeholder.png";
import avatarPlaceholder from "../../images/avatar-placeholder.png";
import changeAccountPicture from "./changeAccountPicture";
import { NameContext } from "../context/NameContext";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import FloatingError from "../feedback/FloatingError";
import Button from "react-bootstrap/esm/Button";

function ChangeImageModal({ setProfile, profile, show, setShow, imageType }) {
  const [authName] = useContext(NameContext);
  const [auth] = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { name } = useParams();
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <>
      {showError && <FloatingError error={error} setShowError={setShowError} />}
      <Modal show={show} onHide={() => setShow(false)} className="modal-top">
        <Modal.Body>
          {imageType === "avatar" && <img src={!profile.avatar ? avatarPlaceholder : profile.avatar} className="modal-image" />}
          {imageType === "banner" && <img src={!profile.banner ? bannerPlaceholder : profile.banner} className="modal-image" />}
        </Modal.Body>
      </Modal>
      {authName === name && (
        <Modal show={show} onHide={() => setShow(false)} className="modal-bottom">
          <Modal.Body className="modal-bottom__body">
            <div className="modal-actions">
              {showInput ? (
                <>
                  <input
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                    }}
                  ></input>
                  <p
                    onClick={() => {
                      changeAccountPicture(auth, authName, imageType, imageUrl, "change", profile, setProfile, setShow, setError, setShowError);
                    }}
                  >
                    Confirm
                  </p>
                </>
              ) : (
                <>
                  <p
                    onClick={() => {
                      setShowInput(true);
                    }}
                  >
                    Change {imageType} picture
                  </p>
                  <p
                    variant="danger"
                    className="modal-actions__remove"
                    onClick={() => {
                      changeAccountPicture(auth, authName, imageType, imageUrl, "remove", profile, setProfile, setShow, setError, setShowError);
                    }}
                  >
                    Remove {imageType} picture
                  </p>
                </>
              )}

              {/* <p
                onClick={() => {
                  setShow(false);
                  setShowInput(false);
                }}
              >
                Cancel
              </p> */}
              <Button
                variant="dark"
                onClick={() => {
                  setShow(false);
                  setShowInput(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ChangeImageModal;
