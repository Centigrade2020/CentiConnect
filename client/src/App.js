import fb from "./services/firebase";
import { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAuth, useResolved } from "./hooks";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/ProfilePage";

function App() {
  const history = useHistory();
  const authUser = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      history.push(!authUser && "login");
    }
    fb.firestore
      .collection("root")
      .doc("AdditionalData")
      .get()
      .then((doc) => {
        sessionStorage.setItem("usernames", doc.data().usernames);
      });
  }, [authResolved, authUser, history]);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route path="/user" component={UserProfile} />
      </>
    </Switch>
  );
}

export default App;
