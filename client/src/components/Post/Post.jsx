import { Symbols } from "../../components";
import "./Post.css";
import test from "./test.jpg";

const Post = () => {
  return (
    <div className="Post">
      <div className="profile">
        <div className="profileIcon"></div>
        <p className="profileName">legend</p>
        <div className="settings">
          <Symbols.ThreeDots size="40" />
        </div>
      </div>
      <section className="imageSection">
        <div className="imageContainer">
          <img src={test} alt="image" />
        </div>
      </section>
      <section className="commentSection">
        <div className="comments">
          <div className="comment">
            <h4>senpai</h4>
            <p>Looking gud broo!!</p>
          </div>
          <div className="comment">
            <h4>dharundds</h4>
            <p>Wow.. Awesome!!</p>
          </div>
          <div className="comment">
            <h4>hrithik</h4>
            <p>waste ra dei!!</p>
          </div>
        </div>

        <div className="description">
          <div className="postLinks">
            <div className="upVote">
              <Symbols.UpVote size="20" />
              24
            </div>
            <div className="downVote">
              <Symbols.DownVote size="20" />3
            </div>
          </div>
          <div className="descriptionContent">
            <p>
              <span className="profileName">legend</span>Hello frands.. Diwali
              outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit
              Hello frands.. Diwali outfit v Hello frands.. Diwali outfit
            </p>
          </div>
        </div>
        <form className="addComment">
          <textarea placeholder="Enter your comment"></textarea>
          <button className="postComment">Post</button>
        </form>
      </section>
    </div>
  );
};

export default Post;
