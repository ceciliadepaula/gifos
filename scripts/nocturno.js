// Cambios Modo Nocturno

let darkMode = localStorage.getItem("darkMode");

botonNoct.addEventListener("click", Nocturno);

const Noche = () => {
    body[0].classList.add("nocturno");
    localStorage.setItem("darkMode", "enabled");
    lupaAzul.id = "lupaAzulNocturna";
    
}

const Dia = () => {
    body[0].classList.remove("nocturno");
    localStorage.setItem("darkMode", null);
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

