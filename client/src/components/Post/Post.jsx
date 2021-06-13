import { useState } from "react";
import fb from "../../services/firebase";
import { Symbols } from "../../components";
import "./Post.css";
import Comment from "../Comment/Comment";

const Post = ({
  postId,
  comments,
  userId,
  upvotes,
  downvotes,
  caption,
  voteState,
}) => {
  const [link, setLink] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [comment, setComment] = useState("");
  const [disUpvotes, setDisUpvotes] = useState(upvotes);
  const [disDownvotes, setDisDownvotes] = useState(downvotes);
  const [vote, setVote] = useState(voteState);
  const [commented, setCommented] = useState(false);

  const postRef = fb.firestore.collection("posts").doc(postId);

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

  fb.storage
    .ref()
    .child(`profileImages/${userId}.jpeg`)
    .getDownloadURL()
    .then((data) => setProfilePic(data))
    .catch(() => {
      console.log("");
    });

  fb.storage
    .ref()
    .child(`postImages/${postId}.jpeg`)
    .getDownloadURL()
    .then((data) => setLink(data));

  const postComment = () => {
    if (comment.split(" ").join() !== "") {
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
    setCommented(true);
  };

  const upVoteHandler = () => {
    if (vote == null) {
      setVote(true);
      setDisUpvotes(disUpvotes + 1);
      postRef.update({
        upvotes: fb.firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem("userId")
        ),
      });
    } else if (vote == false) {
      setVote(true);
      setDisUpvotes(disUpvotes + 1);
      postRef.update({
        upvotes: fb.firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem("userId")
        ),
      });
      setDisDownvotes(disDownvotes - 1);
      postRef.update({
        downvotes: fb.firebase.firestore.FieldValue.arrayRemove(
          localStorage.getItem("userId")
        ),
      });
    } else if (vote == true) {
      setVote(null);
      setDisUpvotes(disUpvotes - 1);
      postRef.update({
        upvotes: fb.firebase.firestore.FieldValue.arrayRemove(
          localStorage.getItem("userId")
        ),
      });
    }
  };

  const downVoteHandler = () => {
    if (vote == null) {
      setVote(false);
      setDisDownvotes(disDownvotes + 1);
      postRef.update({
        downvotes: fb.firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem("userId")
        ),
      });
    } else if (vote == true) {
      setVote(false);
      setDisDownvotes(disDownvotes + 1);
      postRef.update({
        downvotes: fb.firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem("userId")
        ),
      });
      setDisUpvotes(disUpvotes - 1);
      postRef.update({
        upvotes: fb.firebase.firestore.FieldValue.arrayRemove(
          localStorage.getItem("userId")
        ),
      });
    } else if (vote == false) {
      setVote(null);
      setDisDownvotes(disDownvotes - 1);
      postRef.update({
        downvotes: fb.firebase.firestore.FieldValue.arrayRemove(
          localStorage.getItem("userId")
        ),
      });
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
          {commented && (
            <Comment
              userId={localStorage.getItem("userId")}
              comment={comment}
            />
          )}
          {!!comments &&
            comments
              .slice(0)
              .reverse()
              .map((i, key) => {
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
            <div className="upVote" onClick={upVoteHandler}>
              <div
                className={
                  vote == true
                    ? "voteContainer voted voted1"
                    : " voteContainer null"
                }
              >
                <Symbols.UpVote size="22" />
              </div>
              {disUpvotes}
            </div>
            <div className="downVote" onClick={downVoteHandler}>
              <div
                className={
                  vote == false
                    ? "voteContainer voted voted0"
                    : " voteContainer null"
                }
              >
                <Symbols.DownVote size="22" />
              </div>
              {disDownvotes}
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
