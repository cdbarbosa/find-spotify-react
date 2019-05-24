import React, { Component } from 'react';
import Home from './pages/home/Home.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Home></Home>
        </header>
      </div>
    )
  }
}

export default App;
