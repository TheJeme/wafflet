import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Layout from "./Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Layout id="frontpage" />
          </Route>
          <Route path="/general">
            <Layout id="general" />
          </Route>
          <Route path="/crypto">
            <Layout id="crypto" />
          </Route>
          <Route path="/games">
            <Layout id="games" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
