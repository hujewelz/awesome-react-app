import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Post from "./screen/Post";
import Signup from "./screen/Signup";
import Login from "./screen/Login";
import { useUserStatus } from "./hook";
import { auth } from "./firebase";
import Profile from "./screen/Profile";
import Loading from "./UI/Loading";
import NewPost from "./screen/NewPost";

function App() {
  const [user, loading] = useUserStatus();
  const history = useHistory();

  const signOut = () => {
    auth
      .signOut()
      .then(() => history.replace("/login"))
      .catch((error) => prompt(error));
  };

  return (
    <div className="app">
      <Loading isLoading={loading}>
        {!user ? (
          <Router>
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </Router>
        ) : (
          <Router>
            <NavigationBar user={user} signOut={signOut} />
            <div className="main">
              <Switch>
                <Route path="/profile">
                  <Profile user={user} />
                </Route>
                <Route path="/">
                  <Post user={user} />
                  <NewPost />
                </Route>
              </Switch>
            </div>
          </Router>
        )}
      </Loading>
    </div>
  );
}

export default App;
