import "./ProfileTab.css";

function ProfileTab() {
  return (
    <div className="ProfileTab" id="ProfileTab">
      <header className="ProfileTabHeader">
        <div className="profilePicContainer"></div>
        <div className="username">username</div>
      </header>
      <div className="line"></div>
      <section className="ProfileTabContent">
        <ul>
          <li>apple</li>
          <li>banana</li>
          <li>grapes</li>
        </ul>
      </section>
    </div>
  );
}

export default ProfileTab;
