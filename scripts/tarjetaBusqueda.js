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
            //Cambio estilo íconos
            document.getElementById("lupaGris").style.opacity = "1";
            document.getElementById("lineaGris").style.opacity = "1";
            lupaAzul.src = "images/close.svg";
            lupaAzul.style.height = "15px";
            tarjetaBusqueda.style.color = "#000000";
            return respuesta.json();
        })
        .then(respuestaTransformada => {
            for (i = 0; i < 4; i++) {
                arrayBusqueda.unshift(respuestaTransformada.data[i].name);
                arrayBusqueda.pop();
            }

            for (i = 0; i < 4; i++) {
                liLupa[i].innerHTML = arrayBusqueda[i];
                listaSugerencias.style.display = "initial";
            }
        })
        .catch(error => {
            console.log("Error: " + error);
        });
}

///////////////////////////////////////////////////

lupaAzul.addEventListener("click", SacarInfo);

function SacarInfo() {
    document.getElementById("lineaGris").style.opacity = "0";
    document.getElementById("lupaGris").style.opacity = "0";
    lupaAzul.src = "images/icon-search.svg";
    lupaAzul.style.height = "20px";
    tarjetaBusqueda.value = "";
    listaSugerencias.style.display = "none";
}


////////////////////////////////////////////////////

