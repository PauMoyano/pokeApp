const server = require('express').Router();
const { Pokemon , Tipo} = require('../db.js');
const axios = require('axios');
const { request, response } = require('express');

server.get('/', async (req, res, next) => {
    try {
        let typesApi=[];
        
    const poke = await axios.get(`https://pokeapi.co/api/v2/type`)
    .then(types => {
        typesApi=types.data.results;
      })

      typesApi.forEach(element=>{
        Tipo.findOrCreate({
        where: { name: element.name }
      })
      })

      const result = await Tipo.findAll();

      return res.json(result)
    } catch (error) {
      next(error);
    }
  });

module.exports = server;