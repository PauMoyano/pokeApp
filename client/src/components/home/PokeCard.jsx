import React from 'react';
import './pokeCard.css';
import { Link } from "react-router-dom";



function PokeCard(props) {
    
    const capitalized = props.name.charAt(0).toUpperCase() + props.name.slice(1)

    return ( 
        <>
        <Link to={`/pokemons/pokemon/${props.id}`} className="linkCard">
        <button className="card">
            <img src={props.image} alt="" /> 
            <span className="nameCard">{capitalized}</span>
            <span>{props.type && props.type.map((type)=>(
                <span>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)} </span>
    ))}</span>
        </button>
        </Link>
        </>
    )
}

export default PokeCard