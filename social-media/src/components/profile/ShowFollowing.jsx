import { Link } from "react-router-dom";
import Avatar from "../imageComponents/Avatar";
import Header from "../Header";

function ShowFollowing({ following }) {
  return (
    <>
      <Header cssClass="text-align-left" size="2">
        {following ? `Following (${following.length})` : `Following (0)`}
      </Header>

      {following ? (
        <div className="following-container">
          {following.map((follow, index) => (
            <div className="following" key={follow + index}>
              <Avatar src={follow.avatar} />
              <Link to={`/profiles/${follow.name}`} className="author-name">
                {follow.name}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ShowFollowing;
