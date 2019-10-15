import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import IdCard from './pages/IdCard';
import NotFound from './pages/NotFound';
import RouteLayout from './layout/RouteLayout';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <RouteLayout exact path="/" component={Home} />
            <RouteLayout exact path="/:niplama" component={IdCard} />
            <Route component={NotFound} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
