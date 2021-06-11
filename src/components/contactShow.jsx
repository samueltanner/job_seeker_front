import React, { Component } from "react";

class ContactShow extends Component {
  constructor(props) {
    super(props);
    // this.showCurrentContact()
  }
  // showCurrentContact = () => {
  //   console.log(this.props.contact)
  // }

  state = {};
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <form className="job-create-form" id="form" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <label className="column" htmlFor="name">
                Contact Name:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="name"
                defaultValue={this.props.contact.name}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="job">
                Company:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="job"
                defaultValue={this.props.contact.job}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="job_title">
                Title/Position:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="job_title"
                defaultValue={this.props.contact.job_title}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="email">
                Email:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="email"
                defaultValue={this.props.contact.email}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="phone">
                Phone:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="phone"
                defaultValue={this.props.contact.phone}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="linkedin_url">
                LinkedIn:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="linkedin_url"
                defaultValue={this.props.contact.linkedin_url}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="date_contacted">
                Date Last Contacted:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="date_contacted"
                defaultValue={this.props.contact.date_contacted}
              />
            </div>
            <br />
            <div className="center">
              <button onClick={() => {this.props.updateContactInfo(this.props.contact)}}>Save Changes</button>

              <button type="button" onClick={this.props.closeContactModal}>
                Close
              </button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ContactShow;
