import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PokeCard from './PokeCard';
import Pagination from './pagination';
import { getPokemons, getPokemonName } from '../../actions/pokemonsActions';
import {getTypes} from '../../actions/typesActions';
import './home.css'

function Home() {
    //-------------------REDUX-----------------------
    const dispatch = useDispatch();

    const pokemons = useSelector((state) => state.pokemons);
    useEffect (()  => {
        dispatch(getPokemons())
      },[]);

    const types = useSelector((state) => state.types);
    useEffect(() => {
      dispatch(getTypes())
      }, []);

    const pokemon = useSelector((state) => state.pokemons.pokemon);
    //--------------------REACT-----------------------

    const [ totalPokemons, setTotalPokemons ] = useState([]);
    const [ filterPokemons, setfilterPokemons ] = useState({});
    const [ filtrado, setfiltrado ] = useState(false);
    
    useEffect(() => {
      console.log("POKEMONS",pokemons.pokemons)
      if (pokemons.pokemons) {
        setTotalPokemons(pokemons.pokemons)
      }
      
    },[pokemons.pokemons])
   
    const [ totalTypes, setTotalTypes ] = useState([]);

    useEffect(() => {
      if (types.types) {
        console.log("TYPES", types.types)
      setTotalTypes(types.types)
      }
    }, [types.types])

    const [ pokeName, setPokeName ] = useState('');

    //----------------filtro x name ------------------
  const handleInputChange = (e) => {
    const value = e.target.value
    setPokeName(value)
  }

  const searchName = async ()  =>{
    
    if(!pokeName){
      setfiltrado(false)
    } else {
      dispatch(getPokemonName(pokeName))
      setfilterPokemons(pokemons.pokemon)
      setfiltrado(true)
    }
    
  }
  const allPokemons = async (e)  =>{ 
    
    setTotalPokemons(pokemons.pokemons)
    setfiltrado(false)
  }

    //---------------Pagination---------------------
 const [ currentPage, setCurrentPage ] = useState(1); // pagina mostrando actualmente
 const [ pokePerPage ] = useState(6); // cant de prod por pag
 


const indexOfLastPoke = currentPage * pokePerPage;  // índice primer prod de la pag
const indexOfFirstPoke = indexOfLastPoke - pokePerPage; // índice último prod de la pag

//---Change Page----
const paginate = (pageNumbers) => setCurrentPage(pageNumbers)

//---------------------ORDENAMIENTOS------------------------
const orderNameCre =()=>{
  const orderNames =[...totalPokemons].sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
  setTotalPokemons(orderNames)
}
const orderNameDecre =()=>{
  
  const orderNames =[...totalPokemons].sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0))
  setTotalPokemons(orderNames)
}
const orderForceCre = ()=>{
   const orderHp= [...totalPokemons].sort((a, b) => a.hp - b.hp)
  setTotalPokemons(orderHp)
 }

 const orderForceDecre = ()=>{
  const orderHp= [...totalPokemons].sort((a, b) => b.hp - a.hp)
  setTotalPokemons(orderHp)
}

//------------------FILTRO POR TIPOS--------------

const handleChange = (e) => {
  e.preventDefault()
  const value = e.target.value;
  const pokeFiltrados = pokemons.pokemons.filter(pokemon=> pokemon.id < 13)
  const pokeFiltradosTypes = pokeFiltrados.filter(pokemon=> pokemon.types.find(type=> type.type.name === value))
 
  if(value==="types"){
    setTotalPokemons(pokemons.pokemons)
  } else
  {if(!pokeFiltradosTypes){
    setTotalPokemons([])
  } else{
    setTotalPokemons(pokeFiltradosTypes)
  }}

}

const oldPokemons = () =>{
  const pokeFiltrados = pokemons.pokemons.filter(pokemon=> pokemon.id < 13)
  if (pokeFiltrados) {
    setTotalPokemons(pokeFiltrados)
  }

}

const myPokemons = () =>{

  const pokeFiltrados = pokemons.pokemons.filter(pokemon=> pokemon.id > 12)

  if (pokeFiltrados) {
    setTotalPokemons(pokeFiltrados)
  }else {
    setTotalPokemons([])
  }
}
    return (
        <div>
          <div>
        <div className="containerHome">
            <input className="inputHome" type="text" 
                   name="name" 
                   id=""
                   value={pokeName}
                   onChange={handleInputChange}/>
            <button className="btnSearch" onClick={searchName}>Search</button>
            <Link to={`/addPokemon`} className="linkNew">
            <button className="btnNew" >NEW</button>
            </Link>
        </div>
        <div>
        <button className="btnHome" onClick={allPokemons}>ALL</button>
        <select className="btnHomeR" onChange={handleChange}>
              <option className="btnHomeR" value="types">Types</option>
              {totalTypes.length>0?(
                totalTypes &&
                totalTypes.map((type,i) => (
                  <option className="btnHomeR" key ={i} value={type.name}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</option>
                ))
              ):(
                <div></div>
                )}
            </select>
        </div>
        </div>
        <div className="boxCardPagination">
        <div className="containCards">
        {filtrado?
                  <PokeCard
                  name={pokemons.pokemon.name}
                  image={pokemons.pokemon.image}
                  id={pokemons.pokemon.id}
                  />
                : totalPokemons.length>0?(
                totalPokemons &&
                totalPokemons.slice(indexOfFirstPoke, indexOfLastPoke).map((pokemon,i) => (
                  <PokeCard
                  name={pokemon.name}
                  image={pokemon.image}
                  type={pokemon.types}
                  id={pokemon.id}
                  key={i}
                  />
                ))
              ):(
                <div></div>
                )}
            
        </div>
        <Pagination pokePerPage={pokePerPage} totalPoke={totalPokemons && totalPokemons.length} paginate={paginate} />
        </div>
        <div>
            <button className="btnHome" onClick={orderNameCre}>Order names up</button>
            <button className="btnHomeR" onClick={orderNameDecre}>Order names down</button>
            <button className="btnHome" onClick={orderForceCre}>Order force up</button>
            <button className="btnHomeR" onClick={orderForceDecre}>Order force down</button>
            
            
            <button className="btnHome" onClick={myPokemons}>New</button>
            
            <button className="btnHomeR" onClick={oldPokemons}>Old</button>
        </div>

        </div>
    )
}

export default Home