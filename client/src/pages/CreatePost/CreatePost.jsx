import "./CreatePost.css";
import "react-image-crop/dist/ReactCrop.css";

function CreatePost() {
  return (
    <div className="CreatePost">
      <form method="POST">
        <div className="imageContainer"></div>
        <div className="contentContainer">
          <h1>Create Post</h1>
          <textarea rows="9" placeholder="Enter description"></textarea>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
