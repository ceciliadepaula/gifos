// Resultado trendings
// Ver como hacer para que el trending me aparezca en mayuscula la primera
//Hacer que se ponga negrita y que se busqye el termino al dar click

/* function capitalize(word) {  
    return word[0].toUpperCase() + word.slice(1);
  } */

const apikey = "qh1YngMeTeNY1hh1ul31qyOxXD9gAjLC";

var arrayTrendings = [];

/// VERSIÓN CORTA CON ASYNC

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




/// VERSIÓN LARGA CON .THEN

/* function trendings(url) {
    let resultadosTrendings = document.getElementById("resultadosTrendings");
    
    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(listaJson => {
            for (i = 0; i < 5; i++) {
                arrayTrendings.push(listaJson.data[i]);
            }
            array_aString = new String (arrayTrendings);
            for (i = 0; i < 4 ; i++ ) {
                array_aString =  array_aString.replace(",", " - " );
            }
            resultadosTrendings.innerHTML= array_aString;
        })
        .catch(error => {
            console.log("Error!!!: " + error);
        })
} 
 
 trendings(`https://api.giphy.com/v1/trending/searches?api_key=${apikey}`)
 
*/