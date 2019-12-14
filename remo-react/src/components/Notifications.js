import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Component } from "react";
import "../styles/style.scss";

class Notification extends Component {
  constructor(props) {
    super();
    this.state = {
      listOfNotifications: []
    };
  }
  componentDidMount() {
    this.setState({
      listOfNotifications: this.props.notifications
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications !== this.props.notifications) {
      this.setState({
        listOfNotifications: nextProps.notifications
      });
    }
  }

  render() {
    return (
      <div className="notification">
        <h1> Notifications </h1>{" "}
        <div className="notification__container">
          {this.state.listOfNotifications.map(eachNotification => (
            <p className="notification__each-notification ">
              {eachNotification}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default Notification;
