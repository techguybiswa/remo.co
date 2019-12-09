import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Component } from "react";

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
      <div
        style={{
          backgroundColor: "#eff5e1",
          width: "500px",
          borderRadius: "4px",
          border: "2px solid black",
          marginTop: "10px"
        }}
      >
        <h1> Notifications </h1>{" "}
        <div style={{ maxHeight: "500px", overflow: "scroll" }}>
          {this.state.listOfNotifications.map(eachNotification => (
            <p
              style={{
                border: "2px solid black",
                padding: "10px",
                margin: "5px"
              }}
            >
              {eachNotification}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default Notification;
