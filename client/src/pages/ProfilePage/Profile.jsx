import { Symbols, Post } from "../../components";
import "./Profile.css";
import { useState, useEffect } from "react";
// import { useHistory } from "react-router";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import fb from "../../services/firebase";
function Profile() {
  // const history = useHistory();
  const [editMode, setEditMode] = useState(false);
  const [username, setusername] = useState("")
  useEffect(() => {
    if (!!localStorage.getItem("userId")) {
      const uid = localStorage.getItem("userId");
      var docRef = fb.firestore.collection("users").doc(uid);

      docRef.get().then((doc) => {
        setusername(doc.data().username)

      });
    }
  }, []);

  const post = {
    postId: "test",
    comments: {
      senpai: "Looking gud broo!!",
      dharundds: "Wow.. Awesome!!",
      hrithik: "waste ra dei!!",
    },
    username: "legend",
    upvotes: 24,
    downvotes: 3,
    caption:
      "Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit v Hello frands.. Diwali outfit",
  };

  const post2 = {
    postId: "test2",
    comments: {
      senpai: "Looking gud broo!!",
      dharundds: "Wow.. Awesome!!",
      hrithik: "waste ra dei!!",
    },
    username: "legend",
    upvotes: 24,
    downvotes: 3,
    caption:
      "Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit v Hello frands.. Diwali outfit",
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

  const postUploadhandler = (e) => {
    e.preventDefault();

    const content = {
      about: editAbout,
      username: editUsername,
    };

    if (!!finalFile) {
      console.log(content);
    }
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
              src="https://firebasestorage.googleapis.com/v0/b/centiconnect.appspot.com/o/postImages%2F63cd11a998da4ef38ca4967fdf64c88a.jpeg?alt=media&token=2ae5afcd-2e23-4a98-a98d-487980654099"
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
            <p className="userInfoText">About</p>
            {editMode ? (
              <textarea
                type="text"
                className="bioTextEdit"
                defaultValue="Centiconnect will launched soon"
                placeholder="About"
                cols="30"
                rows="3"
                onChange={(e) => setEditAbout(e.target.value)}
              ></textarea>
            ) : (
              <p className="bioText">Centiconnect will launched soon</p>
            )}
          </div>
        </div>

        <div className="profileBannerLinks">
          {editMode ? (
            <div
              className="profileBannerLinkButton"
              onClick={(e) => {
                postUploadhandler(e);
                setEditMode(false);
              }}
            >
              <Symbols.Settings size="30" />
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
        <Post
          postId={post.postId}
          comments={post.comments}
          username={post.username}
          upvotes={post.upvotes}
          downvotes={post.downvotes}
          caption={post.caption}
        />
        <Post
          postId={post2.postId}
          comments={post2.comments}
          username={post2.username}
          upvotes={post2.upvotes}
          downvotes={post2.downvotes}
          caption={post2.caption}
        />
      </div>
    </div>
  );
}

export default Profile;
