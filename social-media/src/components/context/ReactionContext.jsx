import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const TrackReactionContext = createContext([null, () => {}]);
export const TrackReactionProvider = (props) => {
  const [trackReaction, setTrackReaction] = useLocalStorage("reactions", null);
  return <TrackReactionContext.Provider value={[trackReaction, setTrackReaction]}>{props.children}</TrackReactionContext.Provider>;
};
