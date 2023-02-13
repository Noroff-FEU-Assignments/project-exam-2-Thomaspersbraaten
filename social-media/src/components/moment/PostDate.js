import moment from "moment";

function PostDate({ date }) {
  const dayDate = moment(date).format("MMMM Do YYYY");
  const timeSincePosted = moment(date).startOf("minute").fromNow();
  const now = moment();

  if (now > dayDate) {
    return <div className="post-date">{dayDate}</div>;
  } else {
    return <div className="post-date">{timeSincePosted}</div>;
  }
}

export default PostDate;
