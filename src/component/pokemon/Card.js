import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {colours} from '../../assets/coloursData';
import '../../Styles/Card.css';



class Card extends Component {
    state = {
        name: "",
        imageUrl: "",
        pokemonIndex: "",
        types: [],
        abilities: [],
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

       
        this.setState({ name, imageUrl, pokemonIndex, types, abilities, hp, attack, defense, specialAttack, specialDefense, speed})
    }
    render() {
        
       
        
        return (
            <Link to={`pokemon/${this.state.pokemonIndex}`}>
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
                            <h2 className="pokemon-name"> {this.state.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() +  letter.substring(1)).join(' ')} </h2>
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
                            
                            <p className="abilities">Abilities: {this.state.abilities} </p>
                            
                        </div>
                        <div className="stats-wrapper">
                            <div className="stat-container">  
                                {this.state.hp} 
                                <div>HP</div>
                            </div>
                            <div className="stat-container">
                                {this.state.attack}
                                <div>Attack</div>
                            </div>         
                            <div className="stat-container">
                                {this.state.defense}
                                <div>Defense</div>
                            </div>
                            <div className="stat-container">
                                {this.state.specialAttack}
                                <div>S. Attack</div>
                            </div>
                            <div className="stat-container">
                                {this.state.specialDefense}
                                <div>S. Defense</div>
                            </div>
                            <div className="stat-container">
                                {this.state.speed}
                                <div>Speed</div>
                            </div>  
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default Card;