import axios from "axios";
import React, { Component } from "react";
// import axios from 'axios';

class JobShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSave = (event) => {
    const job = {
      status: this.state.status,
    };
    console.log(this.props.job.id);
    axios.patch("http://localhost:3000/api/jobs/" + this.props.job.id, job).then((res) => {
      console.log(res.data);
    });
  };

  // handleDestroy = (event) => {
  //   var job_id = this.props.job.id
  //   axios.delete("http://localhost:3000/api/jobs/" + job_id).then((res) => {
  //     console.log(res.data)
  //     this.props.closeModal();
  //   })
  // }
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <h1>{this.props.job.company_name}</h1>
          <h3>{this.props.job.position}</h3>
          {/* <h3>{this.props.job.status}</h3> */}
          <select id="status_dropdown" defaultValue={this.props.job.status} name="status" onChange={this.handleChange}>
            <option value="Applied">Applied</option>
            <option value="Saved">Saved</option>
            <option value="Draft">Draft</option>
            <option value="In Contact">In Contact</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Denied">Denied</option>
          </select>
          <p>{this.props.job.description}</p>
          <p>{this.props.job.posting_url}</p>
          <p>{this.props.job.notes}</p>
          <button onClick={this.props.closeModal}>Close</button>
          <button>Edit Info</button>
          <button onClick={this.handleSave}>Save Changes</button>
          <button
            onClick={() => {
              this.props.deleteJob(this.props.job.id);
              this.props.closeModal();
            }}
          >
            Delete Job
          </button>
        </div>
      </div>
    );
  }
}

export default JobShow;
