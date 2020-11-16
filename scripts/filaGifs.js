let gifTrending = document.getElementById("gifTrending");

async function buscar() {

    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}`;

    let resp = await fetch(url);

    let info = await resp.json();

    for (i = 0; i < 3; i++) {
        let contenedorImg = document.createElement("div");
        contenedorImg.classList.add("GifTrending");
        contenedorImg.innerHTML =
            "<img src=" + info.data[i].images.original.url + ">" + 
            "<div class='pasarMouse'> <div class='iconos'>" + 
            "<img id='iconoCorazon' src='images/icon-fav.svg' alt='Ícono añadir a favoritos'>" +
            "<img id='iconoDescargar' src='images/icon-download.svg' alt='Ícono download'>" +
            "<img id='iconoAgrandar' src='images/icon-max-normal.svg' alt='Ícono maximizar'>" +
            "</div><div class='infoTexto'><p>" +
            info.data[i].username + "</p><h4>" + 
            info.data[i].title +  "</h4></div></div>";
        gifTrending.appendChild(contenedorImg);
    }

    
}

buscar();
