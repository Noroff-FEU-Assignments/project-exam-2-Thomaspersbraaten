import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Modal from "react-bootstrap/Modal";

import deletePost from "../../ui/deletePost";
function EditAndDeletePost({ setShowEditForm, showEditForm }) {
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams();
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <div className="post-actions">
      <Modal show={deleting}>
        <Modal.Body className="delete-modal">
          are you sure you want to delete?
          <Button
            variant="danger"
            onClick={() => {
              deletePost(id, auth);
            }}
          >
            Delete
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              setDeleting(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
      {/* {deleting && (
        <div>
          are you sure you want to delete?
          <Button
            onClick={() => {
              setDeleting(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deletePost(id, auth);
            }}
          >
            Confirm delete
          </Button>
        </div>
      )} */}
      <p>This is your post and you may edit and delete it</p>
      <div className="post-actions__buttons">
        <Button
          onClick={() => {
            setShowEditForm(true);
          }}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            setDeleting(true);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default EditAndDeletePost;
