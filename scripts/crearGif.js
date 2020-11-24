// Traigo elementos del html a usar o cambiar
let uno = document.getElementById("uno");
let dos = document.getElementById("dos");
let tres = document.getElementById("tres");

let botonComenzar = document.getElementById("botonComenzar");
let botonGrabar = document.getElementById("botonGrabar");
let botonFinalizar = document.getElementById("botonFinalizar");
let botonSubir = document.getElementById("botonSubir");
let cuadroAzul = document.getElementById("cuadroAzul");
let cronometro = document.getElementById("cronometro");

let tituloPermisos = document.getElementById("tituloPermisos");
let textoPermisos = document.getElementById("textoPermisos");
let gifGrabado = document.getElementById("gifGrabado");
let gifAzul = document.getElementById("gifAzul");
let repetirCaptura = document.getElementById("repetirCaptura");

let video = document.getElementById("video");
video.style.display = "none";

let recorder;
let blob;
let form = new FormData();
let dateStarted;


// Pedir permisos para acceder
botonComenzar.addEventListener("click", PantallaPermisos);

function PantallaPermisos() {
    tituloPermisos.innerHTML = "¿Nos das acceso <br> a tu cámara?";
    textoPermisos.innerHTML = "El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.";
    uno.style.backgroundColor = "#572EE5";
    uno.style.color = "#ffffff";
    botonComenzar.style.display = "none";
    dos.addEventListener("click", AbrirCamara);
}


// Abrir la cámara y mostrar en tiempo real

async function AbrirCamara() {
    dos.style.backgroundColor = "#572EE5";
    dos.style.color = "#ffffff";
    tituloPermisos.style.display = "none";
    textoPermisos.style.display = "none";
    uno.style.backgroundColor = "#ffffff";
    uno.style.color = "#572EE5";
    botonGrabar.style.display = "inherit";
    video.style.display = "inherit";
    gifAzul.style.display = "block";
    resultado = await getStreamAndRecord();
    botonGrabar.addEventListener("click", GrabarVideo);
}

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: { max: 480 }
        }
    })
        .then(function (stream) {
            video.srcObject = stream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 430,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });
        })
        .catch(err => {
            console.log("Error: " + err);
        });
}

// Grabar video

function GrabarVideo() {
    cronometro.style.display = "block";
    uno.style.backgroundColor = "#ffffff";
    uno.style.color = "#572EE5";
    botonGrabar.style.display = "none";
    botonFinalizar.style.display = "inherit";
    recorder.startRecording();
    botonFinalizar.addEventListener("click", FinalizarGrabacion);

    // Cronómetro
    dateStarted = new Date().getTime();
    (function looper() {
        if (!recorder) {
            return;
        }
        cronometro.innerHTML = calcularTiempo(
            (new Date().getTime() - dateStarted) / 1000
        );
        setTimeout(looper, 1000);
    })();
}

// Finalizar grabación

function FinalizarGrabacion() {
    cronometro.style.display = "none";
    repetirCaptura.style.display = "block";
    botonFinalizar.style.display = "none";
    botonSubir.style.display = "inherit";

    recorder.stopRecording(function () {
        video.style.display = "none";
        gifGrabado.style.display = "inherit";
        blob = recorder.getBlob();
        // invokeSaveAsDialog(blob); // me lo guarda en la compu
        gifGrabado.src = URL.createObjectURL(recorder.getBlob());
        form.append("file", recorder.getBlob(), "myGif.gif");
        form.append("api_key", apikey);
    });

    repetirCaptura.addEventListener("click", RepetirCaptura);
    botonSubir.addEventListener("click", SubirGrabacionAGifos);
}

// Cronómetro
let hours = '00';
let minutes = '00';
let seconds = '00';

function calcularTiempo(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - hours * 3600) / 60);
    var seconds = Math.floor(seconds - hours * 3600 - minutes * 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
}

// Volver a repetir la filmación

async function RepetirCaptura() {

    // ¿Esta bien esto? Porque me sube el primer video que grabé, no el nuevo que estoy grabando. 
    //¿Se borra lo guardado con alguna de estas 2 funciones? ¿O se lo estoy aplicando al elemento equivocado?
    // recorder.reset();
    // recorder.clearRecordedData();
    
    form = new FormData(); // para que me suba el ultimo filmado, tengo que sobreescribir el elemento form
    
    repetirCaptura.style.display = "none";
    botonSubir.style.display = "none";
    gifGrabado.style.display = "none";
    botonGrabar.style.display = "inherit";

    resultado = await getStreamAndRecord();
    video.style.display = "block";
}


// Subir a Gifos al Local Storage 

var arrayGifsPropios;

function SubirGrabacionAGifos() {
    dos.style.backgroundColor = "#ffffff";
    dos.style.color = "#572EE5";
    tres.style.color = "#ffffff";
    tres.style.backgroundColor = "#572EE5";
    cuadroAzul.style.display = "block";

    fetch("https://upload.giphy.com/v1/gifs", {
        method: "POST",
        body: form,
    })
        .then(respuesta => {
            return respuesta.json();
        })
        .then(nuevoObjetoRecibido => {
            document.getElementById("txtEstado").innerHTML = "GIFO subido con éxito";
            document.getElementById("iconoEstado").style.content = "url(./images/ok.svg)";
            document.getElementById("iconoDescarga").style.opacity = "1";
            document.getElementById("iconoCompartir").style.opacity = "1";

            let gifId = nuevoObjetoRecibido.data.id;  //el id de ese gif subido
            arrayGifsPropios.push(gifId);

            localStorage.setItem('MisGifs', JSON.stringify(arrayGifsPropios)); // me lo sube al local Storage

        })
        .catch(error => {
            console.log("Error! " + error);
        });
}


/// Local storahe


// Agregar a Mis Gifos

let StringDeGifsPropios = localStorage.getItem("MisGifs");

if (StringDeGifsPropios == null || StringDeGifsPropios == "[]"){
   var arrayGifsPropios = [];
} else {
    var arrayGifsPropios = JSON.parse(StringDeGifsPropios);
}
