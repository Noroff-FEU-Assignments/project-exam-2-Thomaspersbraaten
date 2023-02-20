import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import removeProfilePicture from "./removeProfilePicture";
import NavBar from "../../components/navigation/NavBar";
import imagePlaceholder from "../../images/image-placeholder.png";
import avatarPlaceholder from "../../images/avatar-placeholder.png";
import Modal from "react-bootstrap/Modal";
import ShowPosts from "./ShowPosts";
import ShowFollowers from "./ShowFollowers";
import Avatar from "../../components/imageComponents/Avatar";
import Banner from "../../components/imageComponents/Banner";
import ShowFollowing from "./ShowFollowing";
import { useParams } from "react-router-dom";
import UserContainer from "../../components/user/UserContainer";
import ProfileLinks from "../../components/user/ProfileLinks";

function MyProfile() {
  const [authName, setAuthName] = useContext(NameContext);
  const [auth, setAuth] = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [imageType, setImageType] = useState("");
  const [counts, setCounts] = useState([]);
  const [profile, setProfile] = useState([]);
  // Bootstrap modal handling
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useParams();
  const myProfileUrl = BASE_URL + "/social/profiles/" + authName + "?_posts=true&_following=true&_followers=true";

  const options = {
    headers: {
      Authorization: `bearer ${auth}`,
    },
  };

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetch(myProfileUrl, options);
        const json = await response.json();
        // console.log(response);
        console.log(json);
        setProfile(json);
        setCounts(json._count);
        // setPosts(json.posts);
        // setAvatar(json.avatar);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  }, []);

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div className="image-container">
          <Banner author={profile} />
          <Avatar cssClass="profile-avatar" author={profile} />
        </div>
        <UserContainer profile={profile.name} />
        <ProfileLinks profile={profile} />
      </div>
      {/* <NavBar />
      <div className="profile-container">
        <div className="image-container">
          <div
            onClick={() => {
              handleShow();
              setImageType("banner");
            }}
          >
            <Banner author={profile} />
          </div>
          <div
            onClick={() => {
              handleShow();
              setImageType("avatar");
            }}
          >
            <Avatar author={profile} cssClass="profile-avatar" />
          </div>

          <Modal
            show={show}
            onHide={() => {
              handleClose();
              setShowInput(false);
            }}
            className="modal-top"
          >
            <Modal.Body>
              {imageType === "avatar" ? (
                <img src={!profile.avatar ? avatarPlaceholder : profile.avatar} className="modal-image" />
              ) : (
                <img src={!profile.banner ? imagePlaceholder : profile.banner} className="modal-image" />
              )}
            </Modal.Body>
          </Modal>
          <Modal
            show={show}
            onHide={() => {
              handleClose();
              setShowInput(false);
            }}
            className="modal-bottom"
          >
            <Modal.Body className="modal-bottom__body">
              <div className="modal-actions">
                {showInput && (
                  <>
                    <input onChange={(e) => setImageUrl(e.target.value)}></input>
                  </>
                )}
                {showInput ? (
                  <p onClick={() => removeProfilePicture(auth, authName, imageType, imageUrl, "change")}>Confirm</p>
                ) : (
                  <>
                    <p onClick={() => setShowInput(true)}>{imageType === "avatar" ? "Change Profile picture" : "Change banner picture"}</p>
                    <p variant="danger" className="modal-actions__remove" onClick={() => removeProfilePicture(auth, authName, imageType, imageUrl, "remove")}>
                      {imageType === "avatar" ? "Remove Profile picture" : "Remove banner picture"}
                    </p>
                  </>
                )}
                <p
                  onClick={() => {
                    handleClose();
                    setShowInput(false);
                  }}
                >
                  Cancel
                </p>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <UserContainer profile={profile} />

        <div className="profile-links">
          <div
            onClick={() => {
              setShowPosts(true);
              setShowFollowers(false);
              setShowFollowing(false);
            }}
          >
            {counts.posts} Posts
          </div>
          <div
            onClick={() => {
              setShowFollowers(true);
              setShowPosts(false);
              setShowFollowing(false);
            }}
          >
            {counts.followers} Followers
          </div>
          <div
            onClick={() => {
              setShowFollowing(true);
              setShowPosts(false);
              setShowFollowers(false);
            }}
          >
            {counts.following} Following
          </div>
        </div>
      </div>
      <div>{showFollowers && <ShowFollowers />}</div>
      <div>{showPosts && <ShowPosts />}</div>
      <div>{showFollowing && <ShowFollowing />}</div> */}
    </>
  );
}

export default MyProfile;
