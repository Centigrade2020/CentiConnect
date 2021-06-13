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
        {posts !== [] &&
          posts.map((i, key) => (
            <Post
              key={key}
              postId={i.postId}
              userId={i.userId}
              comments={i.comments}
              username={i.username}
              upvotes={i.upvotes.length}
              downvotes={i.downvotes.length}
              caption={i.caption}
              voteState={() => {
                if (i.upvotes.length > 0) {
                  for (var j in i.upvotes) {
                    if (i.upvotes[j] == localStorage.getItem("userId")) {
                      return true;
                    }
                  }
                } else if (i.downvotes.length > 0) {
                  for (var k in i.downvotes) {
                    if (i.downvotes[k] == localStorage.getItem("userId")) {
                      return false;
                    }
                  }
                }
                return null;
              }}
            />
          ))}
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
