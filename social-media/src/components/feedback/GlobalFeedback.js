import React, { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

function GlobalFeedback() {
  const [feedback, setFeedback] = useContext(FeedbackContext);
  if (feedback.triggered) {
    const startFeedback = setTimeout(() => {
      setFeedback({
        cssClass: "",
        message: "",
        triggered: false,
      });
    }, 5000);
  }

  return <div className={feedback.cssClass}>{feedback.message}</div>;
}

export default GlobalFeedback;
