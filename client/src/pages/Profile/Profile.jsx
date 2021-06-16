import { Symbols, Post } from "../../components";
import "./Profile.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import fb from "../../services/firebase";

function Profile() {
  const history = useHistory();

  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [logoutMode, setLogoutMode] = useState(false);

  useEffect(() => {
    let unmounted = false;
    if (!!localStorage.getItem("userId")) {
      fb.firestore
        .collection("users")
        .doc(localStorage.getItem("userId"))
        .get()
        .then((doc) => {
          if (!unmounted) {
            setUsername(doc.data().username);
            setAbout(doc.data().about);
            setRequestCount(doc.data().requests.length);
          } else {
            console.log("");
          }
        });

      try {
        fb.storage
          .ref()
          .child(`profileImages/${localStorage.getItem("userId")}.jpeg`)
          .getDownloadURL()
          .then((data) => {
            if (!unmounted) {
              setProfilePic(data);
            } else {
              console.log("");
            }
          });
      } catch {
        console.log("");
      }
    }

    return () => {
      unmounted = true;
    };
  }, []);

  const logout = () => {
    fb.auth.signOut().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      history.push("login");
    });
  };

  useEffect(() => {
    let unmounted = false;
    fetch(`getuserposts/${localStorage.getItem("userId")}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setPosts(res.posts);
        } else {
          console.log("");
        }
        if (res.noOfPost !== undefined) {
          if (!unmounted) {
            setPostCount(res.noOfPost);
          } else {
            console.log("");
          }
        }
      });

    return () => {
      unmounted = true;
    };
  }, []);

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
              <span className="userInfoNum">2</span>
              <span className="userInfoText">Connections</span>
            </p>
          </div>

          <div className="bio">
            <p className="userInfoText">About</p>

            <p className="bioText">{about}</p>
          </div>
        </div>

        <div className="profileBannerLinks">
          <div
            className="profileBannerLinkButton"
            onClick={() => {
              history.push("/people");
            }}
          >
            <Symbols.Person size="30" />
            <p className="floatingInfo">People</p>
            {requestCount > 0 && (
              <div className="requestNo">
                <p>{requestCount}</p>
              </div>
            )}
          </div>
          <div
            className="profileBannerLinkButton"
            onClick={() => {
              history.push("settings");
            }}
          >
            <Symbols.Settings size="30" />
            <p className="floatingInfo">Settings</p>
          </div>
          {!logoutMode ? (
            <div
              className="profileBannerLinkButton"
              alt="logout"
              onClick={() => {
                setLogoutMode(true);
              }}
            >
              <Symbols.Logout size="30" />
              <p className="floatingInfo">Logout</p>
            </div>
          ) : (
            <div className="confirmLogout">
              <p>Logout?</p>

              <button
                className="deleteNo"
                onClick={() => {
                  setLogoutMode(false);
                }}
              >
                No
              </button>
              <button className="deleteYes" onClick={() => logout()}>
                Yes
              </button>
            </div>
          )}
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
      <div
        className="createPostButton"
        onClick={() => {
          history.push("createpost");
        }}
      >
        <Symbols.Plus size="64" />
        <p className="createPostFloat">Create Post</p>
      </div>
    </div>
  );
}

export default Profile;
