import React from 'react';
import estilos from './SearchBar.module.css';

export default function SearchBar(props) {
  // acá va tu código
  return (
    <div className= {estilos.contenedor}>
      <input type="text" placeholder='City...'/>
      <button onClick = {() => props.onSearch("Buscando...")} className = {estilos.btn}>Add</button> 
       {/* Arrow function que me devuelva la ejecucion de la funccion  */}
    </div>
    )
};