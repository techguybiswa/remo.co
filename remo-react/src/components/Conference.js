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
import UseAnimations from "react-useanimations";
import { FaBell, FaWindowClose, FaVideo, FaVideoSlash } from "react-icons/fa";
import "../styles/style.scss";

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
  addToNotification = notification => {
    this.setState({
      listOfCurrentNotifications: [
        notification,
        ...this.state.listOfCurrentNotifications
      ],
      newNotificationCounter: this.state.newNotificationCounter + 1
    });
  };
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
        this.addToNotification(`You have successfully joined the table!`);
      } else {
        toast(`${data.data.username} has successfully joined the table`, {
          type: toast.TYPE.SUCCESS,
          autoClose: 2000
        });
        this.addToNotification(
          `${data.data.username} has successfully joined the table`
        );
      }
    });
    this.state.socket.on("show broadcast", data => {
      console.log("Broadcast is started here by  " + data.data.username);
      if (this.state.username == data.data.username) {
        toast(`Your broadcast started successfully!`, {
          type: toast.TYPE.SUCCESS,
          autoClose: 2000
        });
        this.addToNotification(`Your broadcast started successfully!`);
      } else {
        toast(`Broadcast is started by ${data.data.username}`, {
          type: toast.TYPE.SUCCESS,
          autoClose: 2000
        });
        this.addToNotification(`Broadcast is started by ${data.data.username}`);
      }
    });
    this.state.socket.on("stop broadcast", data => {
      console.log("Broadcast is stopped by  " + data.data.username);
      if (this.state.username == data.data.username) {
        toast(` Your broadcast is stopped`, {
          type: toast.TYPE.WARNING,
          autoClose: 2000
        });
        this.addToNotification(`Your broadcast is stopped`);
      } else {
        toast(` ${data.data.username} stopped his/her broadcast`, {
          type: toast.TYPE.WARNING,
          autoClose: 2000
        });
        this.addToNotification(
          `${data.data.username} stopped his/her broadcast`
        );
      }
    });
    this.state.socket.on("user disconnected", () => {
      console.log("User is disconnected");
      toast(`Somemone Left the Table`, {
        type: toast.TYPE.WARNING,
        autoClose: 2000
      });
      this.addToNotification(`Someone left the table`);
    });
    this.state.socket.on("internet issue", data => {
      console.log(data.data.username + " went offline");
      if (this.state.username == data.data.username) {
        toast(` You got internet issues and are offline.`, {
          type: toast.TYPE.ERROR,
          autoClose: 2000
        });
        this.addToNotification(`You got internet issues and are offline.`);
      } else {
        toast(` ${data.data.username} got internet issues and went offline.`, {
          type: toast.TYPE.ERROR,
          autoClose: 2000
        });
        this.addToNotification(
          `${data.data.username} got internet issues and went offline.`
        );
      }
    });
    this.state.socket.on("internet issue resolved", data => {
      console.log(data.data.username + " is online again!");
      if (this.state.username == data.data.username) {
        toast(` You are online again!`, {
          type: toast.TYPE.INFO,
          autoClose: 2000
        });
        this.addToNotification(`You are online again!`);
      } else {
        toast(` ${data.data.username} is online again!`, {
          type: toast.TYPE.INFO,
          autoClose: 2000
        });
        this.addToNotification(`${data.data.username} is online again!`);
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
        this.addToNotification(`You have  got camera issues`);
      } else {
        toast(` ${data.data.username} has got camera issues`, {
          type: toast.TYPE.ERROR,
          autoClose: 2000
        });
        this.addToNotification(`${data.data.username} has got camera issues`);
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
        <div>
          <div className="conference__camera-module-background">
            {this.state.username}
          </div>
          <Webcam
            audio={false}
            height={500}
            screenshotFormat="image/jpeg"
            className="conference__webcam"
            onUserMediaError={this.cameraHasError}
          />
        </div>
      );
    return (
      <div className="conference">
        <ToastContainer hideProgressBar newestOnTop={false} />

        <button
          onClick={this.startBroadcast}
          className="conference__button--start"
        >
          {this.state.broadcastState == "Start Broadcast" ? (
            <div>
              <h1 className="conference__icon">
                <FaVideoSlash />
              </h1>
            </div>
          ) : (
            <div>
              <h1 className="conference__icon">
                <FaVideo />
              </h1>
            </div>
          )}
        </button>
        <button
          onClick={this.showNotifications}
          className="conference__button--notification"
        >
          {this.state.showNotification ? (
            <div>
              {" "}
              <h1 className="conference__icon">
                {" "}
                <FaWindowClose />
              </h1>
            </div>
          ) : (
            <h1 className="conference__icon">
              <FaBell />
              {this.state.newNotificationCounter ? (
                <p className="conference__notification-badge">
                  {this.state.newNotificationCounter}
                </p>
              ) : null}
            </h1>
          )}{" "}
        </button>

        <Offline
          onChange={({ isOffline, isOnline }) =>
            this.userNetworkChange(isOffline, isOnline)
          }
        />
        <div className="conference__container">
          <div className="conference__camera-module">{cameraModule}</div>

          <div>
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
