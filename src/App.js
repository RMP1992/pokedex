 import React, {Component, Fragment} from 'react';
 import {HashRouter as Router, Route, Switch} from 'react-router-dom';
 import PokemonList from './component/pokemon/PokemonList';
 import Search from './component/UI/Search';
 import Welcome from './component/pokemon/Welcome';
 import Pokemon from './component/pokemon/Pokemon';
 import './App.css';
 


 class App extends Component {
   render () {
     return(
       <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" render={props =>
              <Fragment>
                <Welcome/>
                
                <PokemonList/>
              </Fragment>
            } />
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            
          </Switch>
        </div>
       </Router>
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
