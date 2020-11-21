// Mostrar 5 palabras más buscadas en barra de TRENDINGS

async function trendings(url) {
    let resultadosTrendings = document.getElementById("resultadosTrendings");
    try {
        let respuesta = await fetch(url);
        let listaJson = await respuesta.json();

        resultadosTrendings.innerHTML = `
           <span class="buscarTrending">${listaJson.data[0]}</span> - 
           <span class="buscarTrending">${listaJson.data[1]}</span> - 
           <span class="buscarTrending">${listaJson.data[2]}</span> - 
           <span class="buscarTrending">${listaJson.data[3]}</span> - 
           <span class="buscarTrending">${listaJson.data[4]}</span>
        `;

        // Al hacer click en algunos de los trendings sugeridos, se muestran los gifs de esa busqueda
        let buscarTrending = document.getElementsByClassName("buscarTrending");
        for(let i = 0; i<buscarTrending.length; i++){
            buscarTrending[i].addEventListener("click", function (e) {
                tarjetaBusqueda.value = listaJson.data[i];
                MostrarResultadosBusquedaPersonal();
            })
        }

    }
    catch (error) {
        console.log("Error!!!: " + error);
    }
}

trendings(`https://api.giphy.com/v1/trending/searches?api_key=${apikey}`)