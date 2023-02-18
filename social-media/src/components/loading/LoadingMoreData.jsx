function LoadingMoreData({ typeOfData }) {
  return (
    <div className="loading-more-posts">
      <p> Loading more {typeOfData}...</p>
      <div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
}

export default LoadingMoreData;
