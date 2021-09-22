 import React, {Component} from 'react';
 import PokemonList from './component/pokemon/PokemonList';
 import Search from './component/UI/Search';
 import Welcome from './component/pokemon/Welcome';
 import Intro from './component/pokemon/Intro';
 import './App.css';

 class App extends Component {
   render () {
     return(
       <div className="App">
         <Welcome/>
         <Intro/>
         <Search/>
         <PokemonList></PokemonList>
         <PokemonList></PokemonList>
       </div>
     )
   }
 }
 export default App;

// import Axios from 'axios';
// import Card from './component/Card';
// //import Pokedex from './component/Pokedex';
// import Search from './component/Search';
// import './App.css';
// import axios from 'axios';

// const App = () => {
  
//   const [pokemonData, setPokemonData] = useState([]);
//   const [pokemonType, setPokemonType] = useState("");

  
  
//   return (
//     <div className="App">
//       <Search />
//       <Card/>
      
//     </div>
//   );
// }

// export default App;
