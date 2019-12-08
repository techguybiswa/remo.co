import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Component } from "react";

class Notification extends Component {
  constructor(props) {
    super();
    this.state = {
      username: ""
    };
  }

  componentDidMount() {}
  render() {
    return (
      <div
        style={{
          backgroundColor: "#eff5e1",
          width: "500px",
          borderRadius: "4px"
        }}
      >
        <h1>Show Notifications here</h1>
      </div>
    );
  }
}

export default Notification;
