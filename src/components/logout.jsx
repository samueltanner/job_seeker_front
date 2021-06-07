import axios from "axios";
import React, { Component } from "react";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout();
  }

  handleLogout() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    localStorage.removeItem("metric_row_id");
    this.props.history.push("/");
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Logout;
