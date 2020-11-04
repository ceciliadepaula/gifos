let tarjetaBusqueda = document.getElementById("tarjetaBusqueda");
let listaSugerencias = document.getElementById("listaSugerencias");
let lupaAzul = document.getElementById("lupaAzul")
let liLupa = document.getElementsByClassName("liLupa");
let li1 = document.getElementById("li1");
let li2 = document.getElementById("li2");
let li3 = document.getElementById("li3");
let li4 = document.getElementById("li4");

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
            li1.innerHTML = arrayBusqueda[0];
            li2.innerHTML = arrayBusqueda[1];
            li3.innerHTML = arrayBusqueda[2];
            li4.innerHTML = arrayBusqueda[3];

            li1.style.display = "inherit";
            li2.style.display = "inherit";
            li3.style.display = "inherit";
            li4.style.display = "inherit";

            /////////// VER PORQUE NO ME MUYESTRA LAS LUPAS
            
            liLupa[0].style.listStyleImage = " url('../images/icon-search-gris-resultado.svg')"
        })
        .catch(error => {
            console.log("Error: " + error);
        });
}

///////////////////////////////////////////////////

lupaAzul.addEventListener("click", SacarInfo);

function SacarInfo() {
    li1.style.display = "none";
    li2.style.display = "none";
    li3.style.display = "none";
    li4.style.display = "none";
    document.getElementById("lineaGris").style.opacity = "0";
    document.getElementById("lupaGris").style.opacity = "0";
    lupaAzul.src = "images/icon-search.svg";
    lupaAzul.style.height= "20px";
    tarjetaBusqueda.value= "";
}


////////////////////////////////////////////////////

