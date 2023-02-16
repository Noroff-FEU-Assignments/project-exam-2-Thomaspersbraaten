function CommentBody({ comments, comment }) {
  //   console.log(typeof comment.replyToId);

  const filteredComments = comments.filter((com) => com.id === comment.replyToId);
  // console.log(filteredComments.id);
  // console.log(filteredComments);
  const theFilteredComment = filteredComments[0];
  // console.log(theFilteredComment);
  return (
    <>
      {theFilteredComment ? (
        <p>
          @{theFilteredComment.owner} - {comment.body}
        </p>
      ) : (
        <p>{comment.body}</p>
      )}
    </>
  );
}

export default CommentBody;
