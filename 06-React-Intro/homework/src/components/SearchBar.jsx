import React from 'react';

export default function SearchBar(props) {
  // acá va tu código
  return (
  <div>
    <input type="text" placeholder='City...'/>
    <button onClick = {() => props.onSearch("Buscando...")}>Add</button> 
     {/* Arrow function que me devuelva la ejecucion de la funccion  */}
  </div>
  )
};