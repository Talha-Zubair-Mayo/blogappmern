import { Route, Switch } from "react-router-dom";
import TopBar from "./Components/TopBar/TopBar";
// import Header from "./Components/Header/Header";
import HOME from "./Pages/HOME/Home";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write";
import Settings from "./Pages/Settings/Settings";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { useContext } from "react";
import { Context } from "./contexts/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <HOME />
        </Route>
        <Route exact path="/write">
        {user ? <Write /> : <Register />}
          
        </Route>
        <Route exact path="/settings">
        {user ?  <Settings /> : <Register />}
         
        </Route>

        <Route exact path="/register">
         {user ? <HOME /> : <Register />}
        </Route>

        <Route exact path="/login">
          {user ? <HOME /> :   <Login />}
        </Route>
        <Route exact path="/post/:postid">
          <Single />
        </Route>
      </Switch>
    </>
  );
}

export default App;
