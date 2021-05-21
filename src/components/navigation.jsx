import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }


  render() {
    let button;
    if (localStorage.getItem("jwt") == null) {
      console.log("no jwt");
      button = (
        <NavLink exact activeClassName="current" to="/login">
          Login
        </NavLink>
      );
    } else {
      console.log("jwt!");
      button = (
        <NavLink exact activeClassName="current" to="/logout">
          Logout
        </NavLink>
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
              <NavLink exact activeClassName="current" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="current" to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="current" to="/Contacts">
                Contacts
              </NavLink>
            </li>
            <li>{button}</li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
