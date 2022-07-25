const apikey = '48c774e1'

// este código me lo dieron hecho
export function addMovieFavorite(payload) {
    return { type: "ADD_MOVIE_FAVORITE", payload }; // el reducer hace algo dependiendo del type
  }
  
  export function getMovies(titulo) {
    return function(dispatch) {
      return fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${titulo}`) // hace un llamado a la api, sería un request del tipo get. (El servidor me esta prometiendo que me va a devolver algo)
        .then(response => response.json()) //(cuando me responda, con el .then yo voy a capturar la respuesta) (esta linea garra el .json y lo convierte a javascript)
        .then(json => {
          dispatch({ type: "GET_MOVIES", payload: json }); // la accion asincronica retorna una funcion, automaticamente redux le permite a la funcion despachar la accion. Estoy yendo a buscar informacion y una vez que la obtengo, despacho una accion con un tipo y con esa informacion la voy a buscar. Esto es automatico lo hace redux.
        });
    };
  }

export function removeMovieFavorite(id){
    return { // returna una accion o sea un objeto
        type: 'REMOVE_MOVIE_FAVORITE',
        payload: id
    }
}

export function getMovieDetail(idMovie){
    return function(dispatch){
        fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${idMovie}`) // el fetch es para buscar informacion en el servidor
        .then(response => response.json()) // a la respuesta la convierto a javascript utilizando el metodo json
        .then(data => { // cuando lo convierte, lo voy a capturar y voy a despachar una accion, con la informacion extra que va a ser el objeto con detalle de pelicula que ya lo obtuve de la api y lo converti a javascript
            dispatch({type: 'GET_MOVIE_DETAIL', payload: data})
        })
    }
}