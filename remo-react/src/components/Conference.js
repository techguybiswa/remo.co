import React from "react";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Offline from "react-offline";
import Webcam from "react-webcam";

import { Component } from "react";

class Conference extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      broadcastState: "Start Broadcast",
      socket: io("http://localhost")
    };
  }

  initializeSockets = () => {
    // var socket = ;

    this.state.socket.on("connect", () => {
      console.log(
        this.state.username + " :  Your socket is successfully set up!"
      );
      this.state.socket.emit("new user connected", {
        username: this.state.username
      });
    });
    this.state.socket.on("new user", data => {
      console.log("React se new user connected is getting called");
      console.log("New user is ", data.data.username);
    });
    this.state.socket.on("show broadcast", data => {
      console.log("Broadcast is started by  " + data.data.username);
    });
    this.state.socket.on("stop broadcast", data => {
      console.log("Broadcast is stopped by  " + data.data.username);
    });
    this.state.socket.on("user disconnected", () => {
      console.log("User is disconnected");
    });
    this.state.socket.on("internet issue", data => {
      console.log(data.data.username + " went offline");
    });
    this.state.socket.on("internet issue resolved", data => {
      console.log(data.data.username + " is online again!");
    });
    this.state.socket.on("camera issue", data => {
      console.log(
        data.data.username + " has got webcam issues and cannot start broadcast"
      );
    });
  };
  startBroadcast = () => {
    if (this.state.broadcastState == "Start Broadcast") {
      this.state.socket.emit("broadcast started", {
        username: this.state.username
      });

      this.setState({
        broadcastState: "Stop Broadcast"
      });
    } else {
      this.state.socket.emit("broadcast stopped", {
        username: this.state.username
      });

      this.setState({
        broadcastState: "Start Broadcast"
      });
    }
  };
  userNetworkChange = (isOffline, isOnline) => {
    console.log("isOnline " + isOnline + " isOffline " + isOffline);
    if (isOnline) {
      this.state.socket.emit("internet issue resolved emit", {
        username: this.state.username
      });
    }
    if (isOffline) {
      this.state.socket.emit("internet issue emit", {
        username: this.state.username
      });
    }
  };
  cameraHasError = () => {
    console.log("Cam has error");
    this.state.socket.emit("camera error emit", {
      username: this.state.username
    });
  };
  // chrome://settings/content/siteDetails?site=http%3A%2F%2Flocalhost%3A3000
  componentDidMount() {
    this.setState({
      username: this.props.match.params.username
    });
    this.initializeSockets();
  }
  render() {
    let cameraModule =
      this.state.broadcastState == "Start Broadcast" ? (
        ""
      ) : (
        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          onUserMediaError={this.cameraHasError}
        />
      );
    return (
      <div>
        <h1>Welcome to conference</h1>
        <button onClick={this.startBroadcast}>
          {this.state.broadcastState}
        </button>
        <Offline
          onChange={({ isOffline, isOnline }) =>
            this.userNetworkChange(isOffline, isOnline)
          }
        >
          {({ isOffline, isOnline }) => {
            return isOffline ? (
              <div>{"I am offline"}</div>
            ) : (
              <div>{"I am online"}</div>
            );
          }}
        </Offline>
        {cameraModule}
      </div>
    );
  }
}

export default Conference;
