// Descargar gifs

async function DescargarUnGif(gifoImg) {
    let blob = await fetch("https://media.giphy.com/media/" + gifoImg + "/giphy.gif")
    .then(r => r.blob());
	invokeSaveAsDialog(blob);
}