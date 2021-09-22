import React from 'react';
import './Welcome.css';

let Welcome = (props) => {
    return (
        //this is a dumb component so I felt like using a functional component
        <div className="welcome-wrapper">
            <h1 className="heading">Welcome to the <b>Pokedex.</b></h1>
            <p className="intro">The comprehensive database of Pokemon from the original Blue and Red version.</p>
            <p className="description">Find your favourite and check out their stats</p>
        </div>
    );
}

export default Welcome;