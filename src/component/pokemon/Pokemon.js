import React, { Component } from 'react';
import Axios from 'axios';
import {colours} from '../../assets/coloursData';
import Pokedex from '../../assets/images/Pokedex.svg';
import './Pokemon.css';

class Pokemon extends Component {
    state = {
        name: "",
        imageUrl: "",
        pokemonIndex: "",
        imageLoading: true,
        tooManyRequests: false,
        types: [],
        evs: '',
        abilities: [],
        description: "",
        hatchSteps: '',
        catchRate: '',
        eggGroups: '',
    }
    async componentDidMount() {
        const {pokemonIndex} = this.props.match.params;
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
        const pokemonResponse = await Axios.get(pokemonUrl);
        const imageUrl = pokemonResponse.data.sprites.front_default;
        const name = pokemonResponse.data.name;
        //get pokemon types

        const types = pokemonResponse.data.types.map(type => type.type.name)

        //get pokemon abilities

        const abilities = pokemonResponse.data.abilities.map(ability => {
            return ability.ability.name.toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
        }).join(', ')
        
        //get evs
        const evs = pokemonResponse.data.stats.filter(stat => {
            if(stat.effort > 0) {
                return true;
            } else {
                return false;
            }
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`.toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
            }).join(', ')
        
        this.setState({name, imageUrl, evs, abilities, types,})

        //get pokemon description, catchRate, eggGroups, hatchSteps
        let description = '';
        await Axios.get(pokemonSpeciesUrl).then(res => {
            
            res.data.flavor_text_entries.some(flavor => {
                
              if (flavor.language.name === 'en') {
                description = flavor.flavor_text;
                return;
              }
            });
           
           const catchRate = Math.round((100/255) * res.data["capture_rate"])
           const eggGroups = res.data['egg_groups'].map(group => {
               return group.name.toLowerCase()
               .split('-')
               .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
           }).join(', ')
           const hatchSteps = 255 * (res.data['hatch_counter'] + 1)
           this.setState({description, catchRate, eggGroups, hatchSteps});
        });
}
     
    render() {
        return (
            <div className="pokemon-page">
                
                <img src={Pokedex} className="pokedex-logo" />
                <div className="pokemon-wrapper">
                <img src={this.state.imageUrl} />
                <h2>{this.state.name}</h2>
                <div className="info-container">

                
                <div className="type-wrapper">
                                
                    {this.state.types.map(type => (
                        <h4
                            key={type}
                            className="types"
                            style={{
                                backgroundColor: `#${colours[type]}`,
                                color: 'white'
                            }}
                            > 
                            {type
                                .toLowerCase()
                                    .split('-')
                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join('')}
                        </h4>
                    ))}
                                
                </div>
                <div>
                    <p>Abilities: {this.state.abilities} </p>
                </div>
                <div>
                    <p>Egg Groups: {this.state.eggGroups} </p>
                    <p>Hatch Steps: {this.state.hatchSteps} </p>
                </div>
                <div>
                <p className="catch-rate">Catch Rate: {this.state.catchRate}% </p>
                </div>
                <p>Description: {this.state.description} </p>
                </div>
                </div>
            </div>
        );
    }
}

export default Pokemon;