import { useEffect, useState } from "react";
import imagePlaceholder from "../../images/image-placeholder.png";

function CreatePostImage({ imageUrl }) {
  const [src, setSrc] = useState(null);
  const [imageClass, setImageClass] = useState("");
  const [imageInfo, setImageInfo] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(imageUrl);
        console.log(response);
        if (response.type === "cors" && response.ok) {
          setSrc(imageUrl);
          setImageClass("valid-image");
          setImageInfo("✔️");
        } else {
          setSrc(imagePlaceholder);
          setImageClass("invalid-image");
          setImageInfo("❌ Image link is not valid");
        }
      } catch (error) {
        setSrc(imagePlaceholder);
        setImageClass("invalid-image");
        setImageInfo("❌ Image link is not valid");
      }
    }
    fetchImage();
  }, [imageUrl]);
  return (
    <div className="form-image-container">
      <img src={src} className="create-form-image" />
      <p className={imageClass}>{imageInfo}</p>
    </div>
  );
}

export default CreatePostImage;
