import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Search from '../UI/Search'
import './Welcome.css';

let Welcome = (props) => {
    return (
        <Router>
        <div className="welcome-wrapper">
            <h1 className="heading">Welcome to the <b>Pokedex.</b></h1>
            <div>
                <p className="intro">The comprehensive database of Pokemon from the original Blue and Red version.</p>
                <p className="description">Find your favourite and check out their stats</p>
                <Switch>
                    <Route exact path="/" component={Search} />
                </Switch>
            </div>
            
            
        </div>
        </Router>
    );
}

export default Welcome;