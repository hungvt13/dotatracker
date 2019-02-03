import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Landing from './Landing/Landing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar name="Dota Tracker"/>
        <Landing/>
      </div>
    );
  }
}

export default App;
