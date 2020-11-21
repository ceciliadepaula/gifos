// Agregar a Favoritos

let StringDeFavoritos = localStorage.getItem("Favoritos");

if (StringDeFavoritos == null || StringDeFavoritos == "[]"){
   var arrayDeFavoritos = [];
   contenedorVacioFav.style.display = "flex";
   botonVerMasFavoritos.style.display = "none";
} else {
    var arrayDeFavoritos = JSON.parse(StringDeFavoritos); // me lo vuelve a hacer array
    contenedorVacioFav.style.display = "none";
    MostrarResultadosFavoritos();
}


function AgregarFavoritos(gifoImg, e) {
    var indice = arrayDeFavoritos.indexOf(gifoImg);
    if ( indice < 0){
        arrayDeFavoritos.push(gifoImg);
        iconoCorazon[e].style.content = "url(./images/icon-fav-active.svg)";
        
        //me falta hacer lo de los iconos, que al volver abrir me los muestren en azul
        // el tipo de icono de ese e me tiene que quedar en el local storage. puedo pensarlo como un nombre de clase que cambie
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
            for (m; m < limiteMostrar; m++) {
                let contenedorImg = document.createElement("div");
                contenedorImg.classList.add("GifFavoritos"); 
                contenedorImg.innerHTML = `
                    <img src=${nuevoObjetoRecibido.data[m].images.original.url}> 
                    <div class='pasarMouse'> 
                        <div class='iconos'>" 
                            <a onclick="AgregarFavoritos('${nuevoObjetoRecibido.data[m].id}', '${m}')" href="javascript:location.reload()"> 
                                <img class='iconoCorazon' src='images/icon-fav.svg' alt='Ícono añadir a favoritos'> 
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
            }
        })
        .catch(error => {
            console.log("Error! " + error);
        });
}


// Sumar 12 gifs cada vez que se haga click en botón Ver Más

botonVerMasFavoritos.addEventListener("click", VerMasResultados);

function VerMasResultados() {   
    m = m + 12;
    limiteMostrar = limiteMostrar + 12;
    TraerResultadosFavoritos(limiteMostrar, m);   
}