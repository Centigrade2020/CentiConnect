import "./ProfileTab.css";

function ProfileTab() {
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
        <div className="logout">Logout</div>
      </section>
    </div>
  );
}

export default ProfileTab;
