// Cambios Modo Nocturno
let lupaAzulNocturna = document.getElementById("lupaAzulNocturna");


let darkMode = localStorage.getItem("darkMode");

botonNoct.addEventListener("click", Nocturno);

const Noche = () => {
    body[0].classList.add("nocturno");
    localStorage.setItem("darkMode", "enabled");
    lupaAzulNocturna.addEventListener("click", SacarInfo);
    lupaAzulNocturna.style.display ="block";
    lupaAzul.style.display="none"
    
}

const Dia = () => {
    body[0].classList.remove("nocturno");
    localStorage.setItem("darkMode", null);
    lupaAzulNocturna.style.display ="none";
    lupaAzul.style.display="block";
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
