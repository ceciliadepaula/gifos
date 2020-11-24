// Creo Div con gifs de Giphy

arrayDeTrendings = [];

function buscar() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=10`;

    fetch(url)
        .then(resp => {
            return resp.json();
        })
        .then(info => {
            for (i = 0; i < info.data.length; i++) {
                let contenedorImg = document.createElement("div");
                ResultadosIterando(contenedorImg, info, i, "GifTrending"); // el código innerHTML que se repite
                gifTrending.appendChild(contenedorImg);
                arrayDeTrendings.push(contenedorImg);
                ColorCorazon(`${info.data[i].id}`, i); // el cambio del color del corazón s/ array guardado en localstorage            
            }
        })
        .catch(error => {
            console.log("Error! " + error);
        });
}



// Ir derecha e izquierda // O usar el otro que esta en otro archivo, que pasa de a 3

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
    slider.addEventListener('pointerleave', () => { // mouseleave / touchleave / pointerleave
        isDown = false;
    });
    slider.addEventListener('pointerup', () => {    //mouseup / touchend / pointerup
        isDown = false;
    });
    slider.addEventListener('pointermove', (e) => { // mousemove / touchmove / pointermove
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 15;
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
    iconoScrollDerecha.style.display = "initial";
    iconoScrollIzquierda.style.display = "initial";
}