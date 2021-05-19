import {GET_POKEMONS, GET_POKEMONS_ERROR, 
        GET_POKEMON_NAME, GET_POKEMON_NAME_ERROR,
        GET_POKEMON_ID, GET_POKEMON_ID_ERROR,
        CREATED_POKEMON,CREATED_POKEMON_ERROR} from '../constants/pokemonConstants'

export const pokemonsReducer = (
    state = {
      pokemon: {},
      pokemonId:{},
      pokemons: {},
      pokemonsPrev:{},
      pokemonsNew:{},
      pokemonNew:{},
      error:{}
    }, action) => {
    switch (action.type) {
      case GET_POKEMONS:
          const totalPokemons= action.payload.api.concat(action.payload.new)   
          //
        return { ...state, pokemons:totalPokemons,pokemonsPrev:action.payload.api,pokemonsNew:action.payload.new};
      case GET_POKEMONS_ERROR:
        return { ...state, error: action.payload };
      case GET_POKEMON_NAME:
        return { ...state, pokemon:action.payload};
      case GET_POKEMON_NAME_ERROR:
        return { ...state, error: action.payload };
      case GET_POKEMON_ID:
        return { ...state, pokemonId:action.payload};
      case GET_POKEMON_ID_ERROR:
        return { ...state, error: action.payload };
      case CREATED_POKEMON:
        return { ...state, pokemonNew:action.payload};
      case CREATED_POKEMON_ERROR:
        return { ...state, error: action.payload };

      default:
          return state
    }
  }
  