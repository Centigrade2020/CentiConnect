import { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useAuth, useResolved } from "./hooks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import SearchUser from "./pages/SearchUser";
import NavBar from "./components/NavBar";
import Profile from "./pages/ProfilePage";
import fb from "./services/firebase";

function App() {
  const history = useHistory();
  const location = useLocation();
  const authUser = useAuth();
  const authResolved = useResolved(authUser);

  fb.firestore
    .collection("root")
    .doc("AdditionalData")
    .get()
    .then((doc) => {
      sessionStorage.setItem("usernames", doc.data().usernames);
    });

  useEffect(() => {
    if (authResolved) {
      if (location.pathname === "/createpost") {
        history.push(!!authUser ? "/createpost" : "login");
      } else if (location.pathname === "/profile") {
        history.push(!!authUser ? "/profile" : "login");
      } else if (location.pathname === "/signup") {
        history.push(!!authUser ? "/" : "signup");
      } else {
        history.push(!!authUser ? "/" : "login");
      }
    }
  }, [authResolved, authUser, history, location.pathname]);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/profile" component={Profile} />
        <Route path="/searchuser" component={SearchUser} />
        {/* <Route path="/user/:uid" component={UserProfile} /> */}
      </>
    </Switch>
  );
}

export default App;
