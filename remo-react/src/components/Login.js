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
      <div
        style={{
          backgroundColor: "#403E65",
          height: "100vh",
          paddingTop: "10px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh"
          }}
        >
          <div
            style={{
              height: "400px",
              width: "700px",
              backgroundColor: "white",
              borderRadius: "10px",
              textAlign: "center",
              fontFamily: "Poppins,Helvetica Neue,Helvetica,Arial,sans-serif",
              color: "#484a56"
            }}
          >
            <h1>Welcome to Remo</h1>
            <p>Your limitless virtual networking and event space.</p>
            <p>
              {" "}
              <b>
                Welcome back! Enter your virtual event space by logging in
                below.
              </b>
            </p>
            <input
              type="text"
              onChange={event => this.handleChangeOfName(event)}
              placeholder="Enter username..."
              style={{
                outline: 0,
                border: 0,
                borderBottom: "2px solid #484a56",
                fontSize: "24px",
                marginTop: "20px",
                width: "400px"
              }}
            />
            <br />
            <Link to={`/conference/${this.state.username}`}>
              <button
                disabled={!this.state.username.length}
                style={{
                  marginTop: "20px",
                  width: "400px",
                  backgroundColor: "#49A02D",
                  color: "white",
                  fontSize: "22px",
                  padding: "5px",
                  cursor: "pointer"
                }}
              >
                Join Table
              </button>
            </Link>
            <p style={{ marginTop: "40px" }}>
              Don't have an account? <a href="#">Sign up </a>now <br />
              Forgot password? <a href="#"> Recover now</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
