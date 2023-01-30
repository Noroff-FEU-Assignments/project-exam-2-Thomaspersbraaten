import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const NameContext = createContext([null, () => {}]);
export const NameProvider = (props) => {
  const [authName, setAuthName] = useLocalStorage("authname", null);
  return <NameContext.Provider value={[authName, setAuthName]}>{props.children}</NameContext.Provider>;
};
