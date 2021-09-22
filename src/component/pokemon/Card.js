import React, { Component } from 'react';
import Axios from 'axios';
import './Card.css';

const colours = {
    bug: '9CAA18',
    dark: '503C2D',
    dragon: '6657BA',
    electric: 'FAC02E',
    fairy: 'EDA9ED',
    fighting: '843E26',
    fire: 'E2400F',
    flying: 'A2AFEF',
    ghost: '13133B',
    grass: '6EC032',
    ground: 'D3B057',
    ice: '81DCF7',
    normal: 'C4BFB4',
    poison: '944794',
    psychic: 'EB457C',
    rock: 'B29D51',
    steel: 'B3B3C2',
    water: '399AF7',
};
class Card extends Component {
    state = {
        name: "",
        imageUrl: "",
        pokemonIndex: "",
        imageLoading: true,
        tooManyRequests: false,
        types: [],
        abilities: [],
        description: "",
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
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
        const pokemonResponse = await Axios.get(pokemonUrl)
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

        const types = pokemonResponse.data.types.map(type => type.type.name)
        
        
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
        let description = '';
        await Axios.get(pokemonSpeciesUrl).then(res => {
            
            res.data.flavor_text_entries.some(flavor => {
                
              if (flavor.language.name === 'en') {
                description = flavor.flavor_text;
                return;
              }
            });
            
        });
        this.setState({description, name, imageUrl, pokemonIndex, types, abilities, hp, attack, defense, specialAttack, specialDefense, speed})
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
                <div className="pokemon-copy-wrapper">
                    <div className="pokemon-intro">
                        <h3 className="pokemon-name"> {this.state.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() +  letter.substring(1)).join(' ')} </h3>
                        <div className="type-wrapper">
                            {this.state.types.map(type => (
                                <p
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
                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                                </p>
                            ))}
                            
                        </div>
                        
                        <p className="abilities">Abilities: {this.state.abilities} </p>
                        <p className="description">Description: {this.state.description} </p>
                    </div>
                    <div className="stats-wrapper">
                        <div className="hp-stat-wrapper progress">
                            <p>HP</p>
                            <div className="stat-container">  
                            <div className="stats hp" style={{backgroundColor: '#3cfb01', width: `${this.state.hp}`}} > {this.state.hp} 
                            </div>
                            </div>
                        </div>   
                        <div className="attack-stat-wrapper progress">
                            <p>Attack</p>
                            <div className="stat-container">
                            <div className="stats attack" style={{backgroundColor: '#fb0140', width: `${this.state.attack}`}} > {this.state.attack} 
                            </div>
                            </div>
                        </div>          
                        <div className="defense-stat-wrapper progress">
                            <p>Defense</p>
                            <div className="stat-container">
                            <div className="stats defense" style={{backgroundColor: '#1705e1', width: `${this.state.defense}`}} > {this.state.defense} 
                            </div>
                            </div>
                        </div> 
                        <div className="special_attack-stat-wrapper progress">
                            <p>S Attack</p>
                            <div className="stat-container">
                            <div className="stats special-attack" style={{backgroundColor: '#03f0ea', width: `${this.state.specialAttack}`}} > {this.state.specialAttack} 
                            </div>
                            </div>
                        </div> 
                        <div className="special_defense-stat-wrapper progress">
                            <p>S Defense</p>
                            <div className="stat-container">
                            <div className="stats special-defense" style={{backgroundColor: '#f0b603', width: `${this.state.specialDefense}`}} >  {this.state.specialDefense}
                            </div>
                            
                            </div>
                        </div> 
                        <div className="speed-stat-wrapper progress">
                            <p>Speed</p>
                            <div className="stat-container">
                            <div className="stats speed" style={{backgroundColor: '#f0039e', width: `${this.state.speed}`}} > {this.state.speed} 
                            </div>
                            </div>
                        </div> 
                        
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;