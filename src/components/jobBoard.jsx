import React, { Component } from "react";
import JobShow from "./jobShow";

class JobBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJob: {},
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  setCurrentJob = (job) => {
    // let currentJob = this.state.currentJob;
    // const currentJob = this.state.currentJob;

    this.setState({ currentJob: job }, function () {
      // this.consoleLogJob();
    });
    // console.log(job);
    // console.log(this.state.currentJob);
  };

  // consoleLogJob = () => {
  //   let currentJob = this.state.currentJob;
  //   console.log(currentJob);
  // };

  
  render() {
    return (
      <div>
        {this.props.jobData.map((job, index) => (
          <div key={index} className="center margin">
            <button className="button-as-link" onClick={() => {this.setCurrentJob(job); this.showModal()}}>
              {job.company_name}
            </button>
            {this.state.showModal ?  <JobShow deleteJob={this.props.deleteJob} closeModal={this.closeModal} job={this.state.currentJob} updateJob={this.props.updateJob}/> : null}
            <p className="muted">{job.position}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default JobBoard;

// class JobBoard extends Component {
//   state = {
//     jobs: this.props.jobData,
//   };
//   render() {
//     return (
//       <div>
//         {this.state.jobs.map((job, index) => {
//           return <p key={index}>{job.id}</p>;
//         })}
//       </div>
//     );
//   }
// }

// const JobBoard = (props) => {
//   console.log("here are your props")
//   console.log(props.jobData)
//   return (
//     <div>Job Board</div>
//   )
// }

// export default JobBoard;
