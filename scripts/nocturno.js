//////  ------ NOCTURNO ------  //////

let darkMode = localStorage.getItem("darkMode");
let body = document.getElementsByTagName("body");
let modoDisenio = document.getElementById("modoDisenio");
let logo = document.getElementById("logo");
let hamburguesa = document.getElementsByClassName("hamburguesa");
let cruz = document.getElementsByClassName("cruz");

let botonNoct = document.getElementById("nocturno");
botonNoct.addEventListener("click", Nocturno);

const Noche = () => {
    body[0].classList.add("nocturno");
    localStorage.setItem("darkMode", "enabled");
    modoDisenio.innerHTML = "Modo diurno";
    logo.src = "images/logo-mobile-modo-noct.svg";
    hamburguesa[0].src = "images/burger-modo-noct.svg";
    cruz[0].src = "images/close-modo-noct.svg";
    UnhoverNoct();
}

const Dia = () => {
    body[0].classList.remove("nocturno");
    localStorage.setItem("darkMode", null);
    modoDisenio.innerHTML = "Modo nocturno";
    logo.src = "images/logo-mobile.svg";
    hamburguesa[0].src = "images/burger.svg";
    cruz[0].src = "images/close.svg";
    Unhover();
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


