import { useState } from "react";
import { useHistory } from "react-router";
import ReactCrop from "react-image-crop";
import { Symbols } from "../../components";
import "react-image-crop/dist/ReactCrop.css";
import "./CreatePost.css";

function CreatePost() {
  const history = useHistory();

  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
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

  const postUploadhandler = async (e) => {
    e.preventDefault();

    if (!!finalFile) {
      fetch("/images", {
        method: "POST",
        body: finalFile,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          fetch("/createpost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              caption: description,
              userId: localStorage.getItem("userId"),
              postId: res.uuid,
            }),
          });
        })
        .finally(() => {
          history.push("/");
        });
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
    <div className="CreatePost">
      <form action="#" method="POST">
        <div className="imageContainer">
          <div className="input">
            <input type="file" accept="image/*" onChange={fileSelectHandler} />
            <div className="text">
              <Symbols.Image size="100" /> Select image
            </div>
          </div>
          <div className="text">
            <Symbols.Image size="100" /> Select image
          </div>
          {result && (
            <img
              src={result}
              alt="croppedImage"
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
        <div className="contentContainer">
          <h1>Create Post</h1>
          <textarea
            rows="9"
            placeholder="Enter description (optional)"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <button
            disabled={!finalFile ? true : false}
            type="submit"
            onClick={postUploadhandler}
          >
            Post
          </button>
        </div>
      </form>
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
  );
}

export default CreatePost;
