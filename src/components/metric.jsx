import React, { Component } from 'react';

class Metric extends Component {
   
  render() { 
    return ( <div>
      <div className="center margin">
    {this.props.metrics}/{this.props.goal} <button className="margin">+</button>
    </div>
    </div> );
  }
}
 
export default Metric;