import { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useAuth, useResolved } from "./hooks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import SearchUser from "./pages/SearchUser";
import NavBar from "./components/NavBar";
import ProfileTab from "./components/ProfileTab";
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
      console.log(location.pathname);
      if (location.pathname === "/createpost") {
        history.push(!!authUser ? "/createpost" : "login");
      } else if (location.pathname === "/profile") {
        history.push(!!authUser ? "/profile" : "login");
      } else {
        history.push(!!authUser ? "/" : "login");
      }
    }
  }, [authResolved, authUser, history]);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <>
        <NavBar />
        <ProfileTab />
        <Route exact path="/" component={Home} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/profile" component={Profile} />
        <Route path="/searchuser" component={SearchUser} />
      </>
    </Switch>
  );
}

export default App;
