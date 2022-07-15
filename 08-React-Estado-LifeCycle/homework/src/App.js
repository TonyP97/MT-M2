import React,{ useState } from 'react';
import './App.css';
import Nav from './components/Nav.jsx';
import Cards from './components/Cards.jsx';

export default function App() {
  const [cities, setCities] = useState([]);

  // function onSearch(ciudad) {
  //   //Acá habría que hacer el llamado a la API para obtener los datos de la ciudad
  //   //pero de momento agregaremos una ciudad por default para ver que funcione
  //   console.log(ciudad)
  //   const ciudadEjemplo = {
  //     min: 32,
  //     max: 35,
  //     img: "03n",
  //     id: 2172797,
  //     wind: 3.6,
  //     temp: 300.15,
  //     name: "Cairns",
  //     weather: "Clouds",
  //     clouds: 40,
  //     latitud: -16.92,
  //     longitud: 145.77
  //   };
  //   setCities(oldCities => [...oldCities, ciudadEjemplo]);
  // }

  const apiKey = '4ae2636d8dfbdc3044bede63951a019b'

  function onSearch(ciudad) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`) // es un get
      .then(r => r.json()) // convierto la respuesta en objeto javascript
      .then((recurso) => {
        if(recurso.main !== undefined){
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          setCities(oldCities => [...oldCities, ciudad]);
        } else {
          alert("Ciudad no encontrada");
        }
      });

    }

    function onClose(id) {
      setCities(oldCities => oldCities.filter(c => c.id != id));
    }

  return (
    <div className="App">
      <Nav onSearch={onSearch}/>
      <Cards cities = {cities} onClose = {onClose} />
    </div>
  );
}
