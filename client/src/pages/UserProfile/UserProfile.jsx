import "./UserProfile.css";
import { Symbols, Post } from "../../components";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import fb from "../../services/firebase";
import "../ProfilePage/Profile.css";
function UserProfile(props) {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="UserProfile">
      <div className="ProfileBanner">
        <div className="profilePicContainer">
          <>
            <img
              src=""
              alt=" "
              onDragStart={(e) => {
                e.preventDefault();
              }}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </>
        </div>

        <div className="profileBannerContent">
          <p className="username">{location.username}</p>

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
      </div>
      <div className="currentUserPosts">
        {/* <Post
                    postId={post.postId}
                    comments={post.comments}
                    //username={post.username}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    caption={post.caption}
                />
                <Post
                    postId={post2.postId}
                    comments={post2.comments}
                    //username={post2.username}
                    upvotes={post2.upvotes}
                    downvotes={post2.downvotes}
                    caption={post2.caption}
                /> */}
      </div>
    </div>
  );
}
export default UserProfile;
