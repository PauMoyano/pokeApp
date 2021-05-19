import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {pokemonsReducer} from './reducer/pokemonReducer';
import {typesReducer} from './reducer/typesReducer'
const reducer = combineReducers({
  pokemons:pokemonsReducer,
  types:typesReducer
})

const middleware = [reduxThunk];

const initialState = {}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;