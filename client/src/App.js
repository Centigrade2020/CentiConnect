import { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useAuth, useResolved } from "./hooks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import NavBar from "./components/NavBar";
import ProfileTab from "./components/ProfileTab";
import Profile from "./pages/ProfilePage";

function App() {
  const history = useHistory();
  const location = useLocation();
  const authUser = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      console.log(location.pathname);
      if (location.pathname === "/createpost") {
        history.push(!!authUser ? "/createpost" : "login");
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
        <Route path="/Profile" component={Profile} />
        
      </>
    </Switch>
  );
}

export default App;
