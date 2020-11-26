// Agregar a Mis Gifos

let grillaResultadosMisGifos = document.getElementById("grillaResultadosMisGifos");
let contenedorVacioMisGifos = document.getElementsByClassName("contenedorVacioMisGifos")[0];
let botonVerMasMisGifos = document.getElementById("botonVerMasMisGifos");

// Funciones

/* let StringDeGifsPropios = localStorage.getItem("MisGifs"); */

if (StringDeGifsPropios == null || StringDeGifsPropios == "[]"){
   /* var arrayGifsPropios = []; */
   contenedorVacioMisGifos.style.display = "flex";
   botonVerMasMisGifos.style.display = "none";
} else {
   /*  var arrayGifsPropios = JSON.parse(StringDeGifsPropios); */
    contenedorVacioMisGifos.style.display = "none";
    MostrarResultadosMisGifos(); 
}


function AgregarMisGif(gifoImg, e) {
    var indice = arrayGifsPropios.indexOf(gifoImg);
    if ( indice < 0){
        arrayGifsPropios.push(gifoImg);
        iconoCorazon[e].style.content = "url(./images/icon-fav-active.svg)";
    } else {
        arrayGifsPropios.splice(indice, 1);
        iconoCorazon[e].style.content= "url(./images/icon-fav.svg)";
    }
    localStorage.setItem('MisGifs', JSON.stringify(arrayGifsPropios)); // me lo convierte en string   
}

// Mostrar los resultados

function MostrarResultadosMisGifos() {
    grillaResultadosMisGifos.innerHTML = ""; 
    TraerResultadosMisGifos(12, 0);
    limiteMostrar = 12;
    j = 0;
}


function TraerResultadosMisGifos(limiteMostrar, j) {   

    url = `https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=${arrayGifsPropios}`

    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(nuevoObjetoRecibido => {
            for (j; j < limiteMostrar; j++) {
                let contenedorImg2 = document.createElement("div");
                contenedorImg2.classList.add("GifFavoritos"); 

                if (window.innerWidth < 720) {
                    contenedorImg2.innerHTML = `
                    <a onclick="AgrandarGif('${nuevoObjetoRecibido.data[j].id}')"> 
                        <img src=${nuevoObjetoRecibido.data[j].images.original.url}> 
                    </a>`;
    
                    grillaResultadosMisGifos.appendChild(contenedorImg2); 
                        
                } else if (window.innerWidth >= 720) {
                    contenedorImg2.innerHTML = `
                    <img src=${nuevoObjetoRecibido.data[j].images.original.url}> 
                    <div class='pasarMouse'> 
                        <div class='iconos'>" 
                            <a onclick="AgregarFavoritos('${nuevoObjetoRecibido.data[j].id}', '${j}')" href="javascript:location.reload()"> 
                                <img class='iconoCorazon' alt='Ícono añadir a favoritos'> 
                            </a>
                            <a onclick="DescargarUnGif('${nuevoObjetoRecibido.data[j].id}')">        
                                <img class='iconoDescargar' src='images/icon-download.svg' alt='Ícono download'>
                            </a>
                            <a onclick="AgrandarGif('${nuevoObjetoRecibido.data[j].id}')"> 
                                <img class='iconoAgrandar' src='images/icon-max-normal.svg' alt='Ícono maximizar'>
                            </a>
                        </div>
                        <div class='infoTexto'>
                            <p>${nuevoObjetoRecibido.data[j].username}</p>
                            <h4>${nuevoObjetoRecibido.data[j].title}</h4>
                        </div>
                    </div>
                `
                grillaResultadosMisGifos.appendChild(contenedorImg2); 
                ColorCorazon(`${nuevoObjetoRecibido.data[j].id}`, j);
                }
            }
        })
       /*  .catch(error => {
            console.log("Error! " + error);
        }); */
}
