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
            <Layout />
          </Route>
          <Route path="/:id">
            <Layout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
