const server = require('express').Router();
const { Pokemon , Tipo} = require('../db.js');
const axios = require('axios');
const { request, response } = require('express');
const { Op } = require("sequelize");



server.get('/', async(req, res, next) => {
  try {
   const pokemons=[];
   const promises=[];
   const name = req.query.name;
    if(!name){
      for (let i= 1; i < 13; i++) {
        const promise = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        promises.push(promise)
    }
    const promesesAll = await Promise.all(promises).then(function(values) {
      values.forEach(poke=>{
        const pokemon ={id:poke.data.id,
          name:poke.data.name,
          image:poke.data.sprites.front_default,
          types:poke.data.types,
          hp:poke.data.stats[0].base_stat}
        const result = pokemons.push(pokemon)
        
      })
     
    });
     pokemons.forEach(pokemon=>{
      Pokemon.findOrCreate({
        where: { name: pokemon.name, image:pokemon.image}  
    })
     })
    const PokeCreados = await Pokemon.findAll({
          where: {id:{[Op.gt]: 12}} 
    });

    return res.json({api: pokemons,new: PokeCreados});

    }else{
      const dato = name.replace(/['"]+/g, '')
      try {
        const pokeCreado= await Pokemon.findOne({
          where: {name:dato,id:{[Op.gt]: 12}},
        })
        if(pokeCreado===null){
          const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${dato}`)
          console.log("Estoy en pokeapi")
          console.log("Esto es poke.data",poke.data)
          const pokemon ={id:poke.data.id,
            name:poke.data.name,
            image:poke.data.sprites.front_default,
            types:poke.data.types,
            hp:poke.data.stats[0].base_stat}
          return res.json(pokemon)
        }else{
          return res.json(pokeCreado)
        }
        
      } catch (error) {
        
        return res.send("Pokemon doesn't exist")
      }

    } 
   
  } catch (error) {
      return res.send("Pokemon doesn't exist")
  }

 });

  

  server.get('/:id',(req, res, next) => {
      
    try {
        const {id} = req.params
     if(id<13){ const poke =  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(poke => {
         const pokemon ={id:id,
                         name:poke.data.name,
                         image:poke.data.sprites.front_default,
                         types:poke.data.types,
                         stats:poke.data.stats,
                         height:poke.data.height,
                         weight:poke.data.weight}
        //console.log(pokemon)
         return res.status(200).json(pokemon);
       })}else{
         const pokemon = Pokemon.findOne({
          where: {id:id} 
       });
       return res.status(200).json(pokemon);
       }
    } catch (error) {
        return res.send(error)
    }
     
   });
   
//-----------------CREAR POKEMON----------------------

   server.post('/', async (req, res, next) => {
    try {
      const result = await Pokemon.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  });

  module.exports = server;