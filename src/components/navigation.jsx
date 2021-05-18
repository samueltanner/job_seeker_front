import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  render() {
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
            <li>
              <NavLink exact activeClassName="current" to="/Logout">
                Logout
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="current" to="/Login">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
