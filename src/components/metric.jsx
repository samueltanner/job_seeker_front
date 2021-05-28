import React, { Component } from 'react';

class Metric extends Component {
  state = { 
    quick_apply: 0,
    intentional_apply: 0,
    info_interview: 0,
    white_boarding_minutes: 0,
    portfolio_minutes: 0,
   }
  render() { 
    return ( <div>
      {this.props.metrics}/{this.props.goal}
    </div> );
  }
}
 
export default Metric;