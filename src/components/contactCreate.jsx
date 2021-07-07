import React, { Component } from "react";
import {Button} from "react-bootstrap"

class ContactCreate extends Component {
  state = {};
  render() {
    return (
      <div className="modal-custom">
        <div className="modal-content">
        <Button className="close-modal-button" variant="light" onClick={this.props.closeAddContactModal}>
            X
          </Button>
          <div>
            <h5>Add A Contact</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactCreate;
