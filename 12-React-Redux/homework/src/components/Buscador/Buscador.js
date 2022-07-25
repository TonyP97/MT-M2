import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Buscador.css';
import { addMovieFavorite, getMovies } from "../../actions";



export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  handleChange(event) { // cambia la propiedad title dle estado con la propiedad que estan escribiendo
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    // despacho la accion, esta busca en la api el titulo
    this.props.getMovies(this.state.title)
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <h2>Buscador</h2>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title">Película: </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
        <ul>
         {/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */}
         {this.props.movies?.map(m =>
          <div key={m.imdbID}>
            <Link to={`/movie/${m.imdbID}`}>
              <li>{m.title}</li>
            </Link>
            <button onClick={()=> this.props.addMovieFavorite({title: m.Title, id: m.imdbID})}>
              FAV
            </button>
          </div>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded // ACA VOY GUARDANDO LAS PELIS Q BUSCO POR TITULO. Toma el estado de redux
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: movie => dispatch(addMovieFavorite(movie)),
    getMovies: title => dispatch(getMovies(title))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buscador);
