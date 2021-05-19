import React from 'react';
import './pagination.css';


const Pagination = ({ pokePerPage, totalPoke, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPoke / pokePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
   


    <div className="containerpag">
      
        {pageNumbers.map(number => (
          <button className="btnPag" key={number} >
            
            <a 
            onClick={(e) => {e.preventDefault(); paginate(number)}} className='page-link'>
              {number}
            </a>

          </button>
        ))}
      
    </div>

  );
  
};

export default Pagination;