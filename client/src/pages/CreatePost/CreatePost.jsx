import "./CreatePost.css";
import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';

function CreatePost() {
  const [state, setState] = useState({ image: null });
  async function handleImageUpload(event) {

    const imageFile = event.target.files[0];
    // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setState({
        image: URL.createObjectURL(compressedFile)
      });
      // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    } catch (error) {
      console.log(error);
    }

  }
  const inputFileRef = useRef(null);
  // Dont Uncomment
  // const [state, setState] = useState({ image: null });
  // const onImageChange = event => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     const options = {
  //       maxSizeMB: 1,
  //       maxWidthOrHeight: 350,
  //       useWebWorker: true
  //     }
  //     const compressedFile = imageCompression(img, options);
  //     setState({
  //       image: URL.createObjectURL(compressedFile)
  //     });
  //   }
  // }
  const onBtnClick = () => {

    inputFileRef.current.click();
  }
  return (
    <div className="createPost">
      <form method="POST">
        <div className="createPostContainer">

          <h1 id="cP">Create Post</h1>
          <div className="cpCommentBox">
            <textarea id="comment" placeholder="Enter Caption" name="description" />
          </div>
          <div className="cpImageContainer" onClick={onBtnClick}>

            <input type="file" id="dp" ref={inputFileRef} onChange={event => handleImageUpload(event)} ></input>

            <img className="cpImage" src={state.image} ></img>

          </div>

          <button type="submit" id="submitPost">Create!</button>
          <div id="imageCover" onClick={onBtnClick}>Select Image</div>
        </div>
      </form>
    </div>
  )
}

export default CreatePost;
