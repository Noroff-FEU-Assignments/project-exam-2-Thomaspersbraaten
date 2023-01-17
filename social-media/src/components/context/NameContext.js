import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const NameContext = createContext([null, () => {}]);
export const NameProvider = (props) => {
  const [name, setName] = useLocalStorage("name", null);
  return <NameContext.Provider value={[name, setName]}>{props.children}</NameContext.Provider>;
};
