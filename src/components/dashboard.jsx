import React, { Component } from "react";
import axios from "axios";
import Metric from "./metric";
import JobBoard from "./jobBoard";
import JobCreate from "./jobCreate";
import GoalSet from "./goalSet";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      statuses: ["Saved", "Draft", "Applied", "In Contact", "Interviewing", "Offered", "Denied"],
      userGoals: {},
      userGoalTitles: [
        "Quick Apply:",
        "Intentional Apply:",
        "Informational Interview:",
        "White-boarding (minutes):",
        "Portfolio (minutes):",
      ],
      showGoalsModal: false,
      metrics: {
        quick_apply: 0,
        intentional_apply: 0,
        info_interview: 0,
        white_boarding_minutes: 0,
        portfolio_minutes: 0,
      },
      // currentJob: {},
    };
  }

  // setDashCurrentJob = (job) => {
  //   console.log(job)
  //   this.setState({currentJob: job}, function() {

  //     this.consoleLogCurrentJob()
  //   })
  // }

  // consoleLogCurrentJob = () => {
  //   console.log("I AM THE DASH CURRENT JOB");

  //   console.log(this.state.currentJob)
  // }

  componentDidMount() {
    this.getUserJobsAndGoals();
  }

  getUserJobsAndGoals = () => {
    axios.get("http://localhost:3000/api/users/" + localStorage.getItem("user_id")).then((response) => {
      this.setState({ jobs: response.data.jobs });
      this.setState({ userGoals: response.data.user_goals });
      this.getUserMetrics();
      console.log(response.data.user_goals);
      // console.log(this.state.jobs);
    });
  };

  getUserMetrics = () => {
    axios.get("http://localhost:3000/api/metric_tables/day/" + localStorage.getItem("user_id")).then((response) => {
      // this.setState({ metrics: response.data[1] });
      console.log(response.data);
      if (response.data.length === 0) {
      } else {
        this.setState({ metrics: response.data[0] });
      }
    });
  };
  handleAddJob = (job) => {
    this.setState((state) => ({ jobs: [...state.jobs, job] }));
  };

  handleUpdateJob = (job, job_id) => {
    this.state.jobs.splice(this.state.jobs.indexOf(job_id), 1);
    var jobIndex = this.state.jobs.findIndex((o) => o.id === job_id);
    this.removeJobFromState(jobIndex);
    this.handleAddJob(job);

    // console.log("This is the updated job:")
    console.log(job_id);
    // console.log(job)
  };

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

  updateUserGoals = () => {
    axios.get("http://localhost:3000/api/users/" + localStorage.getItem("user_id")).then((res) => {
      this.setState({ userGoals: res.data.user_goals });
    });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  showGoalsModal = () => {
    this.setState({ showGoalsModal: true });
  };

  closeGoalsModal = () => {
    this.setState({ showGoalsModal: false });
  };

  createMetricTable = () => {
    const metrics = {
      user_id: localStorage.getItem("user_id"),
      quick_apply: this.state.quick_apply,
      intentional_apply: this.state.intentional_apply,
      info_interview: this.state.info_interview,
      white_boarding_minutes: this.state.white_boarding_minutes,
      portfolio_minutes: this.state.portfolio_minutes,
    };
    axios.post("http://localhost:3000/api/metric_tables/", metrics).then((res) => {
      console.log(res);
    });
  };

  render() {
    // const {newJobs} = this.state.newJobs
    return (
      <div>
        <h1>I am the dashboard</h1>
        <div className="center margin">
          <h2 className="center margin padding">Your Daily Job Hunting Goals:</h2>
          <div className="user-goals padding">
            {Object.values(this.state.userGoals).map((goal, index) => (
              <p key={index}>
                {this.state.userGoalTitles[index]} {goal}
              </p>
            ))}
            <div className="center margin">
              <button onClick={this.showGoalsModal}>Edit Job Hunting Goals</button>
              {this.state.showGoalsModal ? (
                <GoalSet
                  updateUserGoals={this.updateUserGoals}
                  history={this.props.history}
                  closeModal={this.closeGoalsModal}
                  closeGoalsModal={this.closeGoalsModal}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="metric-zone">
          <button onClick={this.createMetricTable}>Create Metrics</button>
          {Object.values(this.state.userGoals).map((goal, index) => (
            <span className="hidden" key={index}>
              <span className="bold">{this.state.userGoalTitles[index]}</span>
              <Metric goal={goal} metrics={Object.values(this.state.metrics)[index]} />
            </span>
          ))}
        </div>
        <hr />
        <div className="center margin">
          <button onClick={this.showModal}>Add a Job</button>
          {this.state.showModal ? <JobCreate handleAddJob={this.handleAddJob} closeModal={this.closeModal} /> : null}
        </div>
        <div className="job-zone">
          {this.state.statuses.map((status, index) => {
            return (
              <div className="job-board" key={index}>
                {/* <JobBoard jobData={this.jobStatusFilter()} /> */}
                <h2>{status}</h2>
                <JobBoard
                  jobData={this.jobDataFilter({ status })}
                  deleteJob={this.handleDestroyJob}
                  updateJob={this.handleUpdateJob}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
