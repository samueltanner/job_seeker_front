import React, { Component } from "react";
import axios from "axios";

class JobCreate extends Component {
  state = {
    company_name: "",
    position: "",
    salary: 0,
    posting_url: "",
    notes: "",
    status: "",
    description: "",
    user_id: localStorage.getItem("user_id"),
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
    const job = {
      user_id: this.state.user_id,
      company_name: this.state.company_name,
      description: this.state.description,
      position: this.state.position,
      salary: this.state.salary,
      posting_url: this.state.posting_url,
      notes: this.state.notes,
      status: this.state.status,
    };
    axios
      .post("http://localhost:3000/api/jobs", job)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.setState({ errors: error.response.data.errors });
        // this.handleReset();
        // this.setState.errors = ["Invalid email or Password"];
        // this.setState({email: ""});
        // this.setState.password = "";
      });
  };

  render() {
    return (
      <div>
        <div className="signup-form">
          <form id="form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="company_name">Company Name:</label>
            <input onChange={this.handleChange} type="text" className="input-label" name="company_name" />
            <label htmlFor="position">Position:</label>
            <input onChange={this.handleChange} type="text" className="input-label" name="position" />
            <label htmlFor="description">Description:</label>
            <textarea onChange={this.handleChange} type="text" className="input-label" name="description" />
            <label htmlFor="salary">Salary:</label>
            <input onChange={this.handleChange} type="number" className="input-label" name="salary" />
            <label htmlFor="posting_url">Posting URL:</label>
            <input onChange={this.handleChange} type="text" className="input-label" name="posting_url" />
            <label htmlFor="status">Status:</label>
            <select name="status" onChange={this.handleChange}>
              <option value="Saved">Saved</option>
              <option value="Draft">Draft</option>
              <option value="Applied">Applied</option>
              <option value="In_Contact">In Contact</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Denied">Denied</option>
            </select>
            <label htmlFor="notes">Notes:</label>
            <textarea type="text" className="input-label" name="notes" onChange={this.handleChange} />
            <br />
            <button onClick={this.handleSubmit}>Add to My Jobs</button>
          </form>
        </div>
      </div>
    );
  }
}

export default JobCreate;
