import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
    };
  }

  render() {
    let auth;
    let dashboard;
    let contacts;
    if (localStorage.getItem("jwt") == null) {
      auth = (
        <li>
          <NavLink exact activeClassName="current" to="/login">
            Login
          </NavLink>
        </li>
      );
    } else {
      auth = (
        <li>
          <NavLink exact activeClassName="current" to="/logout">
            Logout
          </NavLink>
        </li>
      );
      dashboard = (
        <li>
          <NavLink exact activeClassName="current" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
      );
      contacts = (
        <li>
          <NavLink exact activeClassName="current" to="/contacts">
            Contacts
          </NavLink>
        </li>
      );
    }

    return (
      <div>
        <nav>
          <ul>
            <li>
              <NavLink exact activeClassName="current" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="current" to="/about">
                About
              </NavLink>
            </li>
            {dashboard}
            {contacts}
            {auth}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
