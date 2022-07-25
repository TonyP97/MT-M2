const { createStore } = require('redux');
const contador = require('./reducer');
const { incremento, decremento } = require('./actions');

// En esta linea creamos nuestro store. Pasandole como parametro nuestro Reducer
var store = createStore(contador);

// Obtenemos el elemento con el id `valor`.
var valor = document.getElementById('valor');

// Esta funcion nos va a servir para actualizar nuestro DOM con el valor que tengamos en nuestro Store.
// En el primer render y cada vez que nos subscribamos al Store.
// Utilizamos el elemento obtenido arriba para mostrar el State.
function renderContador() {
  // Obtenemos la propiedad 'contador' de nuestro store:
  var actual = store.getState().contador // de todo mi estado, aca tengo la propiedad que se llama contador, que va a ser simpre un numero
  // Seteamos el numero obtenido como texto dentro del elemento con id 'valor':
  valor.innerText = actual

}

// Ejecutamos la funcion 'renderContador':
renderContador();



// Nos subscribimos al store pasandole la misma funcion. Asi cada vez que llegue una accion, ejecutamos la funcion:
store.subscribe(renderContador); // con esta linea me estoy suscribiendo al contador. Como esoty suscripto, CADA VEZ que haga un CAMBIO, se va a ejecutar la funcion que esta entre parentesis. ¿y que hace esa funcion? obtiene el valor nuevo y se lo setea como texto al span 'valor'.



// Por ultimo, utilizamos los botones de nuestro HTML para que cada vez que hagamos click,
// hagan un dispatch al store de la accion correspondiente:
// obtenemos los botones
var btnInc = document.getElementById("incremento");
var btnDec = document.getElementById("decremento");
// cada vez que hagamos click, sucede lo que debe suceder:
btnInc.onclick = () => store.dispatch(incremento()); // entre parentesis le despacho la funcion que debe realizarse, por eso la ejecuto. Le estoy despachando un objeto que devuelve una accion.
btnDec.onclick = () => store.dispatch(decremento());