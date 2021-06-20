import React, { Component } from "react";
import axios from "axios";
import Metric from "./metric";
import JobBoard from "./jobBoard";
import JobCreate from "./jobCreate";
import GoalSet from "./goalSet";
import BreakCounter from "./breakCounter";
// import Modal from "./modal";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      statuses: ["Saved", "Draft", "Applied", "In Contact", "Interviewing", "Offered", "Denied"],
      userGoals: {},
      userGoalTitles: [
        "Submitted Applications:",
        "Informational Interview:",
        "White-boarding (minutes):",
        "Portfolio (minutes):",
        "Breaks From Computer:",
      ],
      showGoalsModal: false,
      showLogoutModal: false,
      metrics: {
        apply: 0,
        info_interview: 0,
        white_boarding_minutes: 0,
        portfolio_minutes: 0,
        breaks: 0,
      },
      mssg: "",

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
      // console.log(response.data.user_goals);
      // console.log(this.state.jobs);
    });
  };

  getUserMetrics = () => {
    axios.get("http://localhost:3000/api/metric_tables/day/" + localStorage.getItem("user_id")).then((response) => {
      if (response.data.length === 0) {
      } else {
        var oldId = response.data[0].id;
        console.log(response.data[0].id);

        var apply = [];
        var breaks = [];
        var info_interview = [];
        var white_boarding_minutes = [];
        var portfolio_minutes = [];
       response.data.forEach((instance) => {
            apply.push(instance.apply);
            info_interview.push(instance.info_interview);
            white_boarding_minutes.push(instance.white_boarding_minutes);
            portfolio_minutes.push(instance.portfolio_minutes);
            breaks.push(instance.breaks);
          });
          for (var apply_counter = 0, breaks_counter = 0, info_interview_counter = 0, white_boarding_minutes_counter = 0, portfolio_minutes_counter = 0, index = 0; index < apply.length; index ++  ) {
            apply_counter += apply[index];
            info_interview_counter += info_interview[index];
            white_boarding_minutes_counter += white_boarding_minutes[index];
            portfolio_minutes_counter += portfolio_minutes[index];
            breaks_counter += breaks[index];
          }
            // console.log(apply);
            // console.log(apply_counter);
            // console.log(breaks);
            // console.log(info_interview);
            // console.log(white_boarding_minutes);
            // console.log(portfolio_minutes);

            this.setState({ metrics: {
              apply: apply_counter,
              info_interview: info_interview_counter,
              white_boarding_minutes: white_boarding_minutes_counter,
              portfolio_minutes: portfolio_minutes_counter,
              breaks: breaks_counter,
            } 
          });
          if (response.data.length === 2) {
          axios.delete("http://localhost:3000/api/metric_tables/" +  oldId).then(console.log("deleted old metric and set state of new metric successfully"))
          }
        }
      });
  };


  handleAddJob = (job) => {
    this.setState((state) => ({ jobs: [...state.jobs, job] }));
    console.log(job.status);
    if (job.status === "Applied") {
      this.handleMetricIncrement(Object.keys(this.state.metrics)[0], 0);
    }
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

  handleMetricIncrement = (key, value) => {
    // console.log(key);
    // console.log(value);
    this.setState(prevState => {
      let metrics = Object.assign({}, prevState.metrics);
      metrics[key] += 1;
      return {metrics};
    }, function() {
      // console.log(this.state.metrics);
      this.updateMetrics();
  })
  };

  handleMetricDecrement = (key, value) => {
    // console.log(key);
    // console.log(value);
    this.setState(prevState => {
      let metrics = Object.assign({}, prevState.metrics);
      metrics[key] -= 1;
      return {metrics};
    }, function() {
      console.log(this.state.metrics);
      this.updateMetrics();
  })
  };

  updateMetrics = () => {
    var params = {
      apply: this.state.metrics.apply,
      info_interview: this.state.metrics.info_interview,
      white_boarding_minutes: this.state.metrics.white_boarding_minutes,
      portfolio_minutes: this.state.metrics.portfolio_minutes,
      breaks: this.state.metrics.breaks,
    }
    axios.patch("http://localhost:3000/api/metric_tables/" + localStorage.getItem("metric_row_id"), params).then((response) => {
    console.log(response);
  })
  }

  render() {
    console.log("render() method");

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
            <BreakCounter keys={Object.keys(this.state.metrics)[4]} values={Object.values(this.state.metrics)[4]} increment={this.handleMetricIncrement}/>
        </div>
        <div className="metric-zone">
          {Object.values(this.state.userGoals).map((goal, index) => (
            <span className="hidden" key={index}>
              <span className="bold">{this.state.userGoalTitles[index]}</span>
              <Metric
                keys={Object.keys(this.state.metrics)[index]}
                values={Object.values(this.state.metrics)[index]}
                increment={this.handleMetricIncrement}
                decrement={this.handleMetricDecrement}
                goal={goal}
                metrics={(this.state.metrics)[index]}
              />
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
        {/* <div>{this.state.showLogoutModal ? <Modal getUserMetrics={this.getUserMetrics}/> : null} */}
{/* </div> */}
      </div>
    );
  }
}

export default Dashboard;
