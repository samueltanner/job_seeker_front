import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: [],
  };

  handleReset = () => {
    document.getElementById("form").reset();
  };

  getUsers = () => {
    axios.get("http://localhost:3000/api/users").then((response) => {
      console.log(response.data);
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const user = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };
    axios
      .post("http://localhost:3000/api/users", user)
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/login");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.setState({ errors: error.response.data.errors });
        this.handleReset();
        // this.setState.errors = ["Invalid email or Password"];
        // this.setState({email: ""});
        // this.setState.password = "";
      });
  };

  render() {
    return (
      <div className="signup-form">
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className="text-danger">
          <ul>
            {this.state.errors.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <form id="form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="username">Username</label>
            <input className="input-label" type="text" name="username" id="username" onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input className="input-label" type="text" name="email" id="email" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input className="input-label" type="text" name="password" id="password" onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input
              className="input-label"
              type="text"
              name="password_confirmation"
              id="password_confirmation"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleSubmit}>Create Account</button>
        </form>
        {/* <button onClick={this.getUsers}>Get Me</button> */}
      </div>
    );
  }
}

export default Home;
