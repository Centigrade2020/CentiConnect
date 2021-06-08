import { Symbols, Post } from "../../components";
import "./Profile.css";

function Profile() {
  const post = {
    postId: "test",
    comments: {
      senpai: "Looking gud broo!!",
      dharundds: "Wow.. Awesome!!",
      hrithik: "waste ra dei!!",
    },
    username: "legend",
    imageToken: "8ead60e9-ede8-4317-a171-b478fe57b580",
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
    imageToken: "d848a3b9-461e-4a47-b8a2-aa6e6b2327af",
    upvotes: 24,
    downvotes: 3,
    caption:
      "Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit v Hello frands.. Diwali outfit",
  };

  return (
    <div className="Profile">
      <div className="edit">
        <span
          onClick={() => {
            document
              .getElementsByClassName("editPage")
              .classList.toggle("show");
          }}
        >
          Edit
        </span>
        <Symbols.Edit size="30" />
      </div>

      <div className="profilePicContainer profilePic"></div>
      <div className="username">username</div>
      <div className="bio">
        <span>Centiconnect will launched soon</span>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="line"></div>
      <h2>Your Posts</h2>
      <div className="line"></div>
      <div className="currentUserPosts">
        <Post
          postId={post.postId}
          comments={post.comments}
          username={post.username}
          upvotes={post.upvotes}
          downvotes={post.downvotes}
          caption={post.caption}
          imageToken={post.imageToken}
        />
        <Post
          postId={post2.postId}
          comments={post2.comments}
          username={post2.username}
          upvotes={post2.upvotes}
          downvotes={post2.downvotes}
          caption={post2.caption}
          imageToken={post2.imageToken}
        />
      </div>
    </div>
  );
}

export default Profile;
