import React, {Component} from "react";

class JobBoard extends Component {
  constructor(props) {
    super(props);     
    this.state = {
      currentJob: {},
    }

}  

  setCurrentJob = (job) => {
    // const currentJob = this.state.currentJob;
    this.setState({currentJob: job});
    console.log(job);
    console.log(this.state.currentJob);
  }

    render() {    

  return (
    <div>
      {this.props.jobData.map((job, index) => (
        <div key={index}>
          <p>{job.company_name}</p>
          <button onClick={() => this.setCurrentJob(job)}>Job Info</button>
          {/* <a href="#" onClick={this.setState({currentJob: job})}>{job.company_name}</a> */}
        </div>
      ))}
    </div>
  );
};
};
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
