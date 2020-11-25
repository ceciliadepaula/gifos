// Agregar a Mis Gifos
let grillaResultadosMisGifos = document.getElementById("grillaResultadosFavoritos");
let contenedorVacioMisGifos = document.getElementsByClassName("contenedorVacioMisGifos")[0];
let botonVerMasMisGifos = document.getElementById("botonVerMasMisGifos");

let StringDeGifsPropios = localStorage.getItem("MisGifs");

if (StringDeGifsPropios == null || StringDeGifsPropios == "[]"){
   var arrayGifsPropios = [];
   contenedorVacioMisGifos.style.display = "flex";
   botonVerMasMisGifos.style.display = "none";
} else {
    var arrayGifsPropios = JSON.parse(StringDeGifsPropios); // me lo vuelve a hacer array
    contenedorVacioMisGifos.style.display = "none";
    MostrarResultadosMisGifos();
}



function AgregarMisGifos(gifoImg, e) { // esta se tiene que poner automaticamente cuando se sube el gif y cuando apreto el borrar de mis hifos, el iconito
    var indice = arrayGifsPropios.indexOf(gifoImg);
    if ( indice < 0){
        arrayGifsPropios.push(gifoImg);
        /* iconoCorazon[e].style.content = "url(./images/icon-fav-active.svg)"; */
    } else {
        arrayGifsPropios.splice(indice, 1);
        /* iconoCorazon[e].style.content= "url(./images/icon-fav.svg)"; */
    }
    localStorage.setItem('MisGifs', JSON.stringify(arrayGifsPropios)); // me lo convierte en string   
}

// Mostrar los resultados en favoritos.html

function MostrarResultadosMisGifos() {
    grillaResultadosMisGifos.innerHTML = ""; 
    TraerResultadosFavoritos(12, 0);
    limiteMostrar = 12;
    m = 0;
}


function TraerResultadosFavoritos(limiteMostrar, m) {   

    url = `https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=${arrayGifsPropios}`

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