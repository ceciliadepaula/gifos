// Mostrar 5 palabras más buscadas en barra de TRENDINGS

const apikey = "qh1YngMeTeNY1hh1ul31qyOxXD9gAjLC";

var arrayTrendings = [];

async function trendings(url) {
    let resultadosTrendings = document.getElementById("resultadosTrendings");
    try {
        let respuesta = await fetch(url);
        let listaJson = await respuesta.json();
        for (i = 0; i < 5; i++) {
            arrayTrendings.push(listaJson.data[i]);
        }
        array_aString = new String(arrayTrendings);
        for (i = 0; i < 4; i++) {
            array_aString = array_aString.replace(",", " - ");
        }
        resultadosTrendings.innerHTML = array_aString;
    }
    catch (error) {
        console.log("Error!!!: " + error);
    }
}

trendings(`https://api.giphy.com/v1/trending/searches?api_key=${apikey}`)

// Ver como hacer para que el trending me aparezca en mayuscula la primera
//Hacer que se ponga negrita y que se busqye el termino al dar click