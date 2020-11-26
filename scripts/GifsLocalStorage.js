let StringDeGifsPropios = localStorage.getItem("MisGifs");

if (StringDeGifsPropios == null || StringDeGifsPropios == "[]"){
   var arrayGifsPropios = [];
} else {
    var arrayGifsPropios = JSON.parse(StringDeGifsPropios);
}