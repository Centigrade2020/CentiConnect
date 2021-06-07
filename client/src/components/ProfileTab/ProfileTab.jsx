import { useHistory } from "react-router";
import fb from "../../services/firebase";
import "./ProfileTab.css";

function ProfileTab() {
  const history = useHistory();

  return (
    <div className="ProfileTab" id="ProfileTab">
      <section className="ProfileTabHeader">
        <div className="profilePicContainer"></div>
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
