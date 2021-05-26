import React, { Component } from "react";
import axios from "axios";
import Metric from "./metric";
import JobBoard from "./jobBoard";
import JobCreate from "./jobCreate";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      statuses: ["Saved", "Draft", "Applied", "In Contact", "Interviewing", "Offered", "Denied"],
      currentJob: {},
    };
  }

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
  handleAddJob = (job) => {
    this.setState((state) => ({ jobs: [...state.jobs, job] }));
  };
  handleUpdateJob = (job, job_id) => {
    this.state.jobs.splice(this.state.jobs.indexOf(job_id), 1);
    var jobIndex = this.state.jobs.findIndex((o) => o.id === job_id);
    this.removeJobFromState(jobIndex);
    this.handleAddJob(job)


    // console.log("This is the updated job:")
    console.log(job_id)
    // console.log(job)
  }
  handleDestroyJob = (response) => {
    // var job_id = this.props.job.id
    axios.delete("http://localhost:3000/api/jobs/" + response).then((res) => {
      console.log(res.data);
      this.state.jobs.splice(this.state.jobs.indexOf(response), 1);
      // this.closeModal();
    });

    // console.log(this.state.jobs)
    var jobIndex = this.state.jobs.findIndex((o) => o.id === response);
    // console.log(jobIndex)
    this.removeJobFromState(jobIndex);
  };

  removeJobFromState(index) {
    this.setState({
      jobs: this.state.jobs.filter((_, i) => i !== index),
    });
  }
  jobDataFilter = (status) => {
    // console.log(Object.values(status)[0])
    return this.state.jobs.filter((job) => job.status === Object.values(status)[0]);
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    // const {newJobs} = this.state.newJobs
    return (
      <div>
        <h1>I am the dashboard</h1>
        <button onClick={this.showModal}>Add a Job</button>
        {this.state.showModal ? <JobCreate handleAddJob={this.addJob} closeModal={this.closeModal} /> : null}
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
                <JobBoard jobData={this.jobDataFilter({ status })} deleteJob={this.handleDestroyJob} updateJob={this.handleUpdateJob}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
