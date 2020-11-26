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

        console.log("corazonoscuro")
    } else {
        arrayDeFavoritos.splice(indice, 1);
        iconoCorazon[e].style.content= "url(./images/icon-fav.svg)";

        console.log("corazonclaro")
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
            for (m; m < limiteMostrar; m++) {
                let contenedorImg = document.createElement("div");
                contenedorImg.classList.add("GifFavoritos"); 

                if (window.innerWidth < 720) {
                    contenedorImg.innerHTML = `
                    <a onclick="AgrandarGif('${nuevoObjetoRecibido.data[m].id}')"> 
                        <img src=${nuevoObjetoRecibido.data[m].images.original.url}> 
                    </a>`;
    
                    grillaResultadosFavoritos.appendChild(contenedorImg); 
                        
                } else if (window.innerWidth >= 720) {
                    contenedorImg.innerHTML = `
                    <img src=${nuevoObjetoRecibido.data[m].images.original.url}> 
                    <div class='pasarMouse'> 
                        <div class='iconos'>" 
                            <a onclick="AgregarFavoritos('${nuevoObjetoRecibido.data[m].id}', '${m}')" href="javascript:location.reload()"> 
                                <img class='iconoCorazon' alt='Ícono añadir a favoritos'> 
                            </a>
                            <a onclick="DescargarUnGif('${nuevoObjetoRecibido.data[m].id}')">        
                                <img class='iconoDescargar' src='images/icon-download.svg' alt='Ícono download'>
                            </a>
                            <a onclick="AgrandarGif('${nuevoObjetoRecibido.data[m].id}')"> 
                                <img class='iconoAgrandar' src='images/icon-max-normal.svg' alt='Ícono maximizar'>
                            </a>
                        </div>
                        <div class='infoTexto'>
                            <p>${nuevoObjetoRecibido.data[m].username}</p>
                            <h4>${nuevoObjetoRecibido.data[m].title}</h4>
                        </div>
                    </div>
                `
                grillaResultadosFavoritos.appendChild(contenedorImg); 
                ColorCorazon(`${nuevoObjetoRecibido.data[m].id}`, m);
                }


                

            }
        })
        .catch(error => {
            console.log("Error! " + error);
        });
}

// Color icono corazón (s/ agregado o no agregado a favoriton)

function ColorCorazon(variable, letra){
    if (arrayDeFavoritos.indexOf(variable) == -1){
        iconoCorazon[letra].style.content= "url(./images/icon-fav.svg)";
    } else {
        iconoCorazon[letra].style.content = "url(./images/icon-fav-active.svg)";
    }
}