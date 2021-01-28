//Realizado por Diego Alejandro Gómez - diegostanloona@icloud.com

//-------------------------------------------------
//---DEFINICIÓN DEL TABLERO Y LÓGICA DE VICTORIA---
//-------------------------------------------------
let tablero = ["0", "1", "2",
    "3", "4", "5",
    "6", "7", "8"
] //Representación general de todo el tablero

let turno = "X"
let jugadas = [] //Jugadas que ha realizado el jugador
let jugadasMaquina = [] //Jugadas que ha realizado la máquina

const jugar = (i, e) => { //Se ejecuta cuando el jugador presiona un botón
    if (e.srcElement.innerHTML != "X" && e.srcElement.innerHTML != "O") { //Valida que la casilla seleccionada no esté ocupada
        turno = "X"
        e.srcElement.innerHTML = turno
        tablero[i] = turno
        jugadas.push(parseInt(i))

        validarVictoria()
        turno = "O"
        turnoEnemigo(i)
    }
}

const validarVictoria = () => { //Valida si hay una posición de victoria o empate


    for (let i = 0; i < tablero.length; i += 3) {
        if (tablero[i] == turno && tablero[i + 1] == turno && tablero[i + 2] == turno) {
            alert("Victoria para: " + turno)
            reiniciar()

            return 0
        }
    }

    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i] == turno && tablero[i + 3] == turno && tablero[i + 6] == turno) {
            alert("Victoria para: " + turno)
            reiniciar()

            return 0
        }
    }
    if (tablero[0] == turno && tablero[4] == turno && tablero[8] == turno) {
        alert("Victoria para: " + turno)
        reiniciar()

        return 0
    }
    if (tablero[2] == turno && tablero[4] == turno && tablero[6] == turno) {

        alert("Victoria para: " + turno)
        reiniciar()

        return 0
    }

    let empate = false

    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i] == i) {
            empate = false
            break
        } else {
            empate = true
        }
    }
    if (empate) {
        alert("Empate")
        reiniciar()
        return 0
    }

}

//-------------------------------------------------
//--------CREACIÓN DINÁMICA DEL FRONTEND-----------
//-------------------------------------------------

const body = document.getElementsByTagName("body")[0]

for (let i = 0; i < tablero.length; i++) { //Crea dinámicamente los botones
    body.innerHTML += "<button class='triki' value='" + i + "'><br></button>"
    if (i == 2 || i == 5)
        body.innerHTML += "<br>"
}

const btns = document.getElementsByClassName("triki")

for (let i = 0; i < btns.length; i++) { //Agrega la función de clic en cada uno de los botones de forma dinámica
    btns[i].addEventListener('click', e => {
        jugar(e.srcElement.value, e)
    }, false);
}

const reiniciar = () => { //Recarga el sitio web
    window.location.replace("index.html")
}


//-------------------------------------------------
//--------------------DINÁMICO---------------------
//-------------------------------------------------


//DICCIONARIOS USADOS PARA VALIDAR LAS JUGADAS SENSIBLES

const victorias = { //Formas de ganar, por ejemplo si el tablero es: - - -
    //				 			  	   X X O
    //				 			       - - -
    //Marcará la casilla correspondiente para evitar que el jugador gane
    0: [
        [0, 3, 6],
        [0, 1, 2],
        [0, 4, 8]
    ],
    1: [
        [1, 4, 7],
        [0, 1, 2]
    ],
    2: [
        [0, 1, 2],
        [2, 5, 8],
        [2, 4, 6]
    ],
    3: [
        [0, 3, 6],
        [3, 4, 5]
    ],
    4: [
        [1, 4, 7],
        [3, 4, 5],
        [0, 4, 8],
        [2, 4, 6]
    ],
    5: [
        [3, 4, 5],
        [2, 5, 8]
    ],
    6: [
        [0, 3, 6],
        [2, 4, 6],
        [6, 7, 8]
    ],
    7: [
        [1, 4, 7],
        [6, 7, 8]
    ],
    8: [
        [0, 4, 8],
        [2, 5, 8],
        [6, 7, 8]
    ]
}

const triangulos = { //Formación de triángulo 30°: - - -
    //				 X - -
    //				 O - X
    //Marcará el ángulo de 90°
    0: [
        [0, 5, 2],
        [0, 7, 6]
    ],
    1: [
        [1, 6, 0],
        [1, 8, 2]
    ],
    2: [
        [2, 3, 0],
        [2, 7, 8]
    ],
    3: [
        [3, 2, 0],
        [3, 8, 6]
    ],
    4: [
        [],
        []
    ],
    5: [
        [5, 0, 2],
        [5, 6, 8]
    ],
    6: [
        [6, 1, 0],
        [6, 5, 8]
    ],
    7: [
        [7, 0, 6],
        [7, 2, 8]
    ],
    8: [
        [8, 1, 2],
        [8, 3, 6]
    ]
}

const esquinasOpuestas = { //En caso de que el tablero se vea así: - O X
    //									- - -
    //									X - -
    //Marcará la primera arista disponible junto a una de las X
    0: [
        [0, 8, 1]
    ],
    1: [
        []
    ],
    2: [
        [2, 6, 1]
    ],
    3: [
        []
    ],
    4: [
        []
    ],
    5: [
        []
    ],
    6: [
        [6, 2, 1]
    ],
    7: [
        []
    ],
    8: [
        [8, 0, 1]
    ]
}

const aristasAdyacentes = { //Formación de triángulo 45°: - - -
    //				 	   - - X
    //				 	   - X O
    //Marcará el ángulo de 90°
    0: [
        []
    ],
    1: [
        [1, 3, 0],
        [1, 5, 2]
    ],
    2: [
        []
    ],
    3: [
        [3, 1, 0],
        [3, 7, 6]
    ],
    4: [
        []
    ],
    5: [
        [5, 1, 2],
        [5, 7, 8]
    ],
    6: [
        []
    ],
    7: [
        [7, 3, 6],
        [7, 5, 8]
    ],
    8: [
        []
    ]
}

const aristas = [1, 3, 5, 7]
const esquinas = [0, 2, 6, 8]


const turnoEnemigo = i => { //Cuando es el turno de la máquina se ejecuta esto, valida cada posible escenario e imprime por consola qué escenario fue

    if (intentarGanar()) {
        console.log("Intentar ganar")
        return true
    }
    if (bloquearConDiccionario(victorias, i)) {
        console.log("Bloquear victoria del jugador")
        return true
    }
    if (bloquearConDiccionario(esquinasOpuestas, i)) {
        console.log("Bloquear esquinas opuestas")
        return true
    }
    if (bloquearConDiccionario(aristasAdyacentes, i)) {
        console.log("Bloquear aristas adyacentes")
        return true
    }
    if (bloquearConDiccionario(triangulos, i)) {
        console.log("Bloquear forma de triángulo")
        return true
    }
    if (defectoCentro(i)) {
        console.log("Bloquear centro")
        return true
    }
    if (defectoEsquinas(i)) {
        console.log("Defecto esquinas")
        return true
    }
    if (defectoAristas(i)) {
        console.log("Defecto aristas")
        return true
    }
}

const bloquearConDiccionario = (dict, i) => { //Bloquea las diferentes posibilidades descritas en los diccionarios
    for (let j = 0; j < dict[i].length; j++) {
        let count = 0
        for (let k in jugadas) {

            if (dict[i][j].includes(jugadas[k])) {
                count++
            }
            if (count == 2) {
                for (let l = 0; l < dict[i][j].length; l++) {
                    if (!jugadas.includes(dict[i][j][l]) && !jugadasMaquina.includes(dict[i][j][l])) {
                        //console.log(dict[i][j][l])
                        btns[dict[i][j][l]].innerHTML = "O"
                        tablero[dict[i][j][l]] = "O"
                        jugadasMaquina.push(parseInt(dict[i][j][l]))
                        validarVictoria()
                        return true
                    }
                }
            }
        }
    }
    return false
}

const defectoEsquinas = i => { //Cuando no hay nada que bloquear inserta en la primera esquina disponible
    for (let o = 0; o < esquinas.length; o++) {
        if (tablero[esquinas[o]] != "X" && tablero[esquinas[o]] != "O") {
            btns[esquinas[o]].innerHTML = "O"
            tablero[esquinas[o]] = "O"
            jugadasMaquina.push(esquinas[o])
            validarVictoria()
            return true
        }
    }
    return false
}

const defectoCentro = i => { //Cuando el centro no está ocupado, usa el centro
    if (tablero[4] != "X" && tablero[4] != "O" && i != 4) {
        btns[4].innerHTML = "O"
        tablero[4] = "O"
        jugadasMaquina.push(4)
        validarVictoria()
        return true
    }
    return false
}

const defectoAristas = i => { //Cuando no hay nada que bloquear inserta en la primera arista disponible
    for (let o = 0; o < aristas.length; o++) {
        if (tablero[aristas[o]] != "X" && tablero[aristas[o]] != "O") {
            btns[aristas[o]].innerHTML = "O"
            tablero[aristas[o]] = "O"
            jugadasMaquina.push(aristas[o])
            validarVictoria()
            return true
        }
    }
    return false
}

const intentarGanar = i => { //La máquina intentará ganar
    for (let o = 0; o < tablero.length; o++) {
        for (let j = 0; j < victorias[o].length; j++) {
            let count = 0
            for (let k in jugadasMaquina) {
                if (victorias[o][j].includes(jugadasMaquina[k])) {
                    count++
                }
                if (count == 2) {
                    for (let l = 0; l < victorias[o][j].length; l++) {
                        if (!jugadasMaquina.includes(victorias[o][j][l]) && !jugadas.includes(victorias[o][j][l])) {
                            btns[victorias[o][j][l]].innerHTML = "O"
                            tablero[victorias[o][j][l]] = "O"
                            jugadasMaquina.push(victorias[o][j][l])
                            validarVictoria()
                            return true

                        }
                    }
                }
            }
        }
    }
}