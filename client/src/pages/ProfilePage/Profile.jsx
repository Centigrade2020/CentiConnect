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
      <div className="ProfileBanner">
        <div className="profilePicContainer"></div>

        <div className="profileBannerContent">
          <div className="username">username</div>

          <div className="userInfo">
            <p className="posts">
              <span className="userInfoNum">2</span>
              <span className="userInfoText">Posts</span>
            </p>
            <p className="connections">
              <span className="userInfoNum">3</span>
              <span className="userInfoText">Connections</span>
            </p>
          </div>

          <div className="bio">
            <p className="userInfoText">About</p>
            <p className="bioText">Centiconnect will launched soon</p>
          </div>
        </div>

        <div className="profileBannerLinks">
          <div
            className="profileBannerLinkButton"
            onClick={() => {
              document
                .getElementsByClassName("editPage")
                .classList.toggle("show");
            }}
          >
            <Symbols.Edit size="30" />
          </div>
          <div
            className="profileBannerLinkButton"
            onClick={() => {
              document
                .getElementsByClassName("editPage")
                .classList.toggle("show");
            }}
          >
            <Symbols.Settings size="30" />
          </div>
        </div>
      </div>

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
