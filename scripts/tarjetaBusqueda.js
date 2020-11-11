// Barra para buscar GIFOS

let tarjetaBusqueda = document.getElementById("tarjetaBusqueda");
let listaSugerencias = document.getElementById("listaSugerencias");
let lupaAzul = document.getElementById("lupaAzul")

let liLupa = document.getElementsByClassName("liLupa");

arrayBusqueda = ["", "", "", ""];

tarjetaBusqueda.addEventListener("input", Tipeando);

function Tipeando() {
    var link = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&q=${tarjetaBusqueda.value}&limit=20&offset=5&rating=g&lang=en`;
    Autocompletar(link);
}

function Autocompletar(linkPalabrasAutocompletadas) {
    fetch(linkPalabrasAutocompletadas)
        .then(respuesta => {
            document.getElementById("lupaGris").style.opacity = "1";
            document.getElementById("lineaGris").style.opacity = "1";
            lupaAzul.src = "images/close.svg";
            lupaAzul.style.height = "15px";
            tarjetaBusqueda.style.color = "#000000";
            return respuesta.json();
        })
        .then(respuestaTransformada => {
            for (i = 0; i < 4; i++) {
                palabra = (respuestaTransformada.data[i].name);
                arrayBusqueda.unshift(palabra);
                arrayBusqueda.pop();
            }
            for (i = 0; i < 4; i++) {
                liLupa[i].innerHTML = arrayBusqueda[i];
                listaSugerencias.style.display = "initial";
            }
            return (arrayBusqueda);   
        })
        .catch(error => {
            console.log("Error: " + error);
        });
}


// Hacer click en el ícono de cerrar

lupaAzul.addEventListener("click", SacarInfo);

function SacarInfo() {
    document.getElementById("lineaGris").style.opacity = "0";
    document.getElementById("lupaGris").style.opacity = "0";
    lupaAzul.src = "images/icon-search.svg";
    lupaAzul.style.height = "20px";
    tarjetaBusqueda.value = "";
    listaSugerencias.style.display = "none";
}


// Para que al hacer click en los resultados sugeridos, se complete la plabra en el input

liLupa[0].addEventListener("click", CompletarPalabraA);
liLupa[1].addEventListener("click", CompletarPalabraB);
liLupa[2].addEventListener("click", CompletarPalabraC);
liLupa[3].addEventListener("click", CompletarPalabraD);


function CompletarPalabraA() { 
    tarjetaBusqueda.value= arrayBusqueda[0];
}

function CompletarPalabraB() {
    tarjetaBusqueda.value= arrayBusqueda[1];
}

function CompletarPalabraC() {
    tarjetaBusqueda.value= arrayBusqueda[2];
}

function CompletarPalabraD() {
    tarjetaBusqueda.value= arrayBusqueda[3];
}

//Capturar valor del input para enviarlo a la API

/* palabraParaBuscar = tarjetaBusqueda.value; 
console.log(palabraParaBuscar); */

