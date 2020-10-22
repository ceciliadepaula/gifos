//////  ------ HEADER------  //////
// Cambia los estilos de los íconos de la barra navegación

    // Ícono (+) para crear propios Gifos

    crearGifos = document.getElementById("crearGifos");

    function Unhover() {
        crearGifos.setAttribute('src', 'images/button-crear-gifo.svg');
    }

    Unhover(crearGifos);
    crearGifos.addEventListener("mouseleave", Unhover);
    crearGifos.addEventListener("mouseover", () => { crearGifos.setAttribute('src', 'images/CTA-crear-gifo-hover.svg'); });
    crearGifos.addEventListener("click", () => { crearGifos.setAttribute('src', 'images/CTA-crear-gifo-active.svg'); });

    // Nombre de Secciones

    lineaHover = document.getElementsByClassName("lineaHover");
    linkHover = document.getElementsByClassName("link");

    linkHover[0].addEventListener("mouseover", () => { lineaHover[0].style.backgroundColor = "#50E3C2" });
    linkHover[1].addEventListener("mouseover", () => { lineaHover[1].style.backgroundColor = "#50E3C2" });
    linkHover[2].addEventListener("mouseover", () => { lineaHover[2].style.backgroundColor = "#50E3C2" });

    linkHover[0].addEventListener("mouseleave", () => { lineaHover[0].style.backgroundColor = "#ffffff" });
    linkHover[1].addEventListener("mouseleave", () => { lineaHover[1].style.backgroundColor = "#ffffff" });
    linkHover[2].addEventListener("mouseleave", () => { lineaHover[2].style.backgroundColor = "#ffffff" });

    linkHover[0].addEventListener("click", () => { linkHover[0].style.color = "#9CAFC3"; lineaHover[0].style.backgroundColor = "#9CAFC3" });
    linkHover[1].addEventListener("click", () => { linkHover[1].style.color = "#9CAFC3"; lineaHover[1].style.backgroundColor = "#9CAFC3" });
    linkHover[2].addEventListener("click", () => { linkHover[2].style.color = "#9CAFC3"; lineaHover[2].style.backgroundColor = "#9CAFC3" });

