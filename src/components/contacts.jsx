import axios from "axios";
import React, { Component } from "react";
// import axios from "axios";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filtered: [],
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
  render() {
    return (
      <div>
        <h1> My Contacts:</h1>
        <div>
          <input type="text" placeholder="...Search" onChange={this.handleChange} />
        </div>
        <div>
          {Object.values(this.state.filtered).map((contact, index) => (
            <div key={index}>
              <ul>
                <li>
                  {contact.name} {contact.job_title} {contact.job}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Contacts;
