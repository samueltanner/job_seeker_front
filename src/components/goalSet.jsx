import React, { Component } from "react";
import axios from "axios";

class GoalSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_goals: {
        apply: 0,
        info_interview: 0,
        white_boarding_minutes: 0,
        portfolio_minutes: 0,     
        breaks: 0
      },
    };
  }

  // handleChange = (event) => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: parseInt(value),
  //   });
  // };

  handleChange = (event) => {
    this.setState({[event.target.name]:parseInt(event.target.value)});
  };

  saveGoals = () => {
    const userGoals = {
      apply: this.state.apply,
      info_interview: this.state.info_interview,
      white_boarding_minutes: this.state.white_boarding_minutes,
      portfolio_minutes: this.state.portfolio_minutes,
      breaks: this.state.breaks,
    };
    let currentUserId = localStorage.getItem("user_id");
    axios.patch("http://localhost:3000/api/users/" + currentUserId, userGoals).then((res) => {
      console.log(res.data);
      this.props.closeModal();
      this.props.history.push("/dashboard");
    });
      if (this.props.updateUserGoals) {
        this.props.updateUserGoals();
      }
  };

  modalClose = () => {
    if (this.props.closeModal) {
      this.props.closeModal();
    } else {
      this.props.closeGoalsModal();
    }
    
  }



  render() { 
    return ( <div className="modal">
    <div className="modal-content">
      <h1 className="center">Set your daily job-hunting goals</h1>
      <form className="job-create-form" id="form" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <label className="column" htmlFor="apply">
                Submitted Applications:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="apply"
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="info_interview">
                Informational Interviews:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="info_interview"
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="white_boarding_minutes">
                White Boarding (in minutes):
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="white_boarding_minutes"
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="portfolio_minutes">
                Portfolio Building (in minutes):
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="portfolio_minutes"
              />
            </div>
            <div className="row">
              <label className="column" htmlFor="breaks">
                Breaks From Computer:
              </label>
              <input
                className="column"
                onChange={this.handleChange}
                type="text"
                name="breaks"
              />
            </div>
            <br />
            <div className="center">
              <button onClick={this.saveGoals}>Save Changes</button>

              <button type="button" onClick={this.modalClose}>
                Close
              </button>
            </div>
            <div>
              {/* <ul className="text-danger">
            {this.state.errors.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul> */}
            </div>
          </form>
    </div>
  </div> );
  }
}
 
export default GoalSet;