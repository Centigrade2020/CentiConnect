import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Symbols, Post } from "../../components";
import "./Home.css";

function Home() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/getallposts")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPosts(res.posts);
      });
  }, []);

  return (
    <div className="Home">
      <div className="posts">
        {posts.map((i, key) => {
          return (
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
          );
        })}
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
