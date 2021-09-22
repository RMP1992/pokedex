import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import pokemonLogo from '../../assets/images/pokemon-logo.svg';
import './PokemonList.css';
class PokemonList extends Component {
    
    state = {
        randomNum: '',
        url: "https://pokeapi.co/api/v2/pokemon/?offset=101",
        randomUrl: "",
        pokemon: null,
        
    };
    
    async componentDidMount() {
        
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
            <div className="logo-container">
                <img src={pokemonLogo} />
            </div>
            </React.Fragment>
        );
    }
}

export default PokemonList;