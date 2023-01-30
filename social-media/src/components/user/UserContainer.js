function UserContainer({ profile }) {
  return (
    <div className="user-container">
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
    </div>
  );
}

export default UserContainer;
