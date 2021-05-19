import axios from "axios";

import {GET_TYPES, GET_TYPES_ERROR} from '../constants/typesConstants';

const url = "http://localhost:3001/";

export const getTypes = () => async (dispatch) => {
    try{

        const { data } = await axios.get(`${url}types`)
        console.log("Hola soy data en actions", data)

    dispatch({
        type: GET_TYPES,
        payload: data,
    })
    
    } catch(error) {
        dispatch({
            type: GET_TYPES_ERROR,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
};