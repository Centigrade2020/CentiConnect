import { useHistory, useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const history = useHistory();
  const location = useLocation();

  // const [contact, setContact] = useState(false);

  // useEffect(() => {
  //   if (location.pathname == "/contact") {
  //     setContact(true);
  //   } else {
  //     setContact(false);
  //   }
  // }, [location]);

  return (
    <div className="NavBar">
      <div className="navBarContainer">
        <div className="logo">
          <h1>VibrantDX</h1>
        </div>
        {location.pathname === "/" ? (
          <p
            onClick={() => {
              history.push("contact");
            }}
          >
            Contact
          </p>
        ) : (
          <p
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </p>
        )}
      </div>
    </div>
  );
}

export default NavBar;
