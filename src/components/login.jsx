import React, { Component } from "react";
// import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  render() {
    return (
      <div>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" className="input-label" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="text" className="input-label" id="password" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
