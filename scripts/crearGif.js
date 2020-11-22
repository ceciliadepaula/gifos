// Traigo elementos del html a usar o cambiar
let uno = document.getElementById("uno");
let dos = document.getElementById("dos");
let tres = document.getElementById("tres");

let botonComenzar = document.getElementById("botonComenzar");
let botonGrabar = document.getElementById("botonGrabar");
let botonFinalizar = document.getElementById("botonFinalizar");
let botonSubir = document.getElementById("botonSubir");

let tituloPermisos = document.getElementById("tituloPermisos");
let textoPermisos = document.getElementById("textoPermisos");
let gifGrabado = document.getElementById("gifGrabado");

let video = document.getElementById("video");
video.style.display = "none";

let recorder;
let blob;
let form = new FormData();

/* let dateStarted; */



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

    resultado = await getStreamAndRecord();
    /* video.src = resultado; */

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
    uno.style.backgroundColor = "#ffffff";
    uno.style.color = "#572EE5";
    botonGrabar.style.display = "none";
    botonFinalizar.style.display = "inherit";

    recorder.startRecording();
    botonFinalizar.addEventListener("click", FinalizarGrabacion);

}

// Finalizar grabación

function FinalizarGrabacion() {

    //me tiene que aparecer el texto de si quiere repetirlo.  si lo clickea, va a granar video de nuevpo

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

    botonSubir.addEventListener("click", SubirGrabacionAGifos);
}

// Subir a Gifos

function SubirGrabacionAGifos() {
    //aparecer pantalla lila con iconos y texto de gifo subido con exito
    // botton 3 lila


    fetch("https://upload.giphy.com/v1/gifs", {
        method: "POST",
        body: form,
    })
        .then(respuesta => {
            return respuesta.json();
        })
        .then(nuevoObjetoRecibido => {
            console.log(nuevoObjetoRecibido);
            let gifId = nuevoObjetoRecibido.data.id;  //el id de ese gif subido

            
        })
        .catch(error => {
            console.log("Error! " + error);
        });
}