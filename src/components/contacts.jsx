import axios from "axios";
import React, { Component } from "react";
import ContactShow from "./contactShow";
// import axios from "axios";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filtered: [],
      currentContact: {},
    };
    this.indexContacts();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let currentList = [];
    let newList = this.state.contacts;

    if (e.target.value !== "") {
      currentList = Object.values(this.state.contacts);

      newList = currentList.filter((contact) => {
        // console.log(contact.name.toLowerCase())
        // console.log(contact.toLowerCase());
        const nameLC = contact.name.toLowerCase();
        const jobLC = contact.job.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return nameLC.includes(filter) || jobLC.includes(filter);
      });
      // } else if (e.target.value === "") {
      //   newList = Object.values(this.state.contacts);
      // }
    } else {
      newList = Object.values(this.state.contacts);
      // return newList;
    }
    this.setState({ filtered: newList });
  }

  indexContacts = () => {
    axios.get("http://localhost:3000/api/users/" + localStorage.getItem("user_id")).then((res) => {
      this.setState({ contacts: res.data.contacts });
      this.setState({ filtered: res.data.contacts });
      console.log(res.data);
    });
  };

  showContactModal = () => {
    this.setState({ showContactModal: true });
  };

  closeContactModal = () => {
    this.setState({ showContactModal: false });
  };

  setCurrentContact = (contact) => {
    this.setState({ currentContact: contact });
    console.log(contact);
  };

  updateContactInfo = (contact) => {
    console.log("contact was updated");
    console.log(contact);
  };

  render() {
    return (
      <div>
        <h1> My Contacts:</h1>
        <div>
          <input type="text" placeholder="...Search" onChange={this.handleChange} />
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Company</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(this.state.filtered).map((contact, index) => (
                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.job_title} </td>
                  <td>{contact.job}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.setCurrentContact(contact);
                        this.showContactModal();
                      }}
                    >
                      ...
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {this.state.showContactModal ? (
          <ContactShow
            closeContactModal={this.closeContactModal}
            contact={this.state.currentContact}
            updateContactInfo={this.updateContactInfo}
          />
        ) : null}
      </div>
    );
  }
}

export default Contacts;
