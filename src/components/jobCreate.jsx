import React, { Component } from "react";
import axios from "axios";

class JobCreate extends Component {
  state = {
    company_name: "",
    position: "",
    salary: 0,
    posting_url: "",
    notes: "",
    status: "Applied",
    description: "",
    user_id: localStorage.getItem("user_id"),
    showModal: false,
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

  onTrigger = (event) => {
    this.props.parentCallBack(event);
    // event.preventDefault();
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
        this.onTrigger(job);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.setState({ errors: error.response.data.errors });
        // this.handleReset();
        // this.setState.errors = ["Invalid email or Password"];
        // this.setState({email: ""});
        // this.setState.password = "";
      });
    this.props.closeModal();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <form className="job-create-form" id="form" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <label className="column" htmlFor="company_name">
                Company Name:
              </label>
              <input className="column" onChange={this.handleChange} type="text" name="company_name" />
            </div>
            <div className="row">
              <label className="column" htmlFor="position">
                Position:
              </label>
              <input className="column" onChange={this.handleChange} type="text" name="position" />
            </div>
            <div className="row">
              <label className="column" htmlFor="description">
                Description:
              </label>
              <textarea className="column" onChange={this.handleChange} type="text" name="description" />
            </div>
            <div className="row">
              <label className="column" htmlFor="salary">
                Salary:
              </label>
              <input className="column" onChange={this.handleChange} type="number" name="salary" />
            </div>
            <div className="row">
              <label className="column" htmlFor="posting_url">
                Posting URL:
              </label>
              <input className="column" onChange={this.handleChange} type="text" name="posting_url" />
            </div>
            <div className="row">
              <label className="column" htmlFor="status">
                Status:
              </label>
              <select className="column" name="status" onChange={this.handleChange}>
                <option value="Applied">Applied</option>
                <option value="Saved">Saved</option>
                <option value="Draft">Draft</option>
                <option value="In Contact">In Contact</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Denied">Denied</option>
              </select>
            </div>
            <div className="row">
              <label className="column" htmlFor="notes">
                Notes:
              </label>
              <textarea className="column" type="text" name="notes" onChange={this.handleChange} />
            </div>
            <br />
            <div className="center">
              <button type="button" onClick={this.handleSubmit}>
                Add to My Jobs
              </button>
              <button type="button" onClick={this.props.closeModal}>
                Close
              </button>
              {/* <button onClick={this.onTrigger}>TRIGGERED</button> */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default JobCreate;
