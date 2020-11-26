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
            lupaAzul.style.content = "url(../images/close.svg)";
            lupaAzul.style.height = "15px";

            lupaAzulNocturna.style.content = "url(../images/close-modo-noct.svg)";
            lupaAzulNocturna.style.height = "15px";

            return respuesta.json();
        })
        .then(respuestaTransformada => {
            for (i = 1; i < 4; i++) {
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
        /* .catch(error => {
            console.log("Error: " + error);
        }); */
}


// Hacer click en el ícono de cerrar

lupaAzul.addEventListener("click", SacarInfo);

function SacarInfo() {
    document.getElementById("lineaGris").style.opacity = "0";
    document.getElementById("lupaGris").style.opacity = "0";
    lupaAzul.style.content = "url(../images/icon-search.svg)"
    lupaAzul.style.height = "20px";

    lupaAzulNocturna.style.content = "url(../images/icon-search-modo-noct.svg)";
    lupaAzulNocturna.style.height = "20px";

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
        MostrarResultadosBusquedaPersonal();
    }
});

var palabraBuscada; // Recien cuando hace click o le da ok, me guarda lo que busca

function MostrarResultadosBusquedaPersonal() {
    palabraBuscada = tarjetaBusqueda.value;
    tituloBusquedaPersonal.innerHTML = (palabraBuscada).charAt(0).toUpperCase() + (palabraBuscada).slice(1);
    resultadoBusquedaPersonal.style.display = "flex";
    grillaBusquedaPersonal.innerHTML = "";
    TraerResultadosBusqueda(12, 0, 0);
    limiteMostrar = 12;
    posicion = 0;
    i = 0;
}


function TraerResultadosBusqueda(limiteMostrar, posicion, i) {

    url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${palabraBuscada}&limit=${limiteMostrar}&offset=${posicion}`;

    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(nuevoObjetoRecibido => {
            if (nuevoObjetoRecibido.data == 0) {
                ouchResultados.style.display = "flex";
                botonVerMas.style.display = "none";
            } else {

                ouchResultados.style.display = "none";
                botonVerMas.style.display = "inherit";

                for (i; i < limiteMostrar; i++) {
                    let contenedorImg = document.createElement("div");
                    contenedorImg.classList.add("GifTrending");


                    if (window.innerWidth < 720) {
                        contenedorImg.innerHTML = `
                        <a onclick="AgrandarGif('${nuevoObjetoRecibido.data[i].id}')"> 
                            <img src=${nuevoObjetoRecibido.data[i].images.original.url}>
                        </a>
                        `;
        
                        grillaBusquedaPersonal.appendChild(contenedorImg);
                            
                    } else if (window.innerWidth >= 720) {
                        contenedorImg.innerHTML = `
                        <img src=${nuevoObjetoRecibido.data[i].images.original.url}>
                        <div class='pasarMouse'> 
                            <div class='iconos'>" 
                                <a onclick="AgregarFavoritos('${nuevoObjetoRecibido.data[i].id}', '${i}')"> 
                                    <img class='iconoCorazon'  alt='Ícono añadir a favoritos'>
                                </a>
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
                    ColorCorazon(`${nuevoObjetoRecibido.data[i].id}`, i);

                    }
                   
                }

            }
        })
        .catch(error => {
            console.log("Error! " + error);
        });
}

// Sumar 12 gifs cada vez que se haga click en botón Ver Más

botonVerMas.addEventListener("click", VerMasResultados);

function VerMasResultados() {   // los indices siempre se quedan en 0 a 11
    i = i + 12;
    limiteMostrar = limiteMostrar + 12;
    posicion = posicion + 12;
    TraerResultadosBusqueda(limiteMostrar, posicion, i);
}
