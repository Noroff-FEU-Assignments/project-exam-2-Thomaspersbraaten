import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import { ProfileContext } from "../../components/context/ProfileContext";
import Avatar from "../../components/imageComponents/Avatar";
import Header from "../Header";

function ShowFollowers({ followers, setFollowers }) {
  return (
    <>
      <Header size="2">{followers ? `Followers (${followers.length})` : `Followers (0)`}</Header>
      {/* {followers && <Header size="2">{followers || followers.length < 1 ? `followers ${followers.length}` : `Following (0)`}</Header>} */}

      {followers && (
        <div className="follower-container">
          {followers.map((follower, index) => (
            <div className="follower" key={follower + index}>
              <Avatar src={follower.avatar} />
              <Link to={`/profiles/${follower.name}`} className="author-name">
                {follower.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ShowFollowers;

// const [authName, setAuthName] = useContext(NameContext);
// const [auth, setAuth] = useContext(AuthContext);
// const [followers, setFollowers] = useState([]);
// const [profile, setProfile] = useContext(ProfileContext);
// const [profile, setProfile] = useState([]);

// const { name } = useParams();
