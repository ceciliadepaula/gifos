// Local Storage

if (StringDeFavoritos == null || StringDeFavoritos == "[]"){
    contenedorVacioFav.style.display = "flex";
    botonVerMasFavoritos.style.display = "none";
 } else {
     contenedorVacioFav.style.display = "none";
     MostrarResultadosFavoritos();
 }


 // Sumar 12 gifs en Favoritos cada vez que se haga click en botón Ver Más

botonVerMasFavoritos.addEventListener("click", VerMasResultados);

function VerMasResultados() {   
    m = m + 12;
    limiteMostrar = limiteMostrar + 12;
    TraerResultadosFavoritos(limiteMostrar, m);   
}
