//cargo en un arreglo las imagenes de las banderas. Este sera el orden que se mostraran
let banderas = [
  "pa.svg",
  "bo.svg",
  "ad.svg",
  "gb.svg",
  "na.svg",
  "af.svg",
  "ar.png",
  "ax.png",
];

//arreglo que guardara la opcion correcta
let correcta = [2, 2, 1, 1, 0, 0, 1, 2];

//arreglo que guardara los paises a mostrar en cada jugada
let opciones = [];
//cargo en el arreglo opciones, las opciones a mostrar en cada jugada
opciones.push(["SOUTH AFRICA", "SINGAPORE", "PANAMA"]); //panama
opciones.push(["PERU", "ITALY", "BOLIVIA"]); // bolivia
opciones.push(["TUNISIA", "ANDORRA", "ANTIGUA AND BARBUDA"]); // andorra
opciones.push(["UKRAINE", "UNITED KINGDOM", "MADAGASCAR"]);
opciones.push(["NAMBIBIA", "OMAN", "ETHIOPIA"]);
opciones.push(["AFGHANISTAN", "ÅLAND", "UKRAINE"]);
opciones.push(["SINGAPORE", "ARGENTINA", "OMAN"]);
opciones.push(["ETHIOPIA", "ANTIGUA AND BARBUDA", "ÅLAND"]);

//variable que guarda la posicion actual

let posActual = 0;
//variable que guarda la cantidad acertadas hasta el momento
let cantidadAcertadas = 0;

function comenzarJuego() {
  //reseteamos las variables
  posActual = 0;
  cantidadAcertadas = 0;
  //activamos las pantallas necesarias
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  cargarBandera();
}

//function que carga la siguiente bandera y sus opciones

function cargarBandera() {
  //controlo sis se acabaron las banderas
  if (banderas.length <= posActual) {
    terminarJuego();
  } else {
    //cargo las opciones
    //limpiamos las clases que se asignaron
    limpiarOpciones();

    document.getElementById("imgBandera").src =
      "/static/img/" + banderas[posActual];

    document.getElementById("n0").innerHTML = opciones[posActual][0];
    document.getElementById("n1").innerHTML = opciones[posActual][1];
    document.getElementById("n2").innerHTML = opciones[posActual][2];
  }
}

function limpiarOpciones() {
  document.getElementById("n0").className = "nombre";
  document.getElementById("n1").className = "nombre";
  document.getElementById("n2").className = "nombre";

  document.getElementById("l0").className = "letra";
  document.getElementById("l1").className = "letra";
  document.getElementById("l2").className = "letra";
}

function comprobarRespuesta(opElegida) {
  if (opElegida == correcta[posActual]) {
    //acerto
    //agregamos las clases para colocar el color verde a la opcion elegida
    document.getElementById("n" + opElegida).className =
      "nombre nombreAcertada";
    document.getElementById("l" + opElegida).className = "letra letraAcertada";
    cantidadAcertadas++; //aumenta el valor de la cantidad acertadas
  } else {
    //no acerto
    //agregamos las clases para colocar en rojo la opcion elegida
    document.getElementById("n" + opElegida).className =
      "nombre nombreNoAcertada";
    document.getElementById("l" + opElegida).className =
      "letra letraNoAcertada";

    //opcion que era correcta

    document.getElementById("n" + correcta[posActual]).className =
      "nombre nombreAcertada";
    document.getElementById("l" + correcta[posActual]).className =
      "letra letraAcertada";
  }

  posActual++;
  //Esperamos 1 segundo y pasamos mostrar la siguiente bandera y sus opciones
  setTimeout(cargarBandera, 1000); //setTimeout esta funcion define un tiempo de espera para pasar de una funcion a otra//

  //1000 milisegundos equivale a un 1sg//
}

function terminarJuego() {
  //ocultamos las pantallas y mostramos la pantalla final
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "block";
  //agregamos resultados
  document.getElementById("numCorrectas").innerHTML = cantidadAcertadas;
  document.getElementById("numIncorrectas").innerHTML =
    banderas.length - cantidadAcertadas;
}

function volverAlInicio() {
  //ocultamos las pantallas y activamos la inicial
  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
  document.getElementById("pantalla-juego").style.display = "none";
}

/* function elegirPosicion(pos) { 
       if (pos >= 0 && pos < banderas.length) { 
            
           pos hace referencia a la posicion que el usuario elegio y comprueba que sea mayor que 0 y no sea una posicion negativa porque eso no tendria sentido

           "operador lógico AND". Es una forma de combinar dos condiciones y verificar si ambas son verdaderas.

          pos < banderas.length. Esto significa que si la posicion que eligio el usuario no sobrepasa el maximo total de las banderas pues que ejecute la siguiebte linea de codigo



           posActual = pos;
            document.getElementById("pantalla-inicial").style.display = "none";
            document.getElementById("pantalla-juego").style.display = "block";
           cargarBandera(); que cargue la bandera elegida
        }
    } */

// Cargar dinámicamente las opciones en el menú desplegable

function cargarOpciones() {
  let selectElement = document.getElementById("selectPosicion"); //basicamente busca en el html el elemento con el id "selectPosicion" y lo guarda en la variable Select Element

  // Crear la opción de "Selecciona una posición"

  let defaultOption = document.createElement("option"); //creamos un elemento llamado "option" con createElement
  defaultOption.value = "-1"; //cuando colocamos -1 es para indicar que tiene algun uso especial
  defaultOption.text = "Choose a position";
  defaultOption.id = "initial-option"; // Identificador único para la opción inicial //que cada opcion diga "selecciona una posicion"
  selectElement.appendChild(defaultOption); //agrega a default option a nuestra lista en selectElement

  /* defaultOption.disabled = true;  // Deshabilitar la opción para que no sea seleccionable
    selectElement.appendChild(defaultOption);*/

  // Crear opciones para cada posición en el arreglo de banderas

  for (let i = 0; i < banderas.length; i++) {
    //empieza un ciclo for que se repetira tantas veces tenga los elementos banderas empezando desde 0"
    let option = document.createElement("option"); // lo mismo creamos un elemento llamado option
    option.value = i; // i se refiere a la posicion de cada bandera //
    option.text = "Position " + i; //ahora cada elemento de la lista mostrara (posicion (numero de la posicion de la bandera))
    selectElement.appendChild(option); //agregamos las funcionalidades de la variante "option" a selectelement
  }
}

function elegirPosicion() {
  let selectElement = document.getElementById("selectPosicion");
  let pos = parseInt(selectElement.value); //convierte a selectElement que es un valor de texto en un valor numerico y lo guarda en la variable pos

  // Eliminar la opcion "elige una opcion" luego de seleccionar una posicion//

  /*
    let defaultOption = selectElement.querySelector("option[value='-1']"); //busca el elemento option cuyo valor sea -1 que contiene "elige una posicion" para luego hacer algo con ella
    if (defaultOption) { //el navegador busca a defaultOption con el valor -1
        selectElement.removeChild(defaultOption); //la elimina
    }
*/

  if (pos >= 0 && pos < banderas.length) {
    //si pos es mayor o igual a 0 y es menor que la longitud de las banderas
    posActual = pos; //entonces la posicion actual sera el elemento elegido
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    cargarBandera(); //ahora va a cargar el posactual elegido
  } else {
    alert("Por favor, selecciona una posición válida.");
  }
}

window.onload = cargarOpciones; //cuando la pagine termine de cargarse que ejecute la funcion cargaropciones

/*function setupRemoveDefaultOption() {
    let selectElement = document.getElementById("selectPosicion");

    selectElement.addEventListener('mousedown', function() { //addEventListener le dice a nuestra lista que este atenta a algo que puede suceder

    // 'mousedown': Es el tipo de cosa a la que debe estar atenta. En este caso, es cuando presionas el botón del ratón mientras estás sobre la lista. //

    // function() Es lo que deberia hacer con las demas instrucciones de la funcion 

        // Si es la primera vez que se despliega la lista//



        if (!selectElement.hasAttribute('data-default-removed')) {

/*selectElement.hasAttribute('data-default-removed'): Verifica si el elemento select tiene una etiqueta especial llamada data-default-removed.

!: Significa "no".

if (!selectElement.hasAttribute('data-default-removed')) {: Si el select no tiene la etiqueta data-default-removed, entonces ejecuta el código dentro de las llaves {}.
Esto asegura que solo elimines la opción "Elige una posición" la primera vez que haces clic para desplegar la lista.


data-default-removed es como una nota que le indica al naevegador que ya se ha eliminado algo en este caso como no ha sido removido pues se continua con la condicion 




    
            let defaultOption = selectElement.querySelector("option[value='-1']");
            if (defaultOption) {
                selectElement.removeChild(defaultOption);
                // Marcar que la opción ha sido eliminada
                selectElement.setAttribute('data-default-removed', 'true'); //Recuerda que ya se ha eliminado la opción "Elige una posición": Esto previene que la opción se elimine de nuevo si el usuario hace clic para desplegar la lista en el futuro.//
            }
        }
    });
}

window.onload = function() {  //hacer de una vez una lista de funciones que se deben ejecutar al cargar correctamente la pagina
    cargarOpciones();
    setupRemoveDefaultOption();  // Configurar el evento para eliminar la opción predeterminada al desplegar
};
*/

// Función para eliminar la opción inicial "Elige una posición" al hacer clic

function barajarJuego() {
  // Creamos un arreglo de objetos que agrupen las banderas, opciones y respuestas correctas
  let juego = banderas.map((bandera, index) => ({
    bandera: bandera,
    opciones: opciones[index],
    correcta: correcta[index],
  }));

  // Barajamos el arreglo usando sort() y Math.random()
  juego.sort(() => Math.random() - 0.5);

  // Separar los valores barajados de vuelta en sus respectivos arreglos
  banderas = juego.map((item) => item.bandera);
  opciones = juego.map((item) => item.opciones);
  correcta = juego.map((item) => item.correcta);
}

// Llamamos la función antes de iniciar el juego
barajarJuego();
