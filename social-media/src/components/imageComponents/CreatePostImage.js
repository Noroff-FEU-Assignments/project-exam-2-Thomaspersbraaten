import { useEffect, useState } from "react";
import imagePlaceholder from "../../images/image-placeholder.png";

function CreatePostImage({ imageUrl }) {
  const [src, setSrc] = useState(null);
  const [imageClass, setImageClass] = useState("");
  const [imageInfo, setImageInfo] = useState("");

  useEffect(() => {
    async function fetchImage() {
      console.log(imageUrl);
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
          if (imageUrl.length > 0) {
            setImageInfo("❌ Image link is not valid");
          } else {
            setImageInfo("");
          }
        }
      } catch (error) {
        setSrc(imagePlaceholder);
        setImageClass("invalid-image");
        if (imageUrl.length > 0) {
          setImageInfo("❌ Image link is not valid");
        } else {
          setImageInfo("");
        }
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
