import { useState } from "react";
import ShowFollowing from "../profile/ShowFollowing";
import ShowFollowers from "../profile/ShowFollowers";
import ShowPosts from "../profile/ShowPosts";

function ProfileLinks({ profile, followers, setFollowers, following }) {
  const [showPosts, setShowPosts] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  return (
    <>
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

      <div>{showPosts && <ShowPosts profile={profile} />}</div>
      <div>{showFollowers && <ShowFollowers followers={followers} setFollowers={setFollowers} />}</div>
      <div>{showFollowing && <ShowFollowing profile={profile} following={following} />}</div>
    </>
  );
}

export default ProfileLinks;
