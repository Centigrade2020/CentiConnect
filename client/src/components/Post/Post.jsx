import { useState } from "react";
import fb from "../../services/firebase";
import { Symbols } from "../../components";
import "./Post.css";
import test from "./test.jpg";

const Post = ({ postId, comments, username, upvotes, downvotes, caption }) => {
  const [link, setLink] = useState("");

  fb.storage
    .ref()
    .child(`postImages/${postId}.jpg`)
    .getDownloadURL()
    .then((data) => setLink(data));

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
          <Symbols.Loading size="100" />
          <img
            src={link}
            id="postImage"
            alt=""
            onDragStart={(e) => {
              e.preventDefault();
            }}
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
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
