import React from 'react';
import './App.css';
import {Switch, Route } from "react-router-dom";
import Navigation from './components/navigation'
import Home from './components/home'

const App = () => (
  <div className="app">
    <Navigation />
    <Main />
  </div>
);

const Main = () => (
  <Switch>
    {/* <Route exact path="/"></Route> */}
    <Route exact path="/" component={Home}></Route>
    {/* <Route exact path="/about" component={About}></Route>
    <Route exact path="/contact" component={Contact}></Route>
    <Route exact path="/projects" component={Projects}></Route> */}
  </Switch>
);
export default App;
