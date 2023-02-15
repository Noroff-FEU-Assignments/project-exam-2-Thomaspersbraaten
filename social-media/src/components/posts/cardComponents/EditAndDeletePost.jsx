import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import deletePost from "../../ui/deletePost";
function EditAndDeletePost({ setShowEditForm, showEditForm }) {
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams();
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <div>
      {deleting && (
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
      )}
      <h3>This is your post and you may edit and delete it</h3>
      <div className="edit-post-container">
        <Button
          onClick={() => {
            setShowEditForm(true);
          }}
        >
          Edit Post
        </Button>
        <Button
          onClick={() => {
            setDeleting(true);
          }}
        >
          Delete Post
        </Button>
      </div>
    </div>
  );
}

export default EditAndDeletePost;
