import { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ShowFollowing from "../profile/ShowFollowing";
import ShowFollowers from "../profile/ShowFollowers";
import ShowPosts from "../profile/ShowPosts";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// function ProfileLinks({ posts, counts, profile }) {
function ProfileLinks({ profile, followers, setFollowers }) {
  const [showPosts, setShowPosts] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  //   const [profile, setProfile] = useContext(ProfileContext);
  //   console.log(profile.posts.length);

  return (
    <>
      {/* <div>{count.followers}ee</div> */}
      {/* <div className="profile-links">
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
      </div> */}
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" justify>
        <Tab eventKey="posts" title="Posts">
          <ShowPosts profile={profile} />
        </Tab>
        <Tab eventKey="followers" title="Followers">
          <ShowFollowers followers={followers} setFollowers={setFollowers} />
        </Tab>
        <Tab eventKey="following" title="Following">
          <ShowFollowing profile={profile} />
        </Tab>
      </Tabs>

      <div>{showPosts && <ShowPosts profile={profile} />}</div>
      <div>{showFollowers && <ShowFollowers followers={followers} setFollowers={setFollowers} />}</div>
      <div>{showFollowing && <ShowFollowing profile={profile} />}</div>
    </>
  );
}

export default ProfileLinks;
