import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pokemon from './pokemon.png'
import pokebola from './Pokebola.png'
import './LandingPage.css'
import { Link } from "react-router-dom";
import { getPokemons } from '../../actions/pokemonsActions';
import {getTypes} from '../../actions/typesActions';



function LandingPage () {
    //-------------------REDUX-----------------------
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemons);
    useEffect(() => {
        dispatch(getPokemons())
        
      }, []);
      const types = useSelector((state) => state.types);
    useEffect(() => {
        dispatch(getTypes())
      }, []);
      
    return (
        <div className="container">
            <img className="pokemon" src={pokemon} alt=""/>
            
            < Link to={`/Home`} className="btnPokebola">
            <button className="btnPokebola">
                <span className="clickHere">Click Here!</span>
                <img className="pokebola" src={pokebola} alt=""/>
            </button>
            </Link>
        </div>

    )
}

export default LandingPage