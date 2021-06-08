import { Symbols } from "../../components";
import "./Post.css";

const Post = ({
  postId,
  comments,
  username,
  upvotes,
  downvotes,
  caption,
  imageToken,
}) => {
  return (
    <div className="Post" key={postId}>
      <div className="profile">
        <div className="profileIcon"></div>
        <p className="profileName">{username}</p>
        <div className="settings">
          <Symbols.ThreeDots size="40" />
        </div>
      </div>
      <section className="imageSection">
        <div className="imageContainer">
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/centiconnect.appspot.com/o/postImages%2F${postId}.jpg?alt=media&token=${imageToken}`}
            alt=""
          />
        </div>
      </section>
      <section className="commentSection">
        <div className="comments">
          {Object.keys(comments).map((i) => (
            <div className="comment" key={i}>
              <h4>{i}</h4>
              <p>{comments[`${i}`]}</p>
            </div>
          ))}
        </div>

        <div className="description">
          <div className="postLinks">
            <div className="upVote">
              <Symbols.UpVote size="20" />
              {upvotes}
            </div>
            <div className="downVote">
              <Symbols.DownVote size="20" />
              {downvotes}
            </div>
          </div>
          <div className="descriptionContent">
            <p>
              <span className="profileName">{username}</span>
              {caption}
            </p>
          </div>
        </div>
        <form className="addComment">
          <textarea placeholder="Enter your comment"></textarea>
          <button className="postComment">Post</button>
        </form>
      </section>
    </div>
  );
};

export default Post;
