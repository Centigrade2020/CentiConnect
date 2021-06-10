import { useState } from "react";
import fb from "../../services/firebase";
import { Symbols } from "../../components";
import "./Post.css";
import Comment from "../Comment/Comment";

const Post = ({ postId, comments, userId, upvotes, downvotes, caption }) => {
  const [link, setLink] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [comment, setComment] = useState("");

  try {
    fb.firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setUsername(doc.data().username);
      });
  } catch {
    console.log("");
  }

  try {
    fb.storage
      .ref()
      .child(`profileImages/${localStorage.getItem("userId")}.jpeg`)
      .getDownloadURL()
      .then((data) => setProfilePic(data));
  } catch {
    setProfilePic("");
  }

  try {
    fb.storage
      .ref()
      .child(`postImages/${postId}.jpeg`)
      .getDownloadURL()
      .then((data) => setLink(data));
  } catch {
    console.log("No image");
  }

  const postComment = () => {
    if (comment.split(" ").join() != "") {
      const content = {
        userId: localStorage.getItem("userId"),
        comment: comment,
        postId: postId,
      };
      fetch("/postcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });
      console.log(content);
    }
  };

  return (
    <div className="Post" key={postId}>
      <div className="profile">
        <div className="profileIcon">
          <img src={profilePic} alt="profileicon" />
        </div>
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
            alt=" "
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
          {!!comments &&
            comments.map((i, key) => {
              return (
                <Comment
                  userId={i.userId}
                  comment={i.comment}
                  keyName={key}
                  key={key}
                />
              );
            })}
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
        <div className="addComment">
          <textarea
            placeholder="Enter your comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <button className="postComment" onClick={postComment}>
            Post
          </button>
        </div>
      </section>
    </div>
  );
};

export default Post;
