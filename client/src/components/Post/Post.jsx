import { useState } from "react";
import fb from "../../services/firebase";
import { Symbols } from "../../components";
import "./Post.css";
import Comment from "../Comment/Comment";

const Post = ({ postId, comments, userId, upvotes, downvotes, caption }) => {
  const upVotes = []
  const downVotes = []
  const [link, setLink] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [comment, setComment] = useState("");
  const [upvote,setupvote] = useState(upVotes.length)
  const [downvote,setdownvote] = useState(0)
  const [voted,setvoted] = useState("notVoted")
  const [commented, setCommented] = useState(false);
 
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

const upvoting = ()=>{
 // setvoted("upvote")
  
    //console.log(upVotes.includes(`${userId}`))
    if(upVotes.indexOf(`${userId}`) == -1){
       upVotes.push(`${userId}`)
       //setupvote(upVotes.length)
      
    }else{
      console.log(upVotes)
      const index = upVotes.indexOf(`${userId}`)
      upVotes.splice(index,1)
     // setupvote(upVotes.length)
    }
  
}


const downvoting = ()=>{
  //setvoted("downvote")
 
    //console.log(upVotes.includes(`${userId}`))
    if(downVotes.indexOf(`${userId}`) == -1){
       downVotes.push(`${userId}`)
      
      
    }else{
      console.log(downVotes)
      const index = downVotes.indexOf(`${userId}`)
      downVotes.splice(index,1)
     
    }
  
}

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
            <div className="upVote" onClick={upvoting} >
              <Symbols.UpVote size="20" />
              {upvote}
            </div>
            <div className="downVote" onClick={downvoting} >
              <Symbols.DownVote size="20" />
              {downvote}
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
