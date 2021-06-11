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
      searchBar: "...Search"
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
  resetFilter = () => {
    this.setState({ filtered: this.state.contacts });
    this.setState({searchBar: "...Search"})

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
    // let updatedContact = null;
    axios.patch("http://localhost:3000/api/contacts/" + contact.id, contact).then((res) => {
      console.log(res.data);
      // this.state.contacts.splice(this.state.contacts.indexOf(contact.id));
      const contactIndex = this.state.contacts.findIndex((o) => o.id === res.data.id);
      this.removeContactFromState(contactIndex);
      this.addContact(contact);
      this.resetFilter();

    });
  };

  removeContactFromState(contactIndex) {
    this.setState({ contacts: this.state.contacts.filter((_, i) => i !== contactIndex) });
    this.setState({ filtered: this.state.filtered.filter((_, i) => i !== contactIndex) });
  }

  addContact = (contact) => {
    this.setState(prevState => ({ contacts: [contact, ...prevState.contacts] }));
    this.setState(prevState => ({ filtered: [contact, ...prevState.filtered] }));
    // this.resetFilter()
    console.log(this.state.contacts);
  };

  render() {

    return (
      <div>
        <h1> My Contacts:</h1>
        <div>
          <input type="text" placeholder={this.state.searchBar} onChange={this.handleChange} />
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
