import { Symbols, Post } from "../../components";
import "./UserProfile.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import fb from "../../services/firebase";

function UserProfile() {
  const history = useHistory();

  const [uid, setUid] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    setUid(localStorage.getItem("searchUser"));
  }, [localStorage.getItem("searchUser")]);

  useEffect(() => {
    if (uid !== "") {
      fb.firestore
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          setUsername(doc.data().username);
          setAbout(doc.data().about);
        });

      try {
        fb.storage
          .ref()
          .child(`profileImages/${uid}.jpeg`)
          .getDownloadURL()
          .then((data) => setProfilePic(data))
          .catch(() => {
            "";
          });
      } catch {
        setProfilePic("");
      }
    }
  }, [uid]);

  const logout = () => {
    fb.auth.signOut().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      history.push("login");
    });
  };

  useEffect(() => {
    let unmounted = false;
    if (uid !== "") {
      fetch(`/getuserposts/${uid}`, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (!unmounted) {
            setPosts(res.posts);
          }
          if (res.noOfPost !== undefined) {
            if (!unmounted) {
              setPostCount(res.noOfPost);
            }
          }
        });
    }

    return () => {
      unmounted = true;
    };
  }, [uid]);

  return (
    <div className="Profile">
      <div className="ProfileBanner">
        <div className="profilePicContainer">
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
        <div className="profileBannerLinks">
          <div className="profileBannerLinkButton">
            <Symbols.Request size="30" />
            <p className="floatingInfo">Request</p>
          </div>
        </div>
      </div>

      <div className="currentUserPosts">
        {posts !== [] &&
          posts.map((i, key) => (
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
                    if (i.upvotes[j] === localStorage.getItem("userId")) {
                      return true;
                    }
                  }
                } else if (i.downvotes.length > 0) {
                  for (var k in i.downvotes) {
                    if (i.downvotes[k] === localStorage.getItem("userId")) {
                      return false;
                    }
                  }
                }
                return null;
              }}
            />
          ))}
      </div>
    </div>
  );
}

export default UserProfile;
