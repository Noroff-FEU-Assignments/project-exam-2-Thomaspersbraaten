function TagsComponent({ post }) {
  return (
    <div className="tags-container">
      {post.tags.map((tag, index) => (
        <div className="tag" key={tag + index}>
          #{tag}
        </div>
      ))}
    </div>
  );
}

export default TagsComponent;
