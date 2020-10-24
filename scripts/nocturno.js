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

const Noche = () => {
    body[0].classList.add("nocturno");
    localStorage.setItem("darkMode", "enabled");    
    modoDisenio.innerHTML = "Modo diurno";
}

const Dia = () => {
    body[0].classList.remove("nocturno");
    localStorage.setItem("darkMode", null);
    modoDisenio.innerHTML = "Modo nocturno";
}

if (darkMode === "enabled"){
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