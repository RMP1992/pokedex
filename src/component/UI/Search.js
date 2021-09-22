import React, {Component} from 'react';
import axios from 'axios';
import './Search.css';
import SearchButton from './SearchButton';
import {colours} from '../../assets/coloursData';


class Search extends Component {
    state = {
        name: "",
        coloursData: [colours],
        imageUrl: "",
        pokemon: "",
        types: [],
        abilities: [],
        stats: {
            hp: "",
            attack: "",
            defense: "",
            specialAttack: "",
            specialDefense: "",
            speed: "",
        },
        display: false,
    }
    
    render() {
        
        const getPokemon = async () => {
            
            try {
            const url = `https://pokeapi.co/api/v2/pokemon/${this.state.pokemon}`
            const res = await axios.get(url)
            const name = res.data.name;
            const imageUrl = res.data.sprites.front_default;
            const types = res.data.types.map(type => type.type.name)
            const abilities = res.data.abilities.map(ability => {
                return ability.ability.name.toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
            }).join(', ');
            let {hp, attack, defense, specialAttack, specialDefense, speed } = '';
            res.data.stats.map(stat => {
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
            this.setState({name, imageUrl, types, abilities, hp, attack, defense, specialAttack, specialDefense, speed})
            this.setState({display: true})
            } catch (error) {
            console.log(error)
            }
            }
        
        const handleSubmit = (e) => {
            e.preventDefault()
            getPokemon()
        }
        const handleChange = (e) => {
            this.setState({pokemon: e.target.value})
            
        }
        return(
            <React.Fragment>
            <form onSubmit= {handleSubmit}>
                <label>
                    <input type="text" placeholder="Search Pokemon" onChange={handleChange} />
                </label>
                <SearchButton></SearchButton>
            </form>
            {this.state.display ? 
                (
                    <div className="card" >
                        <div className="image-wrapper">
                            <img 
                                src= {this.state.imageUrl} 
                                alt={this.state.name} 
                                className="pokemon-img bottom"
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
                                <span className="hp">HP: {this.state.hp} </span>
                                <span className="attack">Attack: {this.state.attack} </span>
                                <span className="defense">Defense: {this.state.defense} </span>
                                <span className="special-attack">Special attack: {this.state.specialAttack} </span>
                                <span className="special-defense">Special defense: {this.state.specialDefense} </span>
                                <span className="speed">Speed: {this.state.speed} </span>
                            </div>
                        </div>
                    </div>
                
                ) : (null)}
            
            </React.Fragment>
            
            )
    }
        
}
export default Search;
