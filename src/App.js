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
          <Route path="/owo">
            <Layout id="owo" />
          </Route>
          <Route path="/morse">
            <Layout id="morse" />
          </Route>
          <Route path="/emoji">
            <Layout id="emoji" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
