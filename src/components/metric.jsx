import React, { Component } from 'react';

class Metric extends Component {

   state = {
 
      quick_apply: this.props.metrics,
      intentional_apply: this.props.metrics,
      info_interview: this.props.metrics,
      white_boarding_minutes: this.props.metrics,
      portfolio_minutes: this.props.metrics,
    
   }

  handleMetricIncrement = () => {
    console.log(this.props.metrics)
    // this.setState(this.state.quick_apply += 1) 
  }

  render() { 
    return ( <div>
      <div className="center margin">
      <button  className="margin">-</button> {this.props.metrics}/{this.props.goal} <button onClick={this.handleMetricIncrement} className="margin">+</button>
    </div>
    </div> );
  }
}
 
export default Metric;