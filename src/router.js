import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App.js';
import Detail from './pages/Details/Details.js'

function Routing() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/details/:id" component={Detail} />
      </div>
    </Router>
  )
}

export default Routing;
