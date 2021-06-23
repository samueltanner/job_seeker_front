import React, { Component } from 'react';

class WhiteBoardingCounter extends Component {

    constructor(props) {
      super();
      this.state = { time: {}, seconds: (props.values * 60) };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countUp = this.countUp.bind(this);
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
    }

    startTimer() {
      if (this.timer >= 0 && this.state.seconds >= 0) {
        this.timer = setInterval(this.countUp, 1000);
      }
    }

    countUp() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds + 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      this.onTrigger(this.state.time.m, this.state.time.s);
    }

    onTrigger = (minute, second) => {
      this.props.increment(this.props.keys,this.props.values, minute, second);
      // event.preventDefault();
    };
  
    freezeIt(timer) {
      clearInterval(timer);
    }

    render() {
      return(
        <div>
          <span className="row">
          <p className="text-center bold margin">White-Boarding Time Tracker</p>
          <div className="metric-zone">
          <button onClick={this.startTimer}>Start</button>
          <button onClick={() => this.freezeIt(this.timer)}>Stop</button>
          </div>
          </span>
          <div className="row text-center">{this.state.time.h} : {this.state.time.m} : {this.state.time.s}</div>
        </div>
      );
    }
  }
 
export default WhiteBoardingCounter;