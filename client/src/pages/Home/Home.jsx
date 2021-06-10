import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Symbols, Post } from "../../components";
import fb from "../../services/firebase";
import "./Home.css";

function Home() {
  const history = useHistory();

  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   if (!!localStorage.getItem("userId")) {
  //     try {
  //       fb.firestore
  //         .collection("posts")
  //         .get()
  //         .then((docs) => {
  //           var li = [];
  //           docs.forEach((doc) => {
  //             li.push(doc.data());
  //           });
  //           setPosts(li);
  //         });
  //     } catch {
  //       console.log("");
  //     }
  //   }
  // }, [posts]);

  return (
    <div className="Home">
      <div className="posts">
        {/* {posts.map((i, key) => {
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
        })} */}
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
