import axios from "axios";
import React, { Component } from "react";
import ContactShow from "./contactShow";
// import axios from 'axios';

class JobShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.job.id,
      company_name: this.props.job.company_name,
      position: this.props.job.position,
      salary: this.props.job.salary,
      posting_url: this.props.job.posting_url,
      notes: this.props.job.notes,
      status: this.props.job.status,
      description: this.props.job.description,
      contacts: [],
      currentContact: {},
    };
    this.getJobContacts();
  }

  showCurrentJob = () => {
    // console.log(this.props.job);
  };
  onTrigger = (job, job_id) => {
    this.props.updateJob(job, job_id);
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSave = (event) => {
    const job = {
      id: this.state.id,
      company_name: this.state.company_name,
      position: this.state.position,
      salary: this.state.salary,
      posting_url: this.state.posting_url,
      notes: this.state.notes,
      status: this.state.status,
      description: this.state.description,
    };
    // console.log(this.props.job.id);
    axios.patch("http://localhost:3000/api/jobs/" + this.state.id, job).then((res) => {
      // console.log(res.data);
      // console.log(this.props.job.id)
      // this.props.setState.job(job)
      // this.props.updateCurrentJob(job)
      this.props.closeModal();
      this.onTrigger(job, job.id);
    });
  };

  getJobContacts = () => {
    axios.get("http://localhost:3000/api/jobs/" + this.state.id).then((res) => {
      if (res.data.contacts.length === 0) {
      } else {
        this.setState({ contacts: res.data.contacts });
      }
      console.log(res.data.contacts);
    });
  };

  setCurrentContact = (contact) => {
    this.setState({ currentContact: contact });
    console.log(contact);
  };

  showContactModal = () => {
    this.setState({ showContactModal: true });
  };

  closeContactModal = () => {
    this.setState({ showContactModal: false });
  };

  updateContactInfo = (contact) => {
    // let updatedContact = null;
    axios.patch("http://localhost:3000/api/contacts/" + contact.id, contact).then((res) => {
      console.log(res.data);
      // this.state.contacts.splice(this.state.contacts.indexOf(contact.id));
      const contactIndex = this.state.contacts.findIndex((o) => o.id === res.data.id);
      this.removeContactFromState(contactIndex);
      this.addContact(contact);


    });
  };

  removeContactFromState(contactIndex) {
    this.setState({ contacts: this.state.contacts.filter((_, i) => i !== contactIndex) });
  }

  addContact = (contact) => {
    this.setState(prevState => ({ contacts: [contact, ...prevState.contacts] }));
    // this.resetFilter()
    console.log(this.state.contacts);
  };
  render() {
    // var contactList = this.state.contacts.map((contact) => <div>{contact.name}</div>);

    return (
      <div className="modal">
        <div className="modal-content">
          <form className="job-create-form" id="form" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <label className="column" htmlFor="company_name">
                Company Name:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="company_name"
                defaultValue={this.props.job.company_name}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="position">
                Position:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="position"
                defaultValue={this.props.job.position}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="description">
                Description:
              </label>
              <textarea
                className="column"
                onChange={this.handleChange}
                type="text"
                name="description"
                defaultValue={this.props.job.description}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="salary">
                Salary:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="number"
                name="salary"
                defaultValue={this.props.job.salary}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="posting_url">
                Posting URL:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="posting_url"
                defaultValue={this.props.job.posting_url}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="notes">
                Notes:
              </label>
              <textarea
                className="column"
                type="text"
                name="notes"
                defaultValue={this.props.job.notes}
                onChange={this.handleChange}
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="status">
                Status:
              </label>
              <select
                className="column"
                name="status"
                defaultValue={this.props.job.status}
                onChange={this.handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Saved">Saved</option>
                <option value="Draft">Draft</option>
                <option value="In Contact">In Contact</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Denied">Denied</option>
              </select>
            </div>
            <div>
              <div className="row">
                <div className="column">
                  <label htmlFor="column">Contacts:</label>
                </div>
                <div className="column">
                  {/* {contactList} */}
                  {Object.values(this.state.contacts).map((contact, index) => {
                    return (
                      <div key={index}>
                        <button
                          onClick={() => {
                            this.setCurrentContact(contact);
                            this.showContactModal();
                          }}
                        >
                          {contact.name} - {contact.job_title}
                        </button>
                      </div>
                    );
                  })}
                  {/* <p>CONTACT LIST</p> */}
                </div>
              </div>
            </div>
            <br />
            <div className="center">
              <button onClick={this.handleSave}>Save Changes</button>

              <button type="button" onClick={this.props.closeModal}>
                Close
              </button>

              <button
                onClick={() => {
                  this.props.deleteJob(this.state.id);
                  this.props.closeModal();
                }}
              >
                Delete Job
              </button>
              {/* <button onClick={this.onTrigger}>TRIGGERED</button> */}
              {/* <ul className="text-danger">
            {this.state.errors.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul> */}
            </div>
          </form>
        </div>

        {this.state.showContactModal ? (
          <ContactShow
            closeContactModal={this.closeContactModal}
            contact={this.state.currentContact}
            updateContactInfo={this.updateContactInfo}
          />
        ) : null}
        {/* <ContactShowInJob
            closeContactModalViaJobShow={this.closeContactModalViaJobShow}
            contact={this.state.currentContact}
            updateContactInfo={this.updateContactInfo}
          /> */}
      </div>
    );
  }
}

export default JobShow;