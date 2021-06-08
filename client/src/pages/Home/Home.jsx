import { Symbols, Post } from "../../components";
import "./Home.css";
import test from "./test.jpg";

function Home() {
  const createPost = async () => {
    const content = {
      postId: "123",
      comments: {},
      username: "legend",
      image: test,
      upvotes: 0,
      downvotes: 0,
      caption:
        "Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit",
    };

    await fetch("/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    }).then((res) => {
      return res.json();
    });
  };

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
    postId: "asdf",
    comments: {
      senpai: "Looking gud broo!!",
      dharundds: "Wow.. Awesome!!",
      hrithik: "waste ra dei!!",
    },
    username: "legend",
    image: test,
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
          image={post.image}
          upvotes={post.username}
          downvotes={post.downvotes}
          caption={post.caption}
        />
      </div>
      <div className="createPostButton" onClick={createPost}>
        <Symbols.Plus size="38" />
      </div>
      {/* <button onClick={deletePost}>delete</button> */}
    </div>
  );
}

export default Home;
