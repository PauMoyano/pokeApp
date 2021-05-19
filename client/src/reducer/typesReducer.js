import {GET_TYPES, GET_TYPES_ERROR} from '../constants/typesConstants';

export const typesReducer = (
    state = {
      types: {},
      error:{}
    }, action) => {
    switch (action.type) {
      case GET_TYPES:
        return { ...state, types:action.payload};
      case GET_TYPES_ERROR:
        return { ...state, error: action.payload };
        default:
          return state
    }
  }