import React, { Component } from "react";
import Metric from "./metric";
import JobBoard from "./jobBoard";
import axios from "axios";

class Dashboard extends Component {
  state = {
    jobs: [],
  };

  getUserJobs = () => {
    axios.get("http://localhost:3000/api/users/1").then((response) => {
      this.setState({jobs: response.data.jobs});
      console.log(response);
    });
  };

  render() {
    return (
      <div>
        <h1>I am the dashboard</h1>
        <div className="metric-zone">
          <Metric />
          <Metric />
          <Metric />
          <Metric />
          <Metric />
          <button onClick={this.getUserJobs()}>JOBS</button>
        </div>
        <hr />
        <div className="job-zone">
          <div className="job-board">
            <JobBoard />
            <p>{ this.state.jobs.map(job => job) }</p>
          </div>
          <div className="job-board">
            <JobBoard />
          </div>
          <div className="job-board">
            <JobBoard />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
