import React, { Component } from "react";
import axios from "axios";
import { InputGroup, FormControl } from "react-bootstrap";

class JobCreate extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    id: null,
    company_name: "",
    position: "",
    salary: null,
    posting_url: "",
    notes: "",
    status: "Applied",
    description: "",
    user_id: localStorage.getItem("user_id"),
    showModal: false,
    errors: [],
    date_updated: null,
    maxDate: "2021-06-24",
  };

  componentDidMount() {
    this.maxDate()
  }

  handleReset = () => {
    document.getElementById("form").reset();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onTrigger = (job) => {
    this.props.handleAddJob(job);
    // event.preventDefault();
  };

  handleSubmit = (event) => {
    const job = {
      id: this.state.id,
      user_id: this.state.user_id,
      company_name: this.state.company_name,
      description: this.state.description,
      position: this.state.position,
      salary: this.state.salary,
      posting_url: this.state.posting_url,
      notes: this.state.notes,
      status: this.state.status,
      date_updated: this.state.date_updated,
    };
    axios
      .post("http://localhost:3000/api/jobs", job)
      .then((res) => {
        console.log(res.data);
        this.props.closeModal();
        this.onTrigger(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        // this.setState({ errors: error.response });
        // this.handleReset();
        // this.setState.errors = ["Invalid email or Password"];
        // this.setState({email: ""});
        // this.setState.password = "";
      });
  };

  maxDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    this.setState({date_updated: today})
    // console.log(this.state.date_updated)
  };


  render() {
    return (
      <div className="modal-login">
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
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Last Contacted</InputGroup.Text>
              <FormControl
                name="date_updated"
                type="date"
                max={this.state.maxDate}
                defaultValue={this.state.maxDate}
                aria-describedby="basic-addon3"
                // value={this.props.job.date_updated}
                onChange={this.handleChange}
              />
            </InputGroup>
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
            <div>
              <ul className="text-danger">
                {this.state.errors.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default JobCreate;
