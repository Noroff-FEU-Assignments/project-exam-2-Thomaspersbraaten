// import React, { useContext, useEffect, useState } from "react";
// import Button from "react-bootstrap/esm/Button";
// import { useParams } from "react-router-dom";
// import { BASE_URL } from "../constants/baseUrl";
// import { AuthContext } from "../context/AuthContext";
// import { NameContext } from "../context/NameContext";

// function Follow({ profile }) {
//   //   const [followUrl, setFollowUrl] = useState("");
//   const [following, setFollowing] = useState("");

//   const [auth, setAuth] = useContext(AuthContext);
//   const [authName, setAuthName] = useContext(NameContext);

//   const { name } = useParams();

//   const options = {
//     method: "PUT",
//     headers: {
//       Authorization: `bearer ${auth}`,
//     },
//   };

//   let followingVariable = "";

//   useEffect(() => {
//     console.log(profile);
//     const followers = profile.followers;
//     console.log(followers);
//     const amIFollowing = followers?.some((follower) => {
//       return follower.name === authName;
//     });
//     console.log(amIFollowing);
//     if (amIFollowing) {
//       followingVariable = "/unfollow";
//       setFollowing(true);
//       //   setFollowUrl(BASE_URL + "/social/profiles/" + name + "/unfollow");
//     } else {
//       followingVariable = "/follow";
//       setFollowing(false);
//       //   setFollowUrl(BASE_URL + "/social/profiles/" + name + "/follow");
//     }
//     // setFollowUrl(BASE_URL + "/social/profiles/" + name + followingVariable);
//   }, [name]);

//   const unfollowUrl = BASE_URL + "/social/profiles/" + name + "/unfollow";
//   const followUrl = BASE_URL + "/social/profiles/" + name + "/follow";

//   async function followUser() {
//     console.log(followUrl);
//     try {
//       const response = await fetch(followUrl, options);
//       const json = await response.json();
//       console.log(json);
//       if (json) {
//         setFollowing(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async function unfollowUser() {
//     console.log(unfollowUrl);
//     try {
//       const response = await fetch(unfollowUrl, options);
//       const json = await response.json();
//       console.log(json);
//       if (json) {
//         setFollowing(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//       <Button
//         onClick={() => {
//           if (following) {
//             unfollowUser();
//           } else {
//             followUser();
//           }
//         }}
//       >
//         {following ? "Unfollow" : "follow"}
//       </Button>
//     </>
//   );
// }

// export default Follow;
