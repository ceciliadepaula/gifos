// Agregar a Favoritos

let StringDeFavoritos = localStorage.getItem("Favoritos");

if (StringDeFavoritos == null || StringDeFavoritos == "[]"){
   var arrayDeFavoritos = [];
} else {
    var arrayDeFavoritos = JSON.parse(StringDeFavoritos); // me lo vuelve a hacer array
}


function AgregarFavoritos(gifoImg, e) {
    var indice = arrayDeFavoritos.indexOf(gifoImg);
    if ( indice < 0){
        arrayDeFavoritos.push(gifoImg);
        iconoCorazon[e].style.content = "url(./images/icon-fav-active.svg)";
    } else {
        arrayDeFavoritos.splice(indice, 1);
        iconoCorazon[e].style.content= "url(./images/icon-fav.svg)";
    }
    localStorage.setItem('Favoritos', JSON.stringify(arrayDeFavoritos)); // me lo convierte en string   
}

// Mostrar los resultados en favoritos.html

function MostrarResultadosFavoritos() {
    grillaResultadosFavoritos.innerHTML = ""; 
    TraerResultadosFavoritos(12, 0);
    limiteMostrar = 12;
    m = 0;
}


function TraerResultadosFavoritos(limiteMostrar, m) {   

    url = `https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=${arrayDeFavoritos}`

    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(nuevoObjetoRecibido => {
            for (m = 0; m < limiteMostrar; m++) {
                let contenedorImg = document.createElement("div");
                ResultadosIterando(contenedorImg, nuevoObjetoRecibido, m, "GifFavoritos"); // el código innerHTML que se repite
                // agregar href="javascript:location.reload()"
                grillaResultadosFavoritos.appendChild(contenedorImg); 
                ColorCorazon(`${nuevoObjetoRecibido.data[m].id}`, m); // el cambio del color del corazón s/ array guardado en localstorage            
            }
        })
        .catch(error => {
            console.log("Error! " + error);
        });
}

// Color icono corazón

function ColorCorazon(variable, letra){
    if (arrayDeFavoritos.indexOf(variable) == -1){
        iconoCorazon[letra].style.content= "url(./images/icon-fav.svg)";
    } else {
        iconoCorazon[letra].style.content = "url(./images/icon-fav-active.svg)";
    }
}