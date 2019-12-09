import React from "react";
import io from "socket.io-client";
import Notification from "./Notifications";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Offline from "react-offline";
import Webcam from "react-webcam";

import { Component } from "react";

class Conference extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      broadcastState: "Start Broadcast",
      socket: io("http://localhost"),
      showNotification: false,
      listOfCurrentNotifications: [],
      newNotificationCounter: 0
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
      console.log(
        "New user is 1998 " +
          this.state.username +
          " data -> " +
          data.data.username
      );
      if (this.state.username == data.data.username) {
        toast(`You have successfully joined the table!`, {
          type: toast.TYPE.SUCCESS,
          autoClose: 2000
        });
        this.setState({
          listOfCurrentNotifications: [
            ...this.state.listOfCurrentNotifications,
            "You have successfully joined the table!"
          ],
          newNotificationCounter: this.state.newNotificationCounter + 1
        });
      } else {
        toast(`${data.data.username} has successfully joined the table`, {
          type: toast.TYPE.SUCCESS,
          autoClose: 2000
        });
        this.setState({
          listOfCurrentNotifications: [
            ...this.state.listOfCurrentNotifications,
            `${data.data.username} has successfully joined the table`
          ],
          newNotificationCounter: this.state.newNotificationCounter + 1
        });
      }
    });
    this.state.socket.on("show broadcast", data => {
      console.log("Broadcast is started here by  " + data.data.username);
      if (this.state.username == data.data.username) {
        toast(`Your broadcast started successfully!`, {
          type: toast.TYPE.SUCCESS,
          autoClose: 2000
        });
        this.setState({
          listOfCurrentNotifications: [
            ...this.state.listOfCurrentNotifications,
            "Your broadcast started successfully!"
          ],
          newNotificationCounter: this.state.newNotificationCounter + 1
        });
      } else {
        toast(`Broadcast is started by ${data.data.username}`, {
          type: toast.TYPE.SUCCESS,
          autoClose: 2000
        });
        this.setState({
          listOfCurrentNotifications: [
            ...this.state.listOfCurrentNotifications,
            `Broadcast is started by ${data.data.username}`
          ],
          newNotificationCounter: this.state.newNotificationCounter + 1
        });
      }
    });
    this.state.socket.on("stop broadcast", data => {
      console.log("Broadcast is stopped by  " + data.data.username);
      if (this.state.username == data.data.username) {
        toast(` Your broadcast is stopped`, {
          type: toast.TYPE.WARNING,
          autoClose: 2000
        });
        this.setState({
          listOfCurrentNotifications: [
            ...this.state.listOfCurrentNotifications,
            `Your broadcast is stopped`
          ],
          newNotificationCounter: this.state.newNotificationCounter + 1
        });
      } else {
        toast(` ${data.data.username} stopped his/her broadcast`, {
          type: toast.TYPE.WARNING,
          autoClose: 2000
        });
        this.setState({
          listOfCurrentNotifications: [
            ...this.state.listOfCurrentNotifications,
            `${data.data.username} stopped his/her broadcast`
          ],
          newNotificationCounter: this.state.newNotificationCounter + 1
        });
      }
    });
    this.state.socket.on("user disconnected", () => {
      console.log("User is disconnected");
      toast(`Somemone Left the Table`, {
        type: toast.TYPE.WARNING,
        autoClose: 2000
      });
      this.setState({
        listOfCurrentNotifications: [
          ...this.state.listOfCurrentNotifications,
          `Someone left the table`
        ],
        newNotificationCounter: this.state.newNotificationCounter + 1
      });
    });
    this.state.socket.on("internet issue", data => {
      console.log(data.data.username + " went offline");
      if (this.state.username == data.data.username) {
        toast(` You got internet issues and are offline.`, {
          type: toast.TYPE.ERROR,
          autoClose: 2000
        });
        this.setState({
          listOfCurrentNotifications: [
            ...this.state.listOfCurrentNotifications,
            `You got internet issues and are offline.`
          ],
          newNotificationCounter: this.state.newNotificationCounter + 1
        });
      } else {
        toast(` ${data.data.username} got internet issues and went offline.`, {
          type: toast.TYPE.ERROR,
          autoClose: 2000
        });
        this.setState({
          listOfCurrentNotifications: [
            ...this.state.listOfCurrentNotifications,
            `${data.data.username} got internet issues and went offline.`
          ],
          newNotificationCounter: this.state.newNotificationCounter + 1
        });
      }
    });
    this.state.socket.on("internet issue resolved", data => {
      console.log(data.data.username + " is online again!");
      if (this.state.username == data.data.username) {
        toast(` You are online again!`, {
          type: toast.TYPE.INFO,
          autoClose: 2000
        });
      } else {
        toast(` ${data.data.username} is online again!`, {
          type: toast.TYPE.INFO,
          autoClose: 2000
        });
      }
    });
    this.state.socket.on("camera issue", data => {
      console.log(
        data.data.username + " has got webcam issues and cannot start broadcast"
      );
      if (this.state.username == data.data.username) {
        toast(` You have  got camera issues`, {
          type: toast.TYPE.ERROR,
          autoClose: 2000
        });
      } else {
        toast(` ${data.data.username} has got camera issues`, {
          type: toast.TYPE.ERROR,
          autoClose: 2000
        });
      }
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
  showNotifications = () => {
    if (this.state.showNotification) {
      this.setState({
        showNotification: false,
        newNotificationCounter: 0
      });
    } else {
      this.setState({
        showNotification: true,
        newNotificationCounter: 0
      });
    }
  };
  render() {
    let cameraModule =
      this.state.broadcastState == "Start Broadcast" ? (
        ""
      ) : (
        <div style={{}}>
          <div
            style={{
              backgroundColor: "black",
              textAlign: "center",
              color: "white",
              width: "95%"
            }}
          >
            {this.state.username}
          </div>
          <Webcam
            audio={false}
            height={500}
            screenshotFormat="image/jpeg"
            style={{
              borderRadius: "4px",
              transform: "scaleX(-1)"
            }}
            onUserMediaError={this.cameraHasError}
          />
        </div>
      );
    return (
      <div
        style={{
          backgroundImage: `url('https://i.ibb.co/TRknhGM/Screenshot-2019-12-07-at-8-52-18-PM.png')`,
          height: "100vh",
          paddingTop: "10px"
        }}
      >
        <ToastContainer hideProgressBar newestOnTop={false} />

        <button
          onClick={this.startBroadcast}
          style={{
            backgroundColor: "#49A02D",
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            outline: "none",
            color: "white",
            cursor: "pointer",
            position: "absolute",
            bottom: "285px",
            right: "10px"
          }}
        >
          {this.state.broadcastState == "Start Broadcast" ? "Start" : "Stop"}
        </button>
        <button
          onClick={this.showNotifications}
          style={{
            backgroundColor: "#49A02D",
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            outline: "none",
            color: "white",
            cursor: "pointer",
            position: "absolute",
            bottom: "340px",
            right: "10px"
          }}
        >
          {this.state.showNotification
            ? "Hide"
            : `Show ${this.state.newNotificationCounter}`}{" "}
        </button>
        <Offline
          onChange={({ isOffline, isOnline }) =>
            this.userNetworkChange(isOffline, isOnline)
          }
        />
        <div style={{ display: "flex", flexWrap: "nowrap", marginTop: "50px" }}>
          <div
            style={{
              width: "50%",
              padding: "20px"
            }}
          >
            {cameraModule}
          </div>

          <div style={{ width: "50%" }}>
            {this.state.showNotification ? (
              <Notification
                notifications={this.state.listOfCurrentNotifications}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Conference;
