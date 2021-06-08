import { useHistory } from "react-router";
import { Symbols, Post } from "../../components";
import "./Home.css";
import fb from "../../services/firebase";
// import test from "./test.jpg";

function Home() {
  const history = useHistory();

  // const createPost = async () => {
  //   const content = {
  //     postId: "123",
  //     comments: {},
  //     username: "legend",
  //     upvotes: 0,
  //     downvotes: 0,
  //     caption:
  //       "Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit",
  //   };

  //   await fetch("/createpost", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(content),
  //   }).then((res) => {
  //     return res.json();
  //   });
  // };

  // const deletePost = async () => {
  //   const imageId = {
  //     imageId: "9089",
  //   };
  //   await fetch("/deletepost", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(imageId),
  //   });
  // };

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
    <div className="Home">
      <div className="posts">
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
      <div
        className="createPostButton"
        onClick={() => {
          history.push("createpost");
        }}
      >
        <Symbols.Plus size="38" />
      </div>
    </div>
  );
}

export default Home;
