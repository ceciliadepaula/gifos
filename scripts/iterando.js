// Iterar resultados busqueda

function ResultadosIterando(contenedor, nombre, letra, nombreClass ) {
    contenedor.classList.add(nombreClass);
    contenedor.innerHTML = `
            <img src=${nombre.data[letra].images.original.url}>
            <div class='pasarMouse'> 
                <div class='iconos'>" 
                    <a onclick="AgregarFavoritos('${nombre.data[letra].id}', '${letra}')"> 
                        <img class='iconoCorazon' src="images/icon-fav.svg" alt='Ícono añadir a favoritos'>
                    </a>
                    <a onclick="DescargarUnGif('${nombre.data[letra].id}')">        
                        <img class='iconoDescargar' src='images/icon-download.svg' alt='Ícono download'>
                    </a>
                    <a onclick="AgrandarGif('${nombre.data[letra].id}')"> 
                        <img class='iconoAgrandar' src='images/icon-max-normal.svg' alt='Ícono maximizar'>
                    </a>
                </div>
                <div class='infoTexto'>
                    <p>${nombre.data[letra].username}</p>
                    <h4>${nombre.data[letra].title}</h4>
                </div>
            </div>
        `
}
