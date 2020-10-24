//////  ------ NOCTURNO ------  //////

    // agregar lo de local storage
    //y cambiar palabra nocturno*duirno

let botonNoct = document.getElementById("nocturno");
botonNoct.addEventListener("click", Nocturno);

function Nocturno(){
    var body = document.getElementsByTagName("body");
    var guardado = body[0].classList.toggle("nocturno");
} 
