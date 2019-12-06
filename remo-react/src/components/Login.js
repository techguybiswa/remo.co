import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Component } from "react";
import io from "socket.io-client";

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      username: ""
    };
  }
  handleChangeOfName = event => {
    this.setState({
      username: event.target.value
    });
  };
  componentDidMount() {}
  render() {
    return (
      <div>
        <h1>Welcome to Login Page</h1>
        <input
          type="text"
          onChange={event => this.handleChangeOfName(event)}
          placeholder="Enter username..."
        />
        <Link to={`/conference/${this.state.username}`}>
          <button disabled={!this.state.username.length}>Submit</button>
        </Link>
      </div>
    );
  }
}

export default Login;
