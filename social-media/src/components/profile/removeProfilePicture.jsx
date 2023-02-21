import { BASE_URL } from "../constants/baseUrl";

function removeProfilePicture(auth, authName, type, url, modifier) {
  const removePictureUrl = BASE_URL + "/social/profiles/" + authName + "/media";
  console.log(removePictureUrl);

  let stringifiedBody = {};
  // Remove avatar
  if (modifier === "remove" && type === "avatar") {
    stringifiedBody = JSON.stringify({
      avatar: "",
    });
  }
  // Change Avatar
  if (modifier === "change" && type === "avatar") {
    stringifiedBody = JSON.stringify({
      avatar: url,
    });
  }
  // Remove Banner
  if (modifier === "remove" && type === "banner") {
    stringifiedBody = JSON.stringify({
      banner: "",
    });
  }
  // Change Banner
  if (modifier === "change" && type === "banner") {
    stringifiedBody = JSON.stringify({
      banner: url,
    });
  }

  async function removePicture() {
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      body: stringifiedBody,
    };
    try {
      const response = await fetch(removePictureUrl, options);
      const json = await response.json();
      window.location.reload();

      console.log(response);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }
  removePicture();
}

export default removeProfilePicture;
