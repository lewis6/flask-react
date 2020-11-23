import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import About from "./About/About";
import Contact from "./Contact/Contact";
import Products from "./Product/Products";
import Home from "./Home/Home";
import history from './history';

function Routes(){
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Appointment" component={About} />
                </Switch>
            </Router>
        )
}

export default Routes;