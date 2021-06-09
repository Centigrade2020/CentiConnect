import { Symbols, Post } from "../../components";
import "./Profile.css";
import { useState } from "react";
function Profile() {
  const [show,setshow] = useState('true')
  const post = {
    postId: "test",
    comments: {
      senpai: "Looking gud broo!!",
      dharundds: "Wow.. Awesome!!",
      hrithik: "waste ra dei!!",
    },
    username: "legend",
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
    upvotes: 24,
    downvotes: 3,
    caption:
      "Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit Hello frands.. Diwali outfit v Hello frands.. Diwali outfit",
  };

  const handleToggle= ()=>{
    setshow(!show)
  }

  return (
    <div className="Profile">
      <div className="ProfileBanner">
        <div className="profilePicContainer"></div>

        <div className="profileBannerContent">
          <p className={show ? "username":"username hide"}>username</p>
          <input type="text"  className={show ?'editUsername username':"editUsername show username"} placeholder="username"/>

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
            <p className={show?"bioText":"bioText hide"}>Centiconnect will launched soon</p>
          </div>
            <input type="text"  className={show ?'editBioText bioText':"editBioText show bioText"} placeholder="Centiconnect will launched soon" />
        </div>

        <div className="profileBannerLinks">
          <div
            className="profileBannerLinkButton"
            onClick={()=>{
               
              handleToggle()
            }}
          >
            <Symbols.Edit size="30" />
          </div>
          <div
            className="profileBannerLinkButton"
            // onClick={() => {
            //   document
            //     .getElementsByClassName("editPage")
            //     .classList.toggle("show");
            // }}
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
        />
        <Post
          postId={post2.postId}
          comments={post2.comments}
          username={post2.username}
          upvotes={post2.upvotes}
          downvotes={post2.downvotes}
          caption={post2.caption}
        />
      </div>
    </div>
  );
}

export default Profile;
