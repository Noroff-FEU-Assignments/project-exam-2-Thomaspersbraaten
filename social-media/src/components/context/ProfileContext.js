import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ProfileContext = createContext([null, () => {}]);
export const ProfileProvider = (props) => {
  const [profile, setProfile] = useLocalStorage("profilename", null);
  return <ProfileContext.Provider value={[profile, setProfile]}>{props.children}</ProfileContext.Provider>;
};
