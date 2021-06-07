import "./Post.css";

const Post = () => {
  return (
    <div className="Post">
      <div className="profile">
        <div className="profileIcon"></div>
        <p className="profileName">username</p>
      </div>
      <div className="imageContainer"></div>
      <div className="postLinks"></div>
      <div className="commentSection"></div>
    </div>
  );
};

export default Post;
