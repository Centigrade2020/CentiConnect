import { Symbols, Post } from "../../components";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <div className="posts">
        <Post />
      </div>
      <div className="createPostButton">
        <Symbols.Plus size="38" />
      </div>
    </div>
  );
}

export default Home;
