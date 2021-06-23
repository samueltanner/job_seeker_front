import React, { Component, useState } from "react";
import JobShow from "./jobShow";
import { Button, Modal } from "react-bootstrap";

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
    this.setState({ currentJob: job }, function () {
      // console.log(job);
    });
  };

 triggerSave() {
   this.handleSave();
 }

  render() {
    function JobModel(props) {
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      return (
        <>
          <Button variant="light" onClick={handleShow}>
            <h6>
              {props.job.company_name} - {props.job.position}
            </h6>
          </Button>

          <Modal show={show} backdrop={false} onHide={handleClose} centered>
            <Modal.Header>
              <Modal.Title>{props.job.company_name} - {props.job.position}</Modal.Title>
            <Button variant="light" onClick={handleClose}>
                X
              </Button>
            </Modal.Header>
            <Modal.Body>
              <JobShow job={props.job} deleteJob={props.deleteJob} updateJob={props.updateJob} />
            </Modal.Body>
          </Modal>
        </>
      );
    }

    return (
      <div>
        {this.props.jobData.map((job, index) => (
          <div key={index} className="center margin">
            <JobModel job={job} deleteJob={this.props.deleteJob} updateJob={this.props.updateJob}/>
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
