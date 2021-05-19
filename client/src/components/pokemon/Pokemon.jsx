import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getPokemonId} from '../../actions/pokemonsActions';
import './pokemon.css';


function Pokemon(props) {
    const id = props.id;
    const dispatch = useDispatch();
    const pokemonId = useSelector((state) => state.pokemons.pokemonId);
    useEffect(() => {
        dispatch(getPokemonId(id))
      }, []);
    
    console.log("Esto es pokemon id", pokemonId)

    const name = pokemonId.name && pokemonId.name.charAt(0).toUpperCase() + pokemonId.name.slice(1)

    return ( 
        <>
        <div className="BoxContain">
        <div className="containerPoke"> 
              <span className="name">{name}</span> 
              <div className="containerImg"><img className="imgPoke" src={pokemonId.image} alt="" /></div>  
              <span className="typesPoke">{pokemonId.types && pokemonId.types.map((type)=>(
                <span >{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)} </span>
    ))}</span>
        </div>
        <div className="divDatos">
        <div className="idPoke"><span >Id: {pokemonId.id}</span></div>
        <div><span>{pokemonId.stats&&pokemonId.stats.map((stat)=>(<p className="statsPoke">{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)} : {stat.base_stat}</p>))}</span></div>
        <div  className="heiW"><span>Height: {pokemonId.height}</span> <span>Weight: {pokemonId.weight}</span></div>
        </div>
        </div>
        </>
    )
}

export default Pokemon