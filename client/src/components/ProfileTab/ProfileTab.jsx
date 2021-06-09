import { useHistory } from "react-router";
import fb from "../../services/firebase";
import "./ProfileTab.css";
import { useState, useRef } from "react";
import Symbols from "../Symbols";

function ProfileTab() {
  const inputFileRef = useRef(null);
  const [state, setState] = useState({ image: null });
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setState({
        image: URL.createObjectURL(img),
      });
    }
  };
  const onBtnClick = () => {
    inputFileRef.current.click();
  };
  const history = useHistory();

  return (
    <div className="ProfileTab" id="ProfileTab">
      <section className="ProfileTabHeader">
        <div id="profilePicContainer" onClick={()=>{
          history.push('profile')
        }}>
          {/* <div className="profileChange" onClick={onBtnClick}>
            <span className="edit">
              <Symbols.Edit fill="#000" size="50px" />
            </span>
            <input
              type="file"
              id="dp"
              ref={inputFileRef}
              onChange={onImageChange}
            />
          </div>
          <img className="maindp" src={state.image}></img> */}
        </div>

        <div className="username">username</div>
      </section>
      <section className="ProfileTabContent">
        <ul>
          <li>apple</li>
          <li>banana</li>
          <li>grapes</li>
        </ul>
      </section>
      <section>
        <div
          className="logout"
          onClick={() => {
            fb.auth.signOut();
            localStorage.clear();
            history.push("login");
          }}
        >
          Log out
        </div>
      </section>
    </div>
  );
}

export default ProfileTab;
