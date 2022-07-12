// var lista = $("#lista");

// //Get all
// $("#boton").click(function () { // selecciono boton ver amigos
//     lista.empty(); // nuestra lista de arriba esta vacia
//     $.get("http://localhost:5000/amigos", function(data, status){ // llamo la lista de amigos
//     if(status === 'success'){
//         data.forEach(element => lista.append( // a cada elemento de la lista amigos, lo agrego a la lista vacia de arriba
//             '<li>'+element.name+'</li>'
//         ));
//     }
//   });
// });

// //Get by id
// $("#search").click(function () { // boton buscar
//     var id = $("#input").val(); // el id va a ser lo que se ponga en el input

//     $.get(`http://localhost:5000/amigos/${id}`, function(data, status){ //llamo los id de la lista amigos
//     if(status === 'success'){
//         $("#amigo").text(data.name);
//     }
//   });
// });

// //Delete by id
// $("#delete").click(function () {
//     var id = $("#inputDelete").val();
//     $.ajax({
//         url: `http://localhost:5000/amigos/${id}`,
//         type: 'DELETE',
//         success: function(result) {
//             $("#sucess").text('amigo borrado con exito');
//         }
//     });
// });

// MEJORANDOLO:
// DEFINO UNA VARIABLE QUE DE LA LISTA DE AMIGOS POR FUERA
var getAmigos = () => { // selecciono el boton
    var list = $('#lista') // me guardo la lista del html
    list.empty(); // si la lista tiene algo la limpio, sino no pasa nada

    $.get('http://localhost:5000/amigos', respuesta => { // recibe dos argumentos, la url y una funcion que va a ser la rta del servidor
        for (let i = 0; i < respuesta.length; i++) { // recorro la respuesta
            list.append(`<li>${respuesta[i].name}</li>`) // le agrego a la lista un item que va a tener el nombre del objeto que me pase el servidor como respuesta
        }
    })
}
//toda la lista
$('#boton').click(getAmigos//() => { // selecciono el boton
//     var list = $('#lista') // me guardo la lista del html
//     list.empty(); // si la lista tiene algo la limpio, sino no pasa nada

//     $.get('http://localhost:5000/amigos', respuesta => { // recibe dos argumentos, la url y una funcion que va a ser la rta del servidor
//         for (let i = 0; i < respuesta.length; i++) { // recorro la respuesta
//             list.append(`<li>${respuesta[i].name}</li>`) // le agrego a la lista un item que va a tener el nombre del objeto que me pase el servidor como respuesta
//         }
//     })
// }
)

// buscar por ID
$('#search').click(() =>{ // accedo al boton de busqueda, al cual le voy a aplicar una funcion cuando se le haga click
    var id = $('#input').val() // asi accedemos al valor del input
    $.get(`http://localhost:5000/amigos/${id}`, respuesta =>{ // primer parametro url del id, segundo parametro una funcion que recibe la rta del servidor para hacer algo con ella.
        $('#amigo').text(respuesta.name); // accedo al span y meter el nombre del amigo. De la rta recibida debe agarrar el name.
    })
})

// borrar por ID
$('#delete').click(() =>{ //accedo al boton de delete
    var id = $('#inputDelete').val(); // lo mismo que hicimos arriba
    $.ajax({ // esto agrupa todos los metodos, recibe un objeto con distinta propiedades
        url: `http://localhost:5000/amigos/${id}`,
        type: 'DELETE', // que tipo de emtodo estoy queriendo hacer
        success: () => { // aca accedemos al span y mandamos el mensajito
            $('#success').text(`amigo numero ${id} borrado con exito`)
            getAmigos(); // MEJORANDOLO, llamo a la lista de nuevo con el amigo borrado
        }
    })
})