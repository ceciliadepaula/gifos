// Maximizar gif

function AgrandarGif(gifoImg) {
    url = `https://api.giphy.com/v1/gifs/${gifoImg}?api_key=${apikey}`;

    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(nuevoObjeto => {

            //Para abrir

            agrandarGif.style.display = "flex";
            agrandarGif.innerHTML = `
                <div id="marcoIcono">
                    <img id="iconoCerrar" src="images/close.svg" alt="Ícono Cerrar ventana">
                </div>
                <div id="agregarElGifAqui">
                    <img src=${nuevoObjeto.data.images.original.url}>
                </div>
                <div id="datosAmpliado">
                    <div id="datosGifAmpliado">
                        <p>${nuevoObjeto.data.username}</p>
                        <h4>${nuevoObjeto.data.title}</h4>
                    </div>
                <div id="botones">
                    <a onclick="DescargarUnGif('${nuevoObjeto.data.id}')">        
                        <img class='iconoDescargar' src='images/icon-download.svg' alt='Ícono download'>
                    </a>
                    <a onclick="AgregarFavoritos('${nuevoObjeto.data.id}', '0')"> 
                        <img class='iconoCorazonAbierto iconoCorazon' src="images/icon-fav.svg" alt='Ícono añadir a favoritos'>
                    </a>
                </div>
            `

            header.style.display = "none";
            main.style.display = "none";
            footer.style.display = "none";

            // Color corazón
            let iconoCorazonAbierto = document.getElementsByClassName("iconoCorazonAbierto")[0]

            if (arrayDeFavoritos.indexOf(`${nuevoObjeto.data.id}`) == -1){
                iconoCorazonAbierto.style.content= "url(./images/icon-fav.svg)";
            } else {
                iconoCorazonAbierto.style.content = "url(./images/icon-fav-active.svg)";
            }

            
            // Para cerrar

            document.getElementById("iconoCerrar").addEventListener("click", ()=> {
                agrandarGif.style.display = "none";
                agrandarGif.innerHTML = ``;
                gifGrande = false;
                header.style.display = "inherit";
                main.style.display = "inherit";
                footer.style.display = "inherit";
            });


        })
        .catch(error => {
            console.log("Error: " + error);
        })
}