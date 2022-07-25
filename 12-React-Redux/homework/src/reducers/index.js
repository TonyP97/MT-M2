const initialState = {
    moviesFavourites: [],
    moviesLoaded: [],
    movieDetail: {}
  };

  function rootReducer(state = initialState, action) {
    if (action.type === "ADD_MOVIE_FAVORITE") {
        return {
          ...state,
          moviesFavourites: state.moviesFavourites.concat(action.payload)
          // moviesFavourites: [...state.moviesFavourites, action.payload]
        }
    }
    if (action.type === "GET_MOVIES") {
        return {
          ...state,
          moviesLoaded: action.payload.Search
        };
    }

    
    if(action.type === 'REMOVE_MOVIE_FAVORITE'){
        return{
            ...state,
            moviesFavourites: state.moviesFavourites.filter(n => n.id !== action.payload) // filtra, saca alguna peli, dejo pasar todas las que su id sea distinto del que me vino en el payoad de la accion. Estamos dejando pasar todas menos la de la peli que quiero borrar
        }
    }


    if(action.type === 'GET_MOVIE_DETAIL'){
        return{
            ...state,
            movieDetail: action.payload
        }
    }

    return state;
  }
  
  export default rootReducer;