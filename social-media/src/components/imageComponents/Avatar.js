import avatarPlaceholder from "../../images/avatar-placeholder.png";
function Avatar({ author = [], cssClass = "author-img" }) {
  return <img className={cssClass} src={!author.avatar ? avatarPlaceholder : author.avatar} />;
}

export default Avatar;
