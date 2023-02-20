import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import { ProfileContext } from "../../components/context/ProfileContext";
import Avatar from "../../components/imageComponents/Avatar";
import Header from "../Header";

function ShowFollowers({ followers, setFollowers }) {
  // const [authName, setAuthName] = useContext(NameContext);
  // const [auth, setAuth] = useContext(AuthContext);
  // const [followers, setFollowers] = useState([]);
  // const [profile, setProfile] = useContext(ProfileContext);
  // const [profile, setProfile] = useState([]);

  // const { name } = useParams();
  console.log(followers);
  return (
    <>
      <Header size="2">Followers {`(${followers.length})`}</Header>

      <div className="profile-bottom-container">
        {followers.length > 0 ? (
          <>
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
          </>
        ) : (
          <h2>You have no followers</h2>
        )}
      </div>
    </>
  );
}

export default ShowFollowers;
