import "./UserProfile.css";
import { Post } from "../../components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fb from "../../services/firebase";

function UserProfile() {
  const { uname } = useParams();
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [posts, setPosts] = useState([]);
  const [uid, setuid] = useState("")
  const [postCount, setPostCount] = useState(0);

  try {
    fb.firestore
      .collection("root")
      .doc("uid")
      .get()
      .then((doc) => {
        if (doc.exists) {
          var data = doc.data()
          //console.log(uname)
          //console.log(data[`${uname}`])
          setuid(data[`${uname}`])
        }
      });
  }
  catch {
    console.error("something went wrong")
  }
  useEffect(() => {

    fetch(`/getuserposts/${uid}`, {
      method: "GET",
    }).then((res) => {
      return res.json()
    }).then((res) => {
      setPosts(res.posts);

      if (res.noOfPost !== undefined) {
        setPostCount(res.noOfPost);
      }
    })

    try {
      fb.firestore
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          setUsername(doc.data().username);
          setAbout(doc.data().about);
        });
    }
    catch {
      setUsername("");
      setAbout("");
    }
    try {
      fb.storage
        .ref()
        .child(`profileImages/${uid}.jpeg`)
        .getDownloadURL()
        .then((data) => {
          setProfilePic(data)
        }

        )
    } catch {
      setProfilePic("");
    }
  }, [uid])


  return (
    <div className="UserProfile">
      <div className="ProfileBanner">
        <div className="profilePicContainer">
          <>
            <img
              src={profilePic}
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
          </>
        </div>

        <div className="profileBannerContent">
          <p className="username">{username}</p>

          <div className="userInfo">
            <p className="posts">
              <span className="userInfoNum">{postCount}</span>
              <span className="userInfoText">Posts</span>
            </p>
            <p className="connections">
              <span className="userInfoNum">3</span>
              <span className="userInfoText">Connections</span>
            </p>
          </div>

          <div className="bio">
            <p className="userInfoText">About</p>

            <p className="bioText">{about}</p>
          </div>
        </div>
      </div>
      <div className="currentUserPosts">
        {posts &&
          posts.map((i, key) => {
            return (
              <Post
                key={key}
                postId={i.postId}
                userId={i.userId}
                comments={i.comments}
                username={i.username}
                upvotes={i.upvotes.length}
                downvotes={i.downvotes.length}
                caption={i.caption}
                voteState={() => {
                  if (i.upvotes.length > 0) {
                    for (var j in i.upvotes) {
                      if (i.upvotes[j] === uid) {
                        return true;
                      }
                    }
                  } else if (i.downvotes.length > 0) {
                    for (var k in i.downvotes) {
                      if (i.downvotes[k] === uid) {
                        return false;
                      }
                    }
                  }
                  return null;
                }}
              />
            );
          })}
        {/* <Post
                    postId={post.postId}
                    comments={post.comments}
                    //username={post.username}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    caption={post.caption}
                />
                <Post
                    postId={post2.postId}
                    comments={post2.comments}
                    //username={post2.username}
                    upvotes={post2.upvotes}
                    downvotes={post2.downvotes}
                    caption={post2.caption}
                /> */}
      </div>
    </div>
  );

}
export default UserProfile;
