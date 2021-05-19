import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {createdPokemon} from '../../actions/pokemonsActions';
import { getPokemons, getPokemonName } from '../../actions/pokemonsActions';
import './addPokemon.css'
import {getTypes} from '../../actions/typesActions';


function AddPokemon() {
    
    const dispatch = useDispatch();

    const types = useSelector((state) => state.types);
    useEffect(() => {
      dispatch(getTypes())
      }, []);

    const pokemonNew = useSelector((state) => state.pokemons);
    console.log("Hola--------",pokemonNew)
    
    const initPokemon = {
        name: "",
        vida: 0,
        hp: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight:0,
        image:""
    };
    const [pokemon, setPokemon] = useState(initPokemon)

    const [ totalTypes, setTotalTypes ] = useState([]);
    const [ selectTypes, setSelectTypes ] = useState([]);

    useEffect(() => {
      if (types.types) {
        console.log("TYPES", types.types)
      setTotalTypes(types.types)
      }
    }, [types.types])

     // Form validation
     const { register, errors, watch, handleSubmit } = useForm();
     const onSubmit = data => console.log(data);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPokemon({ ...pokemon, [name]: value })
    }
    
    const handleChange = (e)=>{
        console.log("AQUI ESTOY")
        e.preventDefault()
        const value = e.target.value;
        if(!selectTypes){
            setSelectTypes(value)
        } else {
            const result = selectTypes.find(type => type ===  value)
            if(!result){setSelectTypes([...selectTypes, value])}
        }
        
        console.log("TYPES HANDLE",selectTypes)
    }
    console.log("TYPES Fuera",selectTypes)
    
    const deleteType = (dato) => {
        setSelectTypes(selectTypes.filter(type => type!== dato))
    }

    const addPokemonDB = (e) => {
        e.preventDefault();

        const pokemonSend = {
            name: pokemon.name,
            vida: pokemon.vida,
            hp: pokemon.hp,
            defense: pokemon.defense,
            speed: pokemon.speed,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemon.image
        }

        if(!pokemon.name){
            return alert("You need a name!!!")
        }else{
            dispatch(createdPokemon(pokemonSend));
            console.log("pokemon creado",pokemonNew.pokemonNew)
            alert("You create a new pokemon!!!")
            return <Redirect to="/Home" />
        }
        
        
    }

    return ( 
        <>
        <div onSubmit={handleSubmit(onSubmit)}>
          <div className="FormContainer">
              <span className="titAdd">Add Pokemon</span>

             <form className="formBox" onSubmit={addPokemonDB}>
                <div className="Box"><div className="divLabel"><label for="name">Name: </label></div> 
                        <div className="divInput"><input
                             type="text"
                             id="name"
                             name="name"
                             placeholder="Name"
                             value={pokemon.name}
                             onChange={handleInputChange}
                             ref={watch({ required: true, max: 10 })}/>
                             <span>{errors.name && "Name is required"}</span></div> 
                </div>
                <div className="Box"><div className="divLabel"><label for="vida">Vida:</label></div> 
                        <div className="divInput"><input
                             id="vida"
                             name="vida"
                             type="number"
                             placeholder="0"
                             value={pokemon.vida}
                             onChange={handleInputChange}/></div> 
                </div>
                <div className="Box"><div className="divLabel"><label for="hp">Hp:</label></div> 
                        <div className="divInput"><input
                             id="hp"
                             name="hp"
                             type="number"
                             placeholder="0"
                             value={pokemon.hp}
                             onChange={handleInputChange}/></div>
                </div>
                <div className="Box"><div className="divLabel"><label for="hp">Defense:</label></div>
                        <div className="divInput"><input
                             id="defense"
                             name="defense"
                             type="number"
                             placeholder="0"
                             value={pokemon.defense}
                             onChange={handleInputChange}/></div>
                </div>
                <div className="Box"><div className="divLabel"><label for="hp">Speed:</label></div>
                        <div className="divInput"><input
                             id="speed"
                             name="speed"
                             type="number"
                             placeholder="0"
                             value={pokemon.speed}
                             onChange={handleInputChange}/></div> 
                </div>
                <div className="Box"><div className="divLabel"><label for="hp">Height:</label></div>
                        <div className="divInput"><input
                             id="height"
                             name="height"
                             type="number"
                             placeholder="0"
                             value={pokemon.height}
                             onChange={handleInputChange}/></div>
                </div>
                <div className="Box"><div className="divLabel"><label for="hp">Weight:</label></div> 
                        <div className="divInput"><input
                             id="weight"
                             name="weight"
                             type="number"
                             placeholder="0"
                             value={pokemon.weight}
                             onChange={handleInputChange}/></div>
                </div>
                <div className="Box"><div className="divLabel"><label for="hp">Select types:</label></div>
                  <div className="divInput"><select className="selectType" onChange={handleChange}>
                     <option className="selectType" value="types">Types</option>
                           {totalTypes.length>0?(
                                       totalTypes &&
                                       totalTypes.map((type,i) => (
                         <option className="selectType" key ={i} value={type.name}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</option>
                        ))
                        ):(
                            <div></div>
                        )}
                   </select>
                  </div>
                </div>
                <div className="Box"><div className="divLabel"><label for="hp">Types selected:</label></div>
                  <div className="divInput">{selectTypes.length>0?(
                                       selectTypes &&
                                       selectTypes.map((type,i) => (
                         <button onClick={() =>deleteType(type)} className="TypeSelected" key ={i} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)} X</button>
                        ))
                        ):(
                            <div></div>
                        )}
                  </div>
                </div>
                <div>
                      <button className="btnAdd" >Add Pokemon</button>
                </div>
        </form>
        </div>
    </div>
        </>
    )
}

export default AddPokemon