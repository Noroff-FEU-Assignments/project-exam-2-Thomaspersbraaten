import { createContext } from "react";
import GlobalFeedback from "../feedback/GlobalFeedback";
import useLocalStorage from "../hooks/useLocalStorage";

export const FeedbackContext = createContext([null, () => {}]);
export const FeedbackProvider = (props) => {
  const [feedback, setFeedback] = useLocalStorage("feedback", {
    cssClass: "",
    message: "",
    triggered: false,
  });
  return (
    <FeedbackContext.Provider value={[feedback, setFeedback]}>
      <GlobalFeedback />
      {props.children}
    </FeedbackContext.Provider>
  );
};
