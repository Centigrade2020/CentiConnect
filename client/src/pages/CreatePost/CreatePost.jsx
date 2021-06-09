import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./CreatePost.css";

function CreatePost() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const [crop, setCrop] = useState({
    aspect: 1 / 1,
  });
  const [result, setResult] = useState(null);

  const fileSelectHandler = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
  };

  const postUploadhandler = (e) => {
    e.preventDefault();

    const content = {
      caption: description,
      username: "username",
    };

    fetch("/createpost", {
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
    console.log(base64Image);
    setSelectedFile(null);
  }

  return (
    <div className="CreatePost">
      <form action="#" method="POST">
        <div className="imageContainer">
          <input type="file" accept="image/*" onChange={fileSelectHandler} />
          {result && <img src={result} alt="croppedImage" />}
        </div>
        <div className="contentContainer">
          <h1>Create Post</h1>
          <textarea
            rows="9"
            placeholder="Enter description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <button type="submit" onClick={postUploadhandler}>
            Post
          </button>
        </div>
      </form>
      {selectedFile && (
        <div className="setCropContainer">
          <ReactCrop
            src={selectedFile}
            onImageLoaded={setImage}
            crop={crop}
            onChange={setCrop}
          />
          <button onClick={getCroppedImg}>Save</button>
        </div>
      )}
      <a href={result} download>
        Download
      </a>
    </div>
  );
}

export default CreatePost;
