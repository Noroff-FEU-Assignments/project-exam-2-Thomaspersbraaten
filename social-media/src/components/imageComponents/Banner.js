import imagePlaceholder from "../../images/image-placeholder.png";

function Banner({ author = [], cssClass = "profile-banner" }) {
  return <img className={cssClass} src={!author.banner ? imagePlaceholder : author.banner} />;
}

export default Banner;
