import { Symbols } from "../../components";
import "./Post.css";

const Post = ({
  postId,
  comments,
  username,
  image,
  upvotes,
  downvotes,
  caption,
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
          <img src={image} alt="image" />
        </div>
      </section>
      <section className="commentSection">
        <div className="comments">
          {Object.keys(comments).map((i) => {
            console.log(i);
            return (
              <div className="comment" key={i}>
                <h4>{i}</h4>
                <p>{comments[`${i}`]}</p>
              </div>
            );
          })}
          <div className="comment">
            <h4>senpai</h4>
            <p>Looking gud broo!!</p>
          </div>
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
              {/* Hello frands.. Diwali
              outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit
              Hello frands.. Diwali outfit v Hello frands.. Diwali outfit */}
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
