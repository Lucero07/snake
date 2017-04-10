//variables globales
var columnasTabla;
var filasTabla;
var serpienteFilas = new Array(); //posiciones en filas para las posis de la serpiente
var serpienteColumnas = new Array(); //posiciones en cols para las posis de la serpiente
var direccion;
var crecimiento = 0;

//eventos.
var botonJugar = document.getElementById('jugar');
botonJugar.addEventListener('click', crearTabla);
botonJugar.addEventListener('click', serpiente);
botonJugar.addEventListener('click', crearComida);
botonJugar.addEventListener('click',mueveSerp);


//dibuja el área de juego
function crearTabla() {
    //tamaño de columnas y  filas para el tablero de juego dinamico
    columnasTabla = parseInt(prompt('¿Cuantas columnas quieres?'));
    if (columnasTabla > 10) {
        columnasTabla = columnasTabla;
    } else {
        columnasTabla = 20;
    };
    filasTabla = parseInt(prompt('¿Cuantas filas quieres?'));
    if (filasTabla > 10) {
        filasTabla = filasTabla;
    } else {
        filasTabla = 20;
    };

    var tabla = document.createElement('table');
    var lienzo = document.getElementById('lienzo');
    //     console.log(lienzo);
    tabla.border = 0;
    tabla.id = 'tablero';
    tabla.className = 'tabla';
    console.log(tabla);
    lienzo.appendChild(tabla);

    for (var j = 0; j < filasTabla; j++) {
        var fila = document.createElement('tr');
        tabla.appendChild(fila);
        for (var k = 0; k < columnasTabla; k++) {
            var columnas = document.createElement('td');
            columnas.width = 4;
            columnas.height = 4;
            columnas.id = j + ',' + k;
            columnas.className = 'cuadrito';
            fila.appendChild(columnas);
        };
    };
};

//Dibujar serpiente
function serpiente() {

    //posiciones de la serpiente
    serpienteFilas[0] = 10;
    serpienteColumnas[0] = 3;
    serpienteFilas[1] = 10;
    serpienteColumnas[1] = 2
    serpienteFilas[2] = 10
    serpienteColumnas[2] = 1;

    for (i = 0; i < serpienteFilas.length; i++) {
        var serpienteInicio = document.getElementById(serpienteFilas[i] + "," + serpienteColumnas[i])
        serpienteInicio.className = "serpiente";
    };
    return (serpienteFilas,serpienteColumnas);
};


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
};

function crearComida() {
    var generadoOK = false
    var contadorComida;
    var largoSerpiente = serpienteFilas.length

    while (generadoOK == false) {
        contadorComida = 0
        var comidaFilas = aleatorio(0, columnasTabla)
        var comidaColumna = aleatorio(0, filasTabla)
        while ((comidaFilas != serpienteFilas[contadorComida] || comidaColumna != serpienteColumnas[contadorComida]) && contadorComida < largoSerpiente) {
            contadorComida++
        };
      //se comprueba que la posicion no este ocupada de ser así, se uelve a realizar la iteracion
        if (contadorComida < largoSerpiente) {
            generadoOK = false
        } else {
            generadoOK = true
        };
    };
    var comidaSerpiente = document.getElementById(comidaFilas + "," + comidaColumna);
    comidaSerpiente.className = 'comida';
};

function movimientoSerpiente(){
  var teclaAscii = event.keyCode;
  direccion =  2;
  console.log(teclaAscii);

  if (teclaAscii == 106 && direccion != 2) {
      direccion = 4;
      serpienteColumnas[0] = serpienteColumnas[0] - 1
  } else if (teclaAscii == 107 && direccion != 1) {
      direccion = 3;
      serpienteFilas[0] = serpienteFilas[0] + 1
  } else if (teclaAscii == 108 && direccion != 4) {
      direccion = 2;
      serpienteColumnas[0] = serpienteColumnas[0] + 1
  } else if (teclaAscii == 105 && direccion != 3) {
      direccion = 1;
      serpienteFilas[0] = serpienteFilas[0] - 1
  }else{
  event.returnValue = false;
};
};

function mueveSerp() {
    var numTemp //variable auxiliar
    if (crecimiento > 0) {
        crecimiento = crecimiento - 1;
        numTemp = 0
    } else {
      var serpFila =serpienteFilas[serpienteFilas.length - 1];
      console.log(serpFila);
      var serpColum =serpienteColumnas[serpienteFilas.length - 1];
      console.log(serpColum);
      var colaSerpiente = document.getElementById( serpFila+ "," + serpColum );
      console.log(colaSerpiente);

      //.style.background = colorTablero
        numTemp = 1
    };
    var largoSerpi = serpienteFilas.length - numTemp

    //muevo hacia arriba los valores de los arrays (movimiento serp)
    for (var i = largoSerpi; i != 0; i--) {
        serpienteFilas[i] = serpienteFilas[i - 1];
        serpienteColumnas[i] = serpienteColumnas[i - 1]
    };

    movimientoSerpiente()

    // if (pisadoPosProhibida() == true) {
    //     //si esto ocurre mato temporizador
    //     window.clearInterval(init);
    //     alert("Game Over.");
    // } else {
    //     serpiente()
    // };

};

//var init = window.setInterval("mueveSerp()", 1000);
