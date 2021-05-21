import React, { Component } from 'react';


class Modal extends Component {
    state = {
      showModal: false // set initial state to false
    }

  render() {
    return <div className="modal">
      <div className="modal-content"> Modal Content 
      <button onClick={ this.props.closeModal }> Close Modal </button>
    </div>
    </div>
  }
}
export default Modal;