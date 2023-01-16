import moment from "moment";

function PostDate({ date }) {
  return <div>{moment(date).format("MMMM Do YYYY, h:mm:ss a")}</div>;
}

export default PostDate;
