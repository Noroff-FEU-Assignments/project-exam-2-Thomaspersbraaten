import { BASE_URL } from "../../components/constants/baseUrl";

function removeProfilePicture(auth, name, type, url, modifier) {
  const removePictureUrl = BASE_URL + "/social/profiles/" + name + "/media";
  console.log(removePictureUrl);

  let stringifiedBody = {};
  if (type === "avatar") {
    stringifiedBody = JSON.stringify({
      avatar: "",
    });
  }
  if (type === "banner") {
    stringifiedBody = JSON.stringify({
      banner: "",
    });
  } else {
    stringifiedBody = JSON.stringify({
      banner: "",
    });
  }
  if (modifier === "change" && type === "avatar") {
    stringifiedBody = JSON.stringify({
      avatar: url,
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
