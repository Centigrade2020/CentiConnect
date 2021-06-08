import { Symbols, Post } from "../../components";
import "./Home.css";
import test from "./test.jpg";

function Home() {
  const create_post = async () => {
    const content = {
      username: "1234",
      imageId: "9089",
      content: "hello",
      description: "nice one buddy",
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

  const delete_post = async () => {
    const imageId = {
      imageId: "9089",
    };
    await fetch("/deletepost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageId),
    });
  };

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
      <div className="createPostButton">
        <Symbols.Plus size="38" />
      </div>
      <button onClick={create_post}>click</button>
      <button onClick={delete_post}>delete</button>
    </div>
  );
}

export default Home;
