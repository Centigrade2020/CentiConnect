import { Symbols, Post, Settings } from "../../components";
import "./Profile.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import fb from "../../services/firebase";

function Profile() {
  const history = useHistory();

  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const [submitState, setSubmiteState] = useState(false);

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
        fb.storage
          .ref()
          .child(`profileImages/${localStorage.getItem("userId")}.jpeg`)
          .getDownloadURL()
          .then((data) => setProfilePic(data))
          .catch(() => {
            "";
          });
      } catch {
        setProfilePic("");
      }
    }
  }, []);

  const logout = () => {
    fb.auth.signOut().then(() => {
      history.push("login");
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
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

  useEffect(() => {
    fetch(`getuserposts/${localStorage.getItem("userId")}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPosts(res.posts);
        if (res.noOfPost !== undefined) {
          setPostCount(res.noOfPost);
        }
      });
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
              <span className="userInfoNum">69</span>
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
            <Symbols.Edit size="30" />
          </div>
          <div
            className="profileBannerLinkButton"
            alt="logout"
            onMouseOver={() => {
              console.log("hello");
            }}
            onClick={() => logout()}
          >
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
        {posts !== [] &&
          posts.map((i, key) => (
            <Post
              key={key}
              postId={i.postId}
              userId={i.userId}
              comments={i.comments}
              username={i.username}
              upvotes={i.upvotes}
              downvotes={i.downvotes}
              caption={i.caption}
            />
          ))}
      </div>

      <Settings />
    </div>
  );
}

export default Profile;
