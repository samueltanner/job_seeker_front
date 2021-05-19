import React, { Component } from "react";
import Metric from "./metric";
import JobBoard from "./jobBoard";
import axios from "axios";

class Dashboard extends Component {
  state = {
    jobs: [],
    statuses: ["Saved", "Draft", "Applied", "In Contact", "Interviewing", "Offered", "Denied"],
  };

  componentDidMount() {
    this.getUserJobs();
  }

  getUserJobs = () => {
    axios.get("http://localhost:3000/api/users/1").then((response) => {
      this.setState({ jobs: response.data.jobs });
      // console.log(response.data.jobs);
      console.log(this.state.jobs);
    });
  };

  jobStatusFilter = () => {
    console.log(this.state.jobs[0].status)
  }

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
        </div>
        <hr />
        <div className="job-zone">
          {this.state.statuses.map((status, index) => {
            return (
              <div className="job-board" key={index}>
                {/* <JobBoard jobData={this.jobStatusFilter()} /> */}
                <h2>{status}</h2>
                <JobBoard jobData={this.state.jobs} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
