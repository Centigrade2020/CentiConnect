import { Symbols, Post } from "../../components";
import "./Profile.css";
import { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import fb from "../../services/firebase";
function Profile() {
  const history = useHistory();

  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [posts, setPosts] = useState([]);

  const userDoc = fb.firestore
    .collection("users")
    .doc(localStorage.getItem("userId"));

  useEffect(() => {
    if (!!localStorage.getItem("userId")) {
      userDoc.get().then((doc) => {
        setUsername(doc.data().username);
        setAbout(doc.data().about);
      });

      try {
        fb.firestore
          .collection("posts")
          .get()
          .then((docs) => {
            var li = [];

            docs.forEach((doc) => {
              li.push(doc.data());
              setPosts(li);
              console.log(li);
            });
          });
      } catch {
        console.log("");
      }
    }
  }, []);

  try {
    fb.storage
      .ref()
      .child(`profileImages/${localStorage.getItem("userId")}.jpeg`)
      .getDownloadURL()
      .then((data) => setProfilePic(data));
  } catch {
    setProfilePic("");
  }

  const logout = () => {
    fb.auth.signOut().then(() => {
      history.push("login");
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [editAbout, setEditAbout] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [finalFile, setFinalfile] = useState(null);
  const [result, setResult] = useState(null);
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
  });

  const fileSelectHandler = (e) => {
    try {
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
    } catch {
      console.log("");
    }
  };

  const saveEditHandler = (e) => {
    e.preventDefault();

    const content = {
      userId: localStorage.getItem("userId"),
      about: editAbout,
      username: editUsername,
    };

    fetch("/updateprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
  };

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");

    setResult(base64Image);
    setFinalfile(dataURItoBlob(base64Image));
    setSelectedFile(null);
  }

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  return (
    <div className="Profile">
      <div className="ProfileBanner">
        <div className="profilePicContainer">
          {editMode ? (
            <>
              <div className="input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={fileSelectHandler}
                />
                <div className="text">
                  <Symbols.Image size="100" /> Select image
                </div>
              </div>

              {result ? (
                <img
                  src={result}
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
              ) : (
                <img
                  src=""
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
              )}
            </>
          ) : (
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
          )}
        </div>

        <div className="profileBannerContent">
          {editMode ? (
            <input
              type="text"
              className="usernameEdit"
              defaultValue={username}
              placeholder={username}
              onChange={(e) => setEditUsername(e.target.value)}
            />
          ) : (
            <p className="username">{username}</p>
          )}

          <div className="userInfo">
            <p className="posts">
              <span className="userInfoNum">2</span>
              <span className="userInfoText">Posts</span>
            </p>
            <p className="connections">
              <span className="userInfoNum">3</span>
              <span className="userInfoText">Connections</span>
            </p>
          </div>

          <div className="bio">
            <p className="userInfoText">
              {about !== "" || !!editMode ? "About" : ""}
            </p>
            {editMode ? (
              <textarea
                type="text"
                className="bioTextEdit"
                defaultValue={about}
                placeholder="About"
                cols="30"
                rows="3"
                onChange={(e) => setEditAbout(e.target.value)}
              ></textarea>
            ) : (
              <p className="bioText">{about}</p>
            )}
          </div>
        </div>

        <div className="profileBannerLinks">
          {editMode ? (
            <div
              className="profileBannerLinkButton"
              onClick={(e) => {
                saveEditHandler(e);
                setEditMode(false);
              }}
            >
              <Symbols.Save size="30" />
            </div>
          ) : (
            <div
              className="profileBannerLinkButton"
              onClick={() => {
                setEditMode(true);
              }}
            >
              <Symbols.Edit size="30" />
            </div>
          )}

          <div className="profileBannerLinkButton">
            <Symbols.Settings size="30" />
          </div>
          <div className="profileBannerLinkButton" onClick={() => logout()}>
            <Symbols.Logout size="30" />
          </div>
        </div>
        {selectedFile && (
          <div className="cropContainer">
            <div className="cropWrapper">
              <div className="crop">
                <ReactCrop
                  src={selectedFile}
                  onImageLoaded={setImage}
                  crop={crop}
                  onChange={setCrop}
                />
              </div>
            </div>

            <button onClick={getCroppedImg}>Save</button>
          </div>
        )}
      </div>

      <div className="currentUserPosts">
        {posts.map((i) => {
          return (
            <Post
              key={i.postId}
              postId={i.postId}
              userId={i.userId}
              comments={i.comments}
              username={i.username}
              upvotes={i.upvotes}
              downvotes={i.downvotes}
              caption={i.caption}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
