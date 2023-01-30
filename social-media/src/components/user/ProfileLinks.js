import { useContext, useState } from "react";
import ShowFollowers from "../../pages/myProfile/ShowFollowers";
import ShowFollowing from "../../pages/myProfile/ShowFollowing";
import ShowPosts from "../../pages/myProfile/ShowPosts";
import { ProfileContext } from "../context/ProfileContext";

// function ProfileLinks({ posts, counts, profile }) {
function ProfileLinks() {
  const [showPosts, setShowPosts] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  //   const [profile, setProfile] = useContext(ProfileContext);
  //   console.log(profile.posts.length);

  return (
    <>
      {/* <div>{count.followers}ee</div> */}
      <div className="profile-links">
        <div
          onClick={() => {
            setShowPosts(true);
            setShowFollowers(false);
            setShowFollowing(false);
          }}
        >
          Posts
        </div>
        <div
          onClick={() => {
            setShowFollowers(true);
            setShowPosts(false);
            setShowFollowing(false);
          }}
        >
          followers
        </div>
        <div
          onClick={() => {
            setShowFollowing(true);
            setShowPosts(false);
            setShowFollowers(false);
          }}
        >
          following
        </div>
      </div>

      <div>{showPosts && <ShowPosts />}</div>
      <div>{showFollowers && <ShowFollowers />}</div>
      <div>{showFollowing && <ShowFollowing />}</div>
      {/* {showFollowers && <ShowFollowers />}
      {showPosts && <ShowPosts />}
      {showFollowing && <ShowFollowing />} */}
    </>
  );
}

export default ProfileLinks;
