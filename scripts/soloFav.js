// Local Storage

if (StringDeFavoritos == null || StringDeFavoritos == "[]"){
   contenedorVacioFav.style.display = "flex";
   botonVerMasFavoritos.style.display = "none";
} else {
    contenedorVacioFav.style.display = "none";
    MostrarResultadosFavoritos();
}

// Sumar 12 gifs cada vez que se haga click en botón Ver Más

botonVerMasFavoritos.addEventListener("click", VerMasResultadosFav);

function VerMasResultadosFav() {   
    
    /* let m = 12; */
    m = m + 12;
    var limiteMostrar =12;
    limiteMostrar = limiteMostrar + 12;
    /* limiteMostrar = limiteMostrar + 12; */
      
TraerResultadosFavoritos(limiteMostrar, m); 
    console.log(m)
    console.log(limiteMostrar)
    
}



