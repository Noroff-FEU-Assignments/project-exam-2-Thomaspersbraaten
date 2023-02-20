function CommentBody({ comments, comment }) {
  const filteredComments = comments.filter((com) => com.id === comment.replyToId);
  const theFilteredComment = filteredComments[0];
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
