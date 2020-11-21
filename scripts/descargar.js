// Descargar gifs

async function DescargarUnGif(gifoImg) {
    let blob = await fetch(
        "https://media.giphy.com/media/" + gifoImg + "/giphy.gif"
    ).then((img) => img.blob());
    console.log(blob);
    invokeSaveAsDialog(blob, "");
}