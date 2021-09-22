import React, {Component} from 'react';
import axios from 'axios';
import './Search.css';
import {Link} from 'react-router-dom';
import SearchButton from './SearchButton';
import {colours} from '../../assets/coloursData';


class Search extends Component {
    state = {
        pokemon: "",
        display: false,
    }
    
    render() {
        
        const getPokemon = async () => {
            
            try {
            const url = `https://pokeapi.co/api/v2/pokemon/${this.state.pokemon}`
            const res = await axios.get(url)
            
            
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
            
            
            <form onSubmit= {handleSubmit} className="input-container">
                <label>
                    <input type="text" placeholder="Search Pokemon" onChange={handleChange} />
                </label>
                <Link to={`pokemon/${this.state.pokemon}`}>
                    <SearchButton></SearchButton>
                </Link>
            </form>
            
            
            
            )
    }
        
}
export default Search;
