import React from "react";

const JobBoard = ({ jobData, jobStatus }) => {
  return (
    <div>
      {jobData.map((job, index) => (
        <div key={index}>
          <p>{job.company_name}</p>
          <p>{job.status}</p>
        </div>
      ))}
    </div>
  );
};

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

export default JobBoard;
