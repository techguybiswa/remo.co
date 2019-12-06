import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Component } from "react";
import Conference from "./components/Conference.js";
import Login from "./components/Login.js";
class App extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/conference/:username" component={Conference} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
