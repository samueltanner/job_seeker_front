import React, { Component, useState } from "react";
import JobShow from "./jobShow";
import { Button, Modal } from "react-bootstrap";

class JobBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJob: {},
      showModal: false,
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
      console.log(job);
    });
  };

 triggerSave() {
   this.handleSave();
 }

  render() {
  

    return (
      <div>
        {this.props.jobData.map((job, index) => (
          <div key={index} className="center margin">
            <Button variant="light" onClick={this.showModal}>
              {job.company_name} - {job.position}
            </Button>
            {this.state.showModal ? <JobShow job={job} deleteJob={this.props.deleteJob} updateJob={this.props.updateJob} closeModal={this.closeModal}/> : null}
          </div>
        ))}
        <div>
   
     

        </div>
      </div>
    );
  }
}
export default JobBoard;


