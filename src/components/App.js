import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Main/Main";
import Login from "./Main/Login";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
