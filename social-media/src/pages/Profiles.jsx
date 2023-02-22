import { useContext, useEffect, useRef, useState, useCallback } from "react";
// import { AUTHOR_REACTIONS_COMMENTS, BASE_URL, POSTS_URL_EXT, PROFILES, SOCIAL_URL_EXT } from "../components/constants/api";
import { AuthContext } from "../components/context/AuthContext";
import ErrorMessage from "../components/feedback/ErrorMessage";
import { getOptions } from "../components/getOptions";
import ProfileCard from "../components/listOfProfiles/ProfileCard";
// import LoadingMoreData from "../components/loading/LoadingMoreData";
// import LoadingMorePosts from "../components/loading/LoadingMorePosts";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";
import Pageination from "../components/Pagination";
import LoadingIndicator from "../components/loading/LoadingIndicator";
import { BASE_URL } from "../components/constants/baseUrl";
import FloatingError from "../components/feedback/FloatingError";

function Profiles() {
  const [auth] = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numberOfProfiles, setNumberOfProfiles] = useState(15);
  const [loadingMoreProfiles, setLoadingMoreProfiles] = useState(false);
  const [profileLimitReached, setProfileLimitReached] = useState(false);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortButtonText, setSortButtonText] = useState("Sort by");
  const [offset, setOffset] = useState(0);
  // const profileUrl = BASE_URL + SOCIAL_URL_EXT + PROFILES + `?limit=${numberOfProfiles}&sort=name&sortOrder=${sortOrder}`;
  // const profileUrl = BASE_URL + SOCIAL_URL_EXT + PROFILES + `?limit=${numberOfProfiles}&sort=name&sortOrder=${sortOrder}&offset=${offset}`;
  const profileUrl = BASE_URL + `profiles/?limit=${numberOfProfiles}&sort=name&sortOrder=${sortOrder}&offset=${offset}`;
  const options = getOptions(auth, "GET");

  // const observer = useRef(null);

  // const lastProfile = useCallback(
  //   (node) => {
  //     if (loadingMoreProfiles) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         setLoadingMoreProfiles(true);
  //         setNumberOfProfiles(numberOfProfiles + 15);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [loadingMoreProfiles]
  // );

  useEffect(() => {
    async function getProfiles() {
      setLoading(true);
      if (profileLimitReached) {
        return;
      }
      try {
        const response = await fetch(profileUrl, options);
        const json = await response.json();

        console.log(response);
        console.log(json);

        if (response.status === 200) {
          setProfiles(json);
        } else if (response.status === 429) {
          setShowError(true);
          setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
        } else {
          setShowError(true);
          setError("An error occured, Please try again.");
        }
        if (json.length < 15) {
          setProfileLimitReached("No more profiles to show...");
        }
      } catch (error) {
        setShowError(true);
        setError("An error occured, Please try again.");
      } finally {
        setLoadingMoreProfiles(false);
        setLoading(false);
      }
    }
    getProfiles();
  }, [offset]);
  return (
    <>
      {/* <div className="profiles-container"> */}
      <h1>List of profiles</h1>

      <Pageination offset={offset} setOffset={setOffset} />
      {loading && <LoadingIndicator />}

      {/* <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {sortButtonText}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                console.log("name");
              }}
            >
              Name
            </Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div> */}
      {showError && <FloatingError error={error} setShowError={setShowError} />}
      {/* {error && <ErrorMessage message={error} variant="danger" />} */}
      {profiles.map((profile) => (
        <ProfileCard profile={profile} key={profile.email} />
      ))}
      {/* {profiles.map((profile, index) => {
        if (profiles.length === index + 1) {
          return <ProfileCard profile={profile} key={profile.email} />;
        } else {
          return <ProfileCard profile={profile} key={profile.email} />;
        }
      })} */}
      <Pageination offset={offset} setOffset={setOffset} />

      {/* {loadingMoreProfiles && !profileLimitReached && <LoadingMoreData typeOfData={"profiles"} />} */}
      {profileLimitReached && (
        <div className="end-container">
          <ErrorMessage message={profileLimitReached} variant="warning" />
        </div>
      )}
      {/* </div> */}
    </>
  );

  // if (response.status === 400) {
  //   if (json.errors && json.errors[0] && json.errors[0].code === "too_big") {
  //     setProfileLimitReached("This is the end, You cannot view more than 100 profiles");
  //   } else {
  //     setShowError(true)
  //     setError("An error occured, Please try again.");
  //   }
  // }

  // useEffect(() => {
  //   async function getProfiles() {
  //     console.log(profileUrl);
  //     if (profileLimitReached) {
  //       return;
  //     }
  //     try {
  //       const response = await fetch(profileUrl, options);
  //       const json = await response.json();

  //       console.log(response);
  //       console.log(json);

  //       if (json.length < 15) {
  //         setProfileLimitReached("No more posts to show...");
  //       }
  //       if (response.status === 400) {
  //         if (json.errors && json.errors[0] && json.errors[0].code === "too_big") {
  //           setProfileLimitReached("This is the end, You cannot view more than 100 profiles");
  //         } else {
  //           setError("an error occured");
  //         }
  //       }
  //       if (response.status === 200) {
  //         setProfiles(json);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoadingMoreProfiles(false);
  //     }
  //   }
  //   getProfiles();
  // }, [numberOfProfiles]);

  // return <ProfileCard profile={profile} key={profile.email} referance={lastProfile} />;

  {
    /* <>
        <div key="divkey234242">
          <Button
            key="132434"
            onClick={() => {
              setNextPage(nextPage + 15);
            }}
          >
            1
          </Button>
          <Button
            key="242342"
            onClick={() => {
              setNextPage(nextPage + 15);
            }}
          >
            2
          </Button>
          <Button
            key="323424"
            onClick={() => {
              setNextPage(nextPage + 15);
            }}
          >
            3
          </Button>
        </div>
      </> */
  }

  // return (
  //   <div className="profiles-container">
  //     <h1>List of profiles</h1>
  //     <div>
  //       <Dropdown>
  //         <Dropdown.Toggle variant="success" id="dropdown-basic">
  //           {sortButtonText}
  //         </Dropdown.Toggle>

  //         <Dropdown.Menu>
  //           <Dropdown.Item
  //             onClick={() => {
  //               console.log("name");
  //             }}
  //           >
  //             Name
  //           </Dropdown.Item>
  //           <Dropdown.Item>Another action</Dropdown.Item>
  //           <Dropdown.Item>Something else</Dropdown.Item>
  //         </Dropdown.Menu>
  //       </Dropdown>
  //     </div>
  //     {error && <ErrorMessage message={error} variant="danger" />}
  //     {profiles.map((profile, index) => {
  //       if (profiles.length === index + 1) {
  //         return <ProfileCard profile={profile} key={profile.email} referance={lastProfile} />;
  //       } else {
  //         return <ProfileCard profile={profile} key={profile.email} />;
  //       }
  //     })}
  //     {loadingMoreProfiles && !profileLimitReached && <LoadingMoreData typeOfData={"profiles"} />}
  //     {profileLimitReached && (
  //       <div className="end-container">
  //         <ErrorMessage message={profileLimitReached} variant="warning" />
  //       </div>
  //     )}
  //   </div>
  // );
}

export default Profiles;
