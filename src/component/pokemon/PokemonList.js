import React, { Component, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import './PokemonList.css';
class PokemonList extends Component {
    state = {
        randomNum: '',
        url: "https://pokeapi.co/api/v2/pokemon-species?offset=100&limit=3",
        pokemon: null,
        
    };
    
    async componentDidMount() {
        /*let getRandomInt = (min, max) => {
            min = Math.ceil();
            max = Math.floor();
            let randomNum = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
            this.setState({randomNum})
          }
        getRandomInt(1, 778)*/
        const res = await axios.get(this.state.url)
        this.setState({pokemon: res.data['results']})
    }
    render() {
        
        return (
            <React.Fragment>
            {this.state.pokemon ? (<div className="pokemon-list">
                {this.state.pokemon.map((pokemon, idx) => (
                    <Card 
                        name={pokemon.name} 
                        url={pokemon.url}
                        key={pokemon.name}
                    />
                ))}
            </div>) : (<h2>Loading Pokemon</h2>)}
            </React.Fragment>
        );
    }
}

export default PokemonList;