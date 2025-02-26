let nombreamigo = [];
let intentos = 0;
let itemInput = document.getElementById("amigo");
let divListas = document.querySelector(".listas");
let listaNombre = document.getElementById("listaAmigos");
let resultado = document.getElementById("resultado");
let reinicia = document.getElementById("reiniciar");
let sortea = document.getElementById("sortear");

// Ocultar botón de reiniciar
reinicia.style.visibility = "hidden";

// Función para limpiar el input
function limpiarCaja(elemento) {
    elemento.value = "";
}

// Función para agregar un item a la lista
function agregarItem(elemento, lista) {
    let listItem = document.createElement("li");
    listItem.id = nombreamigo.indexOf(elemento);
    listItem.innerHTML = `${elemento} <button onclick="eliminaNombre(${nombreamigo.indexOf(elemento)})">x</button>`;
    lista.appendChild(listItem);
}

// Función para agregar nombre de los amigos
function agregarAmigo() {
    let nombre = itemInput.value.trim();
    intentos++;
    if (intentos >= 1 && nombreamigo.length === 0 && nombre != "") {
        sortea.removeAttribute("disabled");
    }
    if (nombre) {
        nombreamigo.push(nombre);
        agregarItem(nombre, listaNombre);
        limpiarCaja(itemInput);
    } else {
        alert("¡Error! Por favor, intente ingresando un nombre válido.");
    }
}

// Función para realizar el sorteo aleatorio
function sortearAmigo() {
    eliminarElemento(listaNombre);
    let posicionAleatoria = Math.floor(Math.random() * nombreamigo.length);
    agregarItem(nombreamigo[posicionAleatoria], resultado);
    reinicia.style.visibility = "visible";
    sortea.style.visibility = "hidden";
}

// Función para eliminar un elemento del DOM
function eliminarElemento(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

// Función para eliminar un nombre de la lista
function eliminaNombre(index) {
    let validar = confirm("¿Estás seguro de eliminar este nombre?");
    if (validar) {
        const etiqueta = document.getElementById(index);
        eliminarElemento(etiqueta);
        nombreamigo.splice(index, 1);
        alert("¡El nombre ha sido eliminado con éxito!");
    }
    if (nombreamigo.length === 0) {
        sortea.setAttribute("disabled", true);
    }
}

// Modificar la función agregarItem para ajustar el botón de eliminar
function agregarItem(elemento, lista) {
    let listItem = document.createElement("li");
    listItem.id = nombreamigo.indexOf(elemento);
    listItem.style.display = "flex";
    listItem.style.justifyContent = "space-between";
    listItem.style.alignItems = "center";

    let span = document.createElement("span");
    span.textContent = elemento;

    let button = document.createElement("button");
    button.textContent = "x";
    button.style.marginLeft = "10px";
    button.style.padding = "2px 5px";
    button.style.fontSize = "0.8em";
    button.onclick = function() {
        eliminaNombre(nombreamigo.indexOf(elemento));
    };

    listItem.appendChild(span);
    listItem.appendChild(button);
    lista.appendChild(listItem);
}

// Función para reiniciar la aplicación
function inicia() {
    reinicia.style.visibility = "hidden";
    location.reload();
    nombreamigo.splice(0, nombreamigo.length);
}

// Añadir event listeners a los botones
document.getElementById("agregar").addEventListener("click", agregarAmigo);
sortea.addEventListener("click", sortearAmigo);
reinicia.addEventListener("click", inicia);
