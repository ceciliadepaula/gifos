let tarjetaBusqueda = document.getElementById("tarjetaBusqueda");
/* let listaSugerencias = document.createElement("ul"); */

let listaSugerencias = document.getElementById("listaSugerencias");


tarjetaBusqueda.addEventListener("input", Tipeando);

function Tipeando() {
    var link = "https://api.giphy.com/v1/gifs/search/tags?api_key=qh1YngMeTeNY1hh1ul31qyOxXD9gAjLC&q=" + tarjetaBusqueda.value + "&limit=20&offset=5&rating=g&lang=en";
    Autocompletar(link);
    MostrarSugerencias();
} 

function Autocompletar(linkPalabrasAutocompletadas) {
    fetch(linkPalabrasAutocompletadas)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaTransformada => {
            for (i = 0; i < 4; i++) {
                let listadoAutocompletado = document.createElement("li");

                /* listadoAutocompletado.style.color = "#9CAFC3"; */

                listadoAutocompletado.innerHTML = respuestaTransformada.data[i].name;
                listaSugerencias.appendChild(listadoAutocompletado); 
                
            }

            /* console.log(listaSugerencias); */

        })
        .catch(error => {
            console.log("Error: " + error);
        });
} 



function MostrarSugerencias(){   // cambio de estilo
    

}




/*     let completarCampo2 = document.getElementById("completar2");
       let listaSugerida2 = document.getElementById("listaSugerida2");
       completarCampo2.addEventListener("keydown", Tipeando);

       function Tipeando() {
           var link = "https://api.giphy.com/v1/gifs/search/tags?api_key=qh1YngMeTeNY1hh1ul31qyOxXD9gAjLC&q=" + completarCampo2.value + "&limit=20&offset=5&rating=g&lang=en";
           Autocompletar(link);
       }

       function Autocompletar(linkPalabrasAutocompletadas) {
           fetch(linkPalabrasAutocompletadas)
               .then(respuesta => {
                   return respuesta.json();
               })
               .then(respuestaTransformada => {
                   for (i = 0; i < 4; i++) {
                       let listadoAutocompletado = document.createElement("li");
                       listadoAutocompletado.innerHTML = respuestaTransformada.data[i].name;
                       listaSugerida2.appendChild(listadoAutocompletado);
                   }
               })
               .catch(error => {
                   console.log("Errorrr: " + error);
               });
       } */