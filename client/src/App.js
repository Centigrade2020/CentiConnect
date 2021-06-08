import { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAuth, useResolved } from "./hooks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import NavBar from "./components/NavBar";
import ProfileTab from "./components/ProfileTab";

function App() {
  const history = useHistory();
  const authUser = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? "/" : "login");
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
      </>
    </Switch>
  );
}

export default App;
