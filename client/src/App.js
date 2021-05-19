import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import LandingPage from './components/firstPage/LandingPage.jsx';
import Pokemon from './components/pokemon/Pokemon';
import AddPokemon from './components/addPokemon/Addpokemon';


function App() {
  return (
    <>
    <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} /> 
          <Route exact path="/Home" component={Home} />
          <Route
            exact
            path="/pokemons/pokemon/:id"
            render={({ match }) => <Pokemon id={match.params.id} />}
          />
          <Route exact path="/addPokemon" component={AddPokemon} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
