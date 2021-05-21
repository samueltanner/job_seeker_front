import axios from "axios";
import React, { Component } from "react";
// import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
  };

  handleReset = () => {
    document.getElementById("form").reset();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };


  handleSubmit = (event) => {
    const userInfo = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:3000/api/sessions", userInfo)
      .then((response) => {
        console.log("Loging in...");
        axios.defaults.headers.common["Authorizaton"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({ errors: "Invalid Email or Password" });
        this.handleReset();
        // this.setState.errors = ["Invalid email or Password"];
        // this.setState({email: ""});
        // this.setState.password = "";
      });
  };

  render() {
    return (
      <div>
        <form id="form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <p className="text-danger">{this.state.errors}</p>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" className="input-label" name="email" id="email" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" className="input-label" name="password" id="password" onChange={this.handleChange} />
          </div>
          <button onClick={this.handleSubmit}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
