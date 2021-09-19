import React, { Component } from 'react';
import axios from 'axios';
import './Card.css';


class Card extends Component {
    state = {
        name: "",
        imageUrl: "",
        pokemonIndex: "",
        imageLoading: true,
        tooManyRequests: false,
        types: [],
        abilities: [],
        description: '',
        evs: '',
        stats: {
            hp: "",
            attack: "",
            defense: "",
            specialAttack: "",
            specialDefense: "",
            speed: "",
        }
    }
    async componentDidMount() {
        const {url} = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        //const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
        const pokemonResponse = await axios.get(pokemonUrl)
        const imageUrl = pokemonResponse.data.sprites.front_default;
        const name = pokemonResponse.data.name;

        //get pokemon stats

        let {hp, attack, defense, specialAttack, specialDefense, speed } = '';
        pokemonResponse.data.stats.map(stat => {
            switch(stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat']
                    break;
                case 'attack':
                    attack = stat['base_stat']
                    break;
                case 'defense':
                    defense = stat['base_stat']
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat']
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat']
                    break;
                case 'speed':
                    speed = stat['base_stat']
                    break;
            }
        });
        //get pokemon types

        const types = pokemonResponse.data.types.map(type => type.type.name.toLowerCase()
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')).join(', ')
        
        //get pokemon evolutions

        const evs = pokemonResponse.data.stats.filter(stat => {
            if (stat.effort > 0) {return true;}
            return false
        }).map(stat =>{
            return `${stat.effort} ${stat.stat.name}`
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        }).join(', ');

        //get pokemon abilities

        const abilities = pokemonResponse.data.abilities.map(ability => {
            return ability.ability.name.toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
        }).join(', ')

        //get pokemon description
        await axios.get(pokemonSpeciesUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if(flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            })
        })
        this.setState({name, imageUrl, pokemonIndex, types, abilities, evs, hp, attack, defense, specialAttack, specialDefense, speed})
    }
    render() {
        
       
        
        return (
            <div className="card" >
                <div className="image-wrapper">
                    <img 
                        src= {this.state.imageUrl} 
                        alt={this.state.name} 
                        onLoad={() => this.setState({imageLoading: false})} 
                        onError={() => this.setState({tooManyRequests: true})}
                        className="pokemon-img"
                    />
                </div>
                
                <div className="pokemon-intro">
                    <h3 className="pokemon-name"> {this.state.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() +  letter.substring(1)).join(' ')} </h3>
                    <p className="type">Type: {this.state.types} </p>
                    <p className="abilities">Abilities: {this.state.abilities} </p>
                </div>
                <div className="stats-wrapper">
                    <span className="hp">HP: {this.state.hp} </span>
                    <span className="attack">Attack: {this.state.attack} </span>
                    <span className="defense">Defense: {this.state.defense} </span>
                    <span className="special-attack">Special attack: {this.state.specialAttack} </span>
                    <span className="special-defense">Special defense: {this.state.specialDefense} </span>
                    <span className="speed">Speed: {this.state.speed} </span>
                </div>
                
            </div>
        );
    }
}

export default Card;