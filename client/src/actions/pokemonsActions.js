import axios from "axios";


import {GET_POKEMONS, GET_POKEMONS_ERROR,
        GET_POKEMON_NAME, GET_POKEMON_NAME_ERROR,
        GET_POKEMON_ID, GET_POKEMON_ID_ERROR,
        CREATED_POKEMON,CREATED_POKEMON_ERROR} from '../constants/pokemonConstants'

const url = "http://localhost:3001/";

export const getPokemons = () => async (dispatch) => {
    try{
        const { data } = await axios.get(`${url}pokemons`)

    dispatch({
        type: GET_POKEMONS,
        payload: data,
    })
    
    } catch(error) {
        dispatch({
            type: GET_POKEMONS_ERROR,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
};

export const getPokemonName = (name) => async (dispatch) => {
    try{

        const { data } = await axios.get(`${url}pokemons?name="${name}"`)

    dispatch({
        type: GET_POKEMON_NAME,
        payload: data,
    })
    
    } catch(error) {
        dispatch({
            type: GET_POKEMON_NAME_ERROR,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
};
export const getPokemonId = (id) => async (dispatch) => {
    try{

        const { data } = await axios.get(`${url}pokemons/${id}`)
        console.log("Hola soy data en actions", data)

    dispatch({
        type: GET_POKEMON_ID,
        payload: data,
    })
    
    } catch(error) {
        dispatch({
            type: GET_POKEMON_ID_ERROR,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
};

export const createdPokemon = (pokemon) => async (dispatch) => {
    try{

        const { data } = await axios.post(`${url}pokemons`,pokemon)
        console.log("Hola soy data en actions", data)

    dispatch({
        type: CREATED_POKEMON,
        payload: data,
    })
    
    } catch(error) {
        dispatch({
            type: CREATED_POKEMON_ERROR,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
};