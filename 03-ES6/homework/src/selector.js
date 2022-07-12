var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  // RESOLVER TERCERO
  // ejecuto matchfunction pasandole el elemento, si matchea me lo guardo
  if(matchFunc(startEl)) resultSet.push(startEl); // si el elemento que busco es el primero, lo pusheo

  // recorrer los hijos
  for (let i = 0; i < startEl.children.length; i++) {
    let result = traverseDomAndCollectElements(matchFunc, startEl.children[i])
    // concatenando el resultado
    resultSet = [...resultSet,...result]
    
  }

  return resultSet;
  
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

// RESOLVER PRIMERO
var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0] === '#') return 'id'; // si elector en la posicion 0 es un numeral, es un id
  if(selector[0] === '.') return 'class';
  for (let i = 0; i < selector.length; i++) {
    if(selector[i] === '.') return 'tag.class'
  };
  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.
// RESOLVER SEGUNDO

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
   matchFunction = function(el){
    return '#' + el.id === selector // compara mi selector con el id del elemento, si son iguales true, sino false
   }
  } else if (selectorType === "class") {
    matchFunction = function(el){
      for (let i = 0; i < el.classList.length; i++) {
        if('.' + el.classList[i] === selector) return true        
      }
      return false
    }
    
  } else if (selectorType === "tag.class") {
    matchFunction = function(el){
      let [t, c] = selector.split('.') //[tag, class] ---t=tag c=class
      // recursion
      return matchFunctionMaker(t)(el) && matchFunctionMaker('.'+c)(el) // se tienen que cumplir si o si las dos condiciones para que devuelva true, primero se le pasa el tag, y si despues la clase coincide con la de ese tag, ahi retorna true.
      // hay que encontrar un elemento que matchee con el tag y que matchee con la clase
    }
  } else if (selectorType === "tag") {
    matchFunction = function(el){
      return el.tagName === selector.toUpperCase(); // estoy comparando el tagname del elemento con el selector que viene en minuscula pero se lo estoy pasando a mayuscula
    }
  }
  return matchFunction;
};

// esta funcion es similar al document.querySelectorAll(".myClass")  esto iba a terminar devolviendo los elementos que matchearan con esa clase
// esto va a recorrer el DOM y va a devolver los elementos que matcheen con la clase que se le pasa.

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
