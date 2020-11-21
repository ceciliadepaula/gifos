// Favoritos

let StringDeFavoritos = localStorage.getItem("Favoritos");

if (StringDeFavoritos == null){
   var arrayDeFavoritos = [];
   // y tengo que poner que si el array es 0, me tiene que aparece el texto de 'agrefe su arrau bla bla' en la otra pagina.
} else {
    var arrayDeFavoritos = JSON.parse(StringDeFavoritos); // me lo vuelve a hacer array
}


function AgregarFavoritos(gifoImg, e) {
    var indice = arrayDeFavoritos.indexOf(gifoImg);
    if ( indice < 0){
        arrayDeFavoritos.push(gifoImg);
        iconoCorazon[e].style.content = "url(./images/icon-fav-active.svg)";
        
        console.log(gifoImg + "  " + e)
    } else {
        arrayDeFavoritos.splice(indice, 1);
        iconoCorazon[e].style.content= "url(./images/icon-fav.svg)";
    }

    localStorage.setItem('Favoritos', JSON.stringify(arrayDeFavoritos)); // me lo convierte en string   
    
    // el tipo de icono de ese e me tiene que quedar en el local storage. puedo pensarlo como un nombre de clase que cambie
}

/// controlar que funcionen cuando me aparecen los gifs al apretar ver mas y en el carrusel de tranfingsa