import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Component } from "react";
import io from "socket.io-client";
import "../styles/style.scss";
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
      <div className="login">
        <div className="login__box">
          <h1>Welcome to Remo</h1>
          <p>Your limitless virtual networking and event space.</p>
          <p>
            <b>
              Welcome back! Enter your virtual event space by logging in below.
            </b>
          </p>
          <input
            type="text"
            onChange={event => this.handleChangeOfName(event)}
            placeholder="Enter username..."
            className="login__input"
          />
          <br />
          <Link to={`/conference/${this.state.username}`}>
            <button
              disabled={!this.state.username.length}
              className="login__button"
            >
              Join Table
            </button>
          </Link>
          <p className="login__para">
            Don't have an account? <a href="#">Sign up </a>now <br />
            Forgot password? <a href="#"> Recover now</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
