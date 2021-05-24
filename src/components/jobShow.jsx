import React, { Component } from "react";
// import axios from 'axios';

class JobShow extends Component {
 
  setSelectedStatus = (s, i) => {
    s.options[i - 1].selected = true;
    return;
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
 
    return (
      <div className="modal">
        <div className="modal-content">
          <h1>{this.props.job.company_name}</h1>
          <h3>{this.props.job.position}</h3>
          <h3>{this.props.job.status}</h3>
          <select id="status_dropdown" name="status" onChange={this.handleChange}>
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
        </div>
      </div>
    );
  }
}

export default JobShow;
