//////  ------ NOCTURNO ------  //////

/* let botonNoct = document.getElementById("nocturno");
botonNoct.addEventListener("click", Nocturno);

function Nocturno(){
    var body = document.getElementsByTagName("body");
    var guardado = body[0].classList.toggle("nocturno");
}  */

let darkMode = localStorage.getItem("darkMode");
let botonNoct = document.getElementById("nocturno");
var body = document.getElementsByTagName("body");
botonNoct.addEventListener("click", Nocturno);
let modoDisenio = document.getElementById("modoDisenio");

var logo = document.getElementById("logo");
var hamburguesa = document.getElementsByClassName("hamburguesa");
var cruz = document.getElementsByClassName("cruz");

const Noche = () => {
    body[0].classList.add("nocturno");
    localStorage.setItem("darkMode", "enabled");
    modoDisenio.innerHTML = "Modo diurno";
    logo.src = "images/logo-mobile-modo-noct.svg";
    hamburguesa[0].src = "images/burger-modo-noct.svg";
    cruz[0].src = "images/close-modo-noct.svg";
    UnhoverNoct(crearGifos);
}

const Dia = () => {
    body[0].classList.remove("nocturno");
    localStorage.setItem("darkMode", null);
    modoDisenio.innerHTML = "Modo nocturno";
    logo.src = "images/logo-mobile.svg";
    hamburguesa[0].src = "images/burger.svg";
    cruz[0].src = "images/close.svg";
    Unhover(crearGifos);
}

if (darkMode === "enabled") {
    Noche();
}

function Nocturno() {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
        Noche();
    } else {
        Dia();
    }
}


