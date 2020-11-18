// Creo Div con gifs de Giphy

arrayDeTrendings = [];

function buscar(){
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=10`;

    fetch(url)
    .then( resp => {
        return resp.json();
    })
    .then( info => {
        for (i = 0; i < info.data.length; i++) {
            let contenedorImg = document.createElement("div");
            contenedorImg.classList.add("GifTrending");
            contenedorImg.innerHTML = `
                <img src=${info.data[i].images.original.url}>
                <div class='pasarMouse'> <div class='iconos'>" 
                <img class='iconoCorazon' src='images/icon-fav.svg' alt='Ícono añadir a favoritos'>
                <a onclick="DescargarUnGif('${info.data[i].id}')">        
                    <img class='iconoDescargar' src='images/icon-download.svg' alt='Ícono download'>
                </a>
                <img class='iconoAgrandar' src='images/icon-max-normal.svg' alt='Ícono maximizar'>
                </div><div class='infoTexto'><p>
                ${info.data[i].username}</p><h4>
                ${info.data[i].title}</h4></div></div>  
            `;
            gifTrending.appendChild(contenedorImg);
            arrayDeTrendings.push(contenedorImg);
        }
    })
    .catch( error => {
        console.log("Error! " + error);
    });
}


// Ir derecha e izquierda

iconoScrollIzquierda.addEventListener("click", () => {
   gifTrending.scrollLeft -= 200;
}); 

iconoScrollDerecha.addEventListener("click", () => {
    gifTrending.scrollLeft += 200;    
}); 

// Carrusel 

function scrollHorizontal() {
    const slider = document.getElementById("gifTrending");
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('pointerdown', (e) => {  // mousedown   touchstart pointerdown
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('pointerleave', () => { // mouseleave    touchleave pointerleave
        isDown = false;
    });
    slider.addEventListener('pointerup', () => {    //mouseup   touchend pointerup
        isDown = false;
    });
    slider.addEventListener('pointermove', (e) => { // mousemove   touchmove  pointermove
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX)*15;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Ejecuto las funciones según tamaño pantalla // o hacerlo con css

if (screen.width < 720) {
    buscar();
    scrollHorizontal();
    iconoScrollDerecha.style.display = "none";
    iconoScrollIzquierda.style.display = "none";

    // cambiar el ancho de los gifs con css para 768 para arriba
    
} else if (screen.width >= 720) {
    buscar();
    /* scrollHorizontal(); */
    iconoScrollDerecha.style.display = "initial";
    iconoScrollIzquierda.style.display = "initial";
}