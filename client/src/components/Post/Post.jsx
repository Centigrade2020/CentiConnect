import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [link, setLink] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [fakeComments, setFakeComments] = useState([]);
  const [comment, setComment] = useState("");
  const [disUpvotes, setDisUpvotes] = useState(upvotes);
  const [disDownvotes, setDisDownvotes] = useState(downvotes);
  const [vote, setVote] = useState(voteState);
  const [commented, setCommented] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const postRef = fb.firestore.collection("posts").doc(postId);

  useEffect(() => {
    let unmounted = false;

    try {
      fb.firestore
        .collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          if (!unmounted) {
            setUsername(doc.data().username);
          } else {
            console.log("");
          }
        });
    } catch {
      console.log("");
    }

    try {
      fb.storage
        .ref()
        .child(`profileImages/${userId}.jpeg`)
        .getDownloadURL()
        .then((data) => {
          if (!unmounted) {
            setProfilePic(data);
          } else {
            console.log("");
          }
        })
        .catch(() => {
          console.log("");
        });
    } catch {
      console.log("");
    }

    try {
      fb.storage
        .ref()
        .child(`postImages/${postId}.jpeg`)
        .getDownloadURL()
        .then((data) => {
          if (!unmounted) {
            setLink(data);
          } else {
            console.log("");
          }
        });
    } catch {
      console.log("");
    }

    return () => {
      unmounted = true;
    };
  }, []);

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
      }).then(() => {
        setFakeComments((args) => [
          { userId: userId, comment: comment },
          ...args,
        ]);
      });
      setCommented(true);
    }
    setComment("");
  };

  const upVoteHandler = () => {
    if (vote === null) {
      setVote(true);
      setDisUpvotes(disUpvotes + 1);
      postRef.update({
        upvotes: fb.firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem("userId")
        ),
      });
    } else if (vote === false) {
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
    } else if (vote === true) {
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
    if (vote === null) {
      setVote(false);
      setDisDownvotes(disDownvotes + 1);
      postRef.update({
        downvotes: fb.firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem("userId")
        ),
      });
    } else if (vote === true) {
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
    } else if (vote === false) {
      setVote(null);
      setDisDownvotes(disDownvotes - 1);
      postRef.update({
        downvotes: fb.firebase.firestore.FieldValue.arrayRemove(
          localStorage.getItem("userId")
        ),
      });
    }
  };

  const deletePost = () => {
    const content = {
      postId: postId,
      userId: userId,
    };

    fetch("/deletepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="Post" key={postId}>
      <div className="profile">
        <div className="profileIcon">
          <img
            src={profilePic}
            alt="profileicon"
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
        <p className="profileName">{username}</p>
        {location.pathname === "/profile" && (
          <div className="deletePost">
            {!deleteMode ? (
              <div
                className="trashContainer"
                onClick={() => {
                  console.log("hello");
                  setDeleteMode(true);
                }}
              >
                <Symbols.Trash size="40" />
              </div>
            ) : (
              <div className="confirmDeletePost">
                Delete this post?
                <button className="deleteYes" onClick={deletePost}>
                  Yes
                </button>
                <button
                  className="deleteNo"
                  onClick={() => {
                    setDeleteMode(false);
                  }}
                >
                  No
                </button>
              </div>
            )}
          </div>
        )}
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
          {commented &&
            fakeComments.map((i, key) => {
              return (
                <Comment
                  userId={localStorage.getItem("userId")}
                  comment={i.comment}
                  key={key}
                  keyName={key}
                />
              );
            })}
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
            <div
              className="upVote"
              className={vote === true ? "upVote voted voted1" : " upVote null"}
              onClick={upVoteHandler}
            >
              <div className="voteContainer">
                <Symbols.UpVote size="22" />
              </div>
              <p>{disUpvotes}</p>
            </div>
            <div
              className={
                vote === false ? "downVote voted voted0" : " downVote null"
              }
              onClick={downVoteHandler}
            >
              <div className="voteContainer ">
                <Symbols.DownVote size="22" />
              </div>
              <p>{disDownvotes}</p>
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
            value={comment}
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
