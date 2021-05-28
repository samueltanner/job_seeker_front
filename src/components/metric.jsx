import React, { Component } from 'react';

class Metric extends Component {
   
  render() { 
    return ( <div>
    {this.props.metrics}/{this.props.goal} <button>+</button>
    </div> );
  }
}
 
export default Metric;