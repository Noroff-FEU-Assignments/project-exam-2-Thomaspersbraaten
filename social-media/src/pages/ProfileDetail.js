import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import avatarPlaceholder from "../images/avatar-placeholder.png";
import bannerPlaceholder from "../images/image-placeholder.png";

import { AuthContext } from "../components/context/AuthContext";
import Banner from "../components/imageComponents/Banner";
import UserContainer from "../components/user/UserContainer";
import Modal from "react-bootstrap/Modal";
import ProfileLinks from "../components/user/ProfileLinks";
import ChangeImageModal from "../components/profile/ChangeImageModal";
import removeProfilePicture from "../components/profile/removeProfilePicture";
import { NameContext } from "../components/context/NameContext";
import { getOptions } from "../components/getOptions";
import { BASE_URL, PROFILE, SOCIAL_URL_EXT } from "../components/constants/api";
import ProfileAvatar from "../components/imageComponents/ProfileAvatar";
import Button from "react-bootstrap/esm/Button";
import logOut from "../components/ui/logOut";
import Header from "../components/Header";
import { BiLogOut } from "react-icons/bi";
import CreatePostImage from "../components/imageComponents/CreatePostImage";

function ProfileDetail() {
  const [auth, setAuth] = useContext(AuthContext);
  const [authName, setAuthName] = useContext(NameContext);
  const [imageType, setImageType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [amIFollowing, setAmIFollowing] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const navigate = useNavigate();
  const { name } = useParams();
  const profileUrl = BASE_URL + SOCIAL_URL_EXT + PROFILE + name + "?_posts=true&_following=true&_followers=true";

  const options = getOptions(auth);
  useEffect(() => {
    async function getProfileDetail() {
      try {
        const response = await fetch(profileUrl, options);
        const json = await response.json();
        console.log(json);
        setProfile(json);
        if (json.name === authName) {
          setIsMyProfile(true);
        }
        if (json.following) {
          setFollowing(json.following);
        }
        if (json.followers) {
          setFollowers(json.followers);
          const amIFollowingTheProfile = json.followers.some((follower) => {
            return follower.name === authName;
          });
          if (amIFollowingTheProfile) {
            setAmIFollowing(true);
          } else {
            setAmIFollowing(false);
          }
        }
      } catch (error) {
        console.log("WTFFF" + error);
      }
    }
    getProfileDetail();
  }, [name]);

  const handleClose = () => {
    setShowInput(false);
    setShow(false);
    setShowLogout(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <Modal show={show} onHide={handleClose} className="modal-top">
          <Modal.Body>
            {imageType === "avatar" && <img src={!profile.avatar ? avatarPlaceholder : profile.avatar} className="modal-image" />}
            {imageType === "banner" && <img src={!profile.banner ? bannerPlaceholder : profile.banner} className="modal-image" />}
          </Modal.Body>
        </Modal>
        {authName === name ? (
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
                      removeProfilePicture(auth, authName, imageType, imageUrl, "change");
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
                      Change {imageType} picture
                    </p>
                    <p
                      variant="danger"
                      className="modal-actions__remove"
                      onClick={() => {
                        removeProfilePicture(auth, authName, imageType, imageUrl, "change");
                      }}
                    >
                      Remove {imageType} picture
                    </p>
                  </>
                )}
                <p onClick={handleClose}>Cancel</p>
              </div>
            </Modal.Body>
          </Modal>
        ) : (
          ""
        )}
      </div>
      <ChangeImageModal profile={profile} />
      <div className="profile-container">
        {isMyProfile && (
          <div className="my-profile-container">
            <Header size="1">Your profile </Header>
            <Button
              className="logout-button"
              variant="outline-dark"
              onClick={() => {
                setShowLogout(true);
              }}
            >
              <BiLogOut /> Logout
            </Button>
          </div>
        )}
        <Modal show={showLogout} onHide={handleClose}>
          <Modal.Body className="modal-logout">
            <p>Are you sure you want to logout?</p>
            <Button
              className="logout-button"
              variant="outline-dark"
              onClick={() => {
                logOut(navigate, setAuth, setAuthName);
              }}
            >
              <BiLogOut /> Logout
            </Button>
            <Button onClick={handleClose} variant="dark">
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
        <div className="image-container">
          <div
            onClick={() => {
              handleShow(true);
              setImageType("banner");
            }}
          >
            <Banner author={profile} />
          </div>
          <div
            onClick={() => {
              handleShow(true);
              setImageType("avatar");
            }}
          >
            {profile && <ProfileAvatar src={profile} cssClass="profile-avatar" />}
          </div>
        </div>

        <UserContainer profile={profile} amIFollowing={amIFollowing} setAmIFollowing={setAmIFollowing} followers={followers} setFollowers={setFollowers} />
        <ProfileLinks profile={profile} followers={followers} setFollowers={setFollowers} following={following} />
      </div>
    </>
  );
}

export default ProfileDetail;
