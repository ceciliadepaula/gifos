//////  ------ HEADER------  //////
// Cambia los estilos de los íconos de la barra navegación

// Ícono (+) para crear propios Gifos

crearGifos = document.getElementById("crearGifos");
Unhover(crearGifos);

function UnhoverNoct() {
    crearGifos.setAttribute('src', 'images/CTA-crear-gifo-modo-noc.svg');
    crearGifos.addEventListener("mouseleave", () => { crearGifos.setAttribute('src', 'images/CTA-crear-gifo-modo-noc.svg'); });
    crearGifos.addEventListener("mouseover", () => { crearGifos.setAttribute('src', 'images/CTA-crar-gifo-modo-noc.svg'); });
    crearGifos.addEventListener("mousedown", () => { crearGifos.setAttribute('src', 'images/CTA-crear-gifo-active-modo-noc.svg'); });
}

function Unhover() {
    crearGifos.setAttribute('src', 'images/button-crear-gifo.svg');
    crearGifos.addEventListener("mouseleave", () => { crearGifos.setAttribute('src', 'images/button-crear-gifo.svg'); });
    crearGifos.addEventListener("mouseover", () => { crearGifos.setAttribute('src', 'images/CTA-crear-gifo-hover.svg'); });
    crearGifos.addEventListener("mousedown", () => { crearGifos.setAttribute('src', 'images/CTA-crear-gifo-active.svg'); });
}


// Nombre de Secciones

lineaHover = document.getElementsByClassName("lineaHover");
linkHover = document.getElementsByClassName("link");

linkHover[0].addEventListener("mouseover", () => { lineaHover[0].style.backgroundColor = "#50E3C2" });
linkHover[1].addEventListener("mouseover", () => { lineaHover[1].style.backgroundColor = "#50E3C2" });
linkHover[2].addEventListener("mouseover", () => { lineaHover[2].style.backgroundColor = "#50E3C2" });

linkHover[0].addEventListener("mouseleave", () => { lineaHover[0].style.backgroundColor = "#ffffff" });
linkHover[1].addEventListener("mouseleave", () => { lineaHover[1].style.backgroundColor = "#ffffff" });
linkHover[2].addEventListener("mouseleave", () => { lineaHover[2].style.backgroundColor = "#ffffff" });

linkHover[0].addEventListener("mousedown", () => { linkHover[0].style.color = "#9CAFC3"; lineaHover[0].style.backgroundColor = "#9CAFC3" });
linkHover[1].addEventListener("mousedown", () => { linkHover[1].style.color = "#9CAFC3"; lineaHover[1].style.backgroundColor = "#9CAFC3" });
linkHover[2].addEventListener("mousedown", () => { linkHover[2].style.color = "#9CAFC3"; lineaHover[2].style.backgroundColor = "#9CAFC3" });

// Scroll barra trendings

iconoScrollIzquierda = document.getElementById("iconoScrollIzquierda");
iconoScrollDerecha = document.getElementById("iconoScrollDerecha");

iconoScrollIzquierda.addEventListener("mouseover", () => iconoScrollIzquierda.setAttribute('src', 'images/button-slider-left-hover.svg'));
iconoScrollIzquierda.addEventListener("mouseleave", () => iconoScrollIzquierda.setAttribute('src', 'images/button-slider-left.svg'));

iconoScrollDerecha.addEventListener("mouseover", () => iconoScrollDerecha.setAttribute('src', 'images/Button-Slider-right-hover.svg'));
iconoScrollDerecha.addEventListener("mouseleave", () => iconoScrollDerecha.setAttribute('src', 'images/Button-Slider-right.svg'));