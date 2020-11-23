import React from 'react';
import Appointment from './components/Appointment';
import Home from './components/Home';
import AddDcotor from './components/AddDoctor';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/appointment" component={Appointment}/>
          <Route path="/adddoctor" component={AddDcotor}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;