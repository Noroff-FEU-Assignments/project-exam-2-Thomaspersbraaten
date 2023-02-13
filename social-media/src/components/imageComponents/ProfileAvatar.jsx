import avatarPlaceholder from "../../images/avatar-placeholder.png";

function ProfileAvatar({ src, cssClass = "" }) {
  return <img className={cssClass} src={!src.avatar ? avatarPlaceholder : src.avatar} />;
}

export default ProfileAvatar;
