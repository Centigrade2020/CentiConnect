import { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";

function App() {
  const history = useHistory();
  const location = useLocation();
  const authUser = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      if (location.pathname !== "/createform") {
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
        <Route exact path="/" component={Home} />
        <Route path="/createform" component={CreateForm} />
      </>
    </Switch>
  );
}

export default App;
