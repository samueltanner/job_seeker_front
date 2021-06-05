import React, { Component } from 'react';

class Metric extends Component {

   state = {
 
      quick_apply: this.props.value,
      intentional_apply: this.props.value,
      info_interview: this.props.value,
      white_boarding_minutes: this.props.value,
      portfolio_minutes: this.props.value,
    
   }

  render() { 
    return ( <div>
      <div className="center margin">
      <button  onClick={() => {this.props.decrement(this.props.keys,this.props.values)}} className="margin">-</button> {this.props.values}/{this.props.goal} <button onClick={() => {this.props.increment(this.props.keys,this.props.values)}} className="margin">+</button>
    </div>
    </div> );
  }
}
 
export default Metric;