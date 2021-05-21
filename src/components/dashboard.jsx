import React, { Component } from "react";
import axios from "axios";
import Metric from "./metric";
import JobBoard from "./jobBoard";
import JobCreate from "./jobCreate"




class Dashboard extends Component {
  state = {
    jobs: [],
    statuses: ["Saved", "Draft", "Applied", "In Contact", "Interviewing", "Offered", "Denied"],
  };

  componentDidMount() {
    this.getUserJobs();
  }

  getUserJobs = () => {
    axios.get("http://localhost:3000/api/users/" + localStorage.getItem("user_id")).then((response) => {
      this.setState({ jobs: response.data.jobs });
      // console.log(response.data.jobs);
      // console.log(this.state.jobs);
    });
  };

  jobDataFilter = (status) => {
    // console.log(Object.values(status)[0])
    return (
      this.state.jobs.filter(job => job.status === Object.values(status)[0])
    )
  }
  

  render() {
    return (
      <div>
        <h1>I am the dashboard</h1>
        <button>Add a Job</button>
        <JobCreate />
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
                <JobBoard jobData={this.jobDataFilter({status})}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
