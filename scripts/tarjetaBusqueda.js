// Traigo los elementos a usar

let crearGifos = document.getElementById("crearGifos");
let iconoScrollIzquierda = document.getElementById("iconoScrollIzquierda");
let iconoScrollDerecha = document.getElementById("iconoScrollDerecha");
let tarjetaBusqueda = document.getElementById("tarjetaBusqueda");
let listaSugerencias = document.getElementById("listaSugerencias");
let lupaAzul = document.getElementById("lupaAzul")
let liLupa = document.getElementsByClassName("liLupa");
let resultadoBusquedaPersonal = document.getElementById("resultadoBusquedaPersonal");
let tituloBusquedaPersonal = document.getElementById("tituloBusquedaPersonal");
let lupaGris = document.getElementById("lupaGris");
let barraTrending = document.getElementsByClassName("barraTrending");
let grillaBusquedaPersonal = document.getElementById("grillaBusquedaPersonal");
let botonVerMas = document.getElementById("botonVerMas");
let formBusqueda = document.getElementById("form");
let ouchResultados = document.getElementById("ouchResultados");
let gifTrending = document.getElementById("gifTrending");
let iconoAgrandar = document.getElementsByClassName("iconoAgrandar");
let agrandarGif = document.getElementById("agrandarGif");


// Barra busqueda sticky en top bar

window.onscroll = function () { PosicionBarraBusqueda() };
var sticky = formBusqueda.offsetTop;

function PosicionBarraBusqueda() {
    if (window.pageYOffset >= 500) {
        formBusqueda.classList.add("sticky");   // FALTA PONER QUE CUANDO LA BUSQUEDA ESTE ARRIBA, NO SE MUESTREN LOS RESULTADOS DESPLEGADOS
        // Y PONER LINES DE SOMBRA
    } else {
        formBusqueda.classList.remove("sticky");    // PERO SI VUELVE ACÁ, SI SE MUESTREN
    }
}

// Funciones de Búsqueda

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

            /* console.log(respuestaTransformada.data) */

            if (respuestaTransformada.data == 0) {

                //PONER MENSAJE DE ERROR!!!!!!!!!!!!! Y BORRAR 4 SUGERENCIAS
                //ver que no es respyestatransformada.DATA... el mensaje tiene que aparecer cuando la palabra no tiene ningun gif
                ouchResultados.style.display = "flex";
                botonVerMas.style.display = "none";


                /* listaSugerencias.style.display = "none";
                grillaBusquedaPersonal.style.display = "none";
                
                 */

            } else {
                ouchResultados.style.display = "none";
                botonVerMas.style.display = "inherit";
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
            }
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

function CompletarPalabraA() { tarjetaBusqueda.value = arrayBusqueda[0]; }
function CompletarPalabraB() { tarjetaBusqueda.value = arrayBusqueda[1]; }
function CompletarPalabraC() { tarjetaBusqueda.value = arrayBusqueda[2]; }
function CompletarPalabraD() { tarjetaBusqueda.value = arrayBusqueda[3]; }

//Capturar valor del input para enviarlo a la API y mostrar resultados busqueda

lupaGris.addEventListener("click", MostrarResultadosBusquedaPersonal);

tarjetaBusqueda.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        MostrarResultadosBusquedaPersonal(limiteMostrar);
    }
});

var palabraBuscada; // Recien cuando hace click o le da ok, me guarda lo que busca

function MostrarResultadosBusquedaPersonal() {
    palabraBuscada = tarjetaBusqueda.value;
    tituloBusquedaPersonal.innerHTML = (palabraBuscada).charAt(0).toUpperCase() + (palabraBuscada).slice(1);
    resultadoBusquedaPersonal.style.display = "flex";
    grillaBusquedaPersonal.innerHTML = "";
    TraerResultadosBusqueda(12, 0);
    limiteMostrar = 12;
    posicion = 0;
}


function TraerResultadosBusqueda(limiteMostrar, posicion) {

    url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${palabraBuscada}&limit=${limiteMostrar}&offset=${posicion}`;

    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(nuevoObjetoRecibido => {
            for (i = 0; i < 12; i++) {
                let contenedorImg = document.createElement("div");
                contenedorImg.classList.add("GifTrending");
                contenedorImg.innerHTML = `
                    <img src=${nuevoObjetoRecibido.data[i].images.original.url}>
                    <div class='pasarMouse'> 
                        <div class='iconos'>" 
                            <img class='iconoCorazon' id="${nuevoObjetoRecibido.data[i].id}" src='images/icon-fav.svg' alt='Ícono añadir a favoritos'>
                            <a onclick="DescargarUnGif('${nuevoObjetoRecibido.data[i].id}')">        
                                <img class='iconoDescargar' src='images/icon-download.svg' alt='Ícono download'>
                            </a>
                            <a onclick="AgrandarGif('${nuevoObjetoRecibido.data[i].id}')"> 
                                <img class='iconoAgrandar' src='images/icon-max-normal.svg' alt='Ícono maximizar'>
                            </a>
                        </div>
                        <div class='infoTexto'>
                            <p>${nuevoObjetoRecibido.data[i].username}</p>
                            <h4>${nuevoObjetoRecibido.data[i].title}</h4>
                        </div>
                    </div>
                `
                grillaBusquedaPersonal.appendChild(contenedorImg);
            }
        })
        .catch(error => {
            console.log("Error! " + error);
        });
}

// Sumar 12 gifs cada vez que se haga click en botón Ver Más

var limiteMostrar = 12;
var posicion = 0;

botonVerMas.addEventListener("click", VerMasResultados);

function VerMasResultados() {
    limiteMostrar = limiteMostrar + 12;
    posicion = posicion + 12;
    TraerResultadosBusqueda(limiteMostrar, posicion);
}


// Descargar gifs

async function DescargarUnGif(gifoImg) {
    let blob = await fetch(
        "https://media.giphy.com/media/" + gifoImg + "/giphy.gif"
    ).then((img) => img.blob());
    console.log(blob);
    invokeSaveAsDialog(blob, "");
}


// Maximizar gif

function AgrandarGif(gifoImg) {
    url = `https://api.giphy.com/v1/gifs/${gifoImg}?api_key=${apikey}`;

    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(nuevoObjeto => {
            agrandarGif.style.display = "flex";
            agrandarGif.innerHTML = `
            <img id="iconoCerrar" src="images/close.svg" alt="Ícono Cerrar ventana">
            <div id="agregarElGifAqui">
                <img src=${nuevoObjeto.data.images.original.url}>
            </div>
            <div id="datosAmpliado">
                <div id="datosGifAmpliado">
                    <p>${nuevoObjeto.data.username}</p>
                    <h4>${nuevoObjeto.data.title}</h4>
                </div>
            <div id="botones">
                <img src="images/icon-download.svg" alt="Ícono descarga">
                <img src="images/icon-fav.svg" alt="Ícono corazón">
            </div>
        `
        })
        .catch(error => {
            console.log("Error: " + error);
        })
}