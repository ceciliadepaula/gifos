// Traigo elementos del html a usar o cambiar
uno = document.getElementById("uno");
dos = document.getElementById("dos");
tres = document.getElementById("tres");
botonComenzar = document.getElementById("botonComenzar");
tituloPermisos = document.getElementById("tituloPermisos");
textoPermisos = document.getElementById("textoPermisos");

video = document.getElementById("video");
video.style.display = "none";

// Defino Eventos
botonComenzar.addEventListener("click", PantallaPermisos);

function PantallaPermisos() {
    tituloPermisos.innerHTML = "¿Nos das acceso <br> a tu cámara?";
    textoPermisos.innerHTML = "El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.";
    uno.style.backgroundColor = "#572EE5";
    uno.style.color = "#ffffff";
    botonComenzar.style.visibility = "hidden";
    dos.addEventListener("click", AbrirCamara);  // Hacer que cuando paso el mouse por arriba se muestre la mano  a:hover { cursor: pointer; } 
}

// Dar acceso a la camara y mostrar en tiempo real

async function AbrirCamara() {
    dos.style.backgroundColor = "#572EE5";
    dos.style.color = "#ffffff";
    tituloPermisos.style.display = "none";
    textoPermisos.style.display = "none";
    uno.style.backgroundColor = "#ffffff";
    uno.style.color = "#572EE5";
    botonComenzar.style.visibility = "visible";
    botonComenzar.innerHTML = "<p> Grabar </p>";
    video.style.display = "inherit";

    resultado = await getStreamAndRecord();
    video.src = resultado;

    botonComenzar.addEventListener("click", GrabarVideo);
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
            video.play();
        })
        .catch(err => {
            console.log("Error: " + err);
        });
}

// Empezar a grabar video

/* let recorder = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function () {
        console.log('started')
    },
}); */

function GrabarVideo() {

    uno.style.backgroundColor = "#ffffff";
    uno.style.color = "#572EE5";

    botonComenzar.style.visibility = "visible";
    botonComenzar.innerHTML = "<p> Finalizar </p>";
    botonComenzar.addEventListener("click", FinalizarGrabacion);

    // Agregar conteo a la derecha

    /*     let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    let recorder = new RecordRTCPromisesHandler(stream, {
        type: 'video'
    });
    recorder.startRecording(); */


    /* recorder.startRecording(); */

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    }).then(async function (stream) {
        /* let recorder = RecordRTC(stream, {
            type: 'gif'
        }); */
        recorder.startRecording();

    });
}

// Parar filmación

function FinalizarGrabacion() {

    //-----------------------

    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);

        alert("termino");
    });

    //boton subir gifos. hacer evento al hacer click SubirGrabacionAGifos
    //donde aparecia el conteo, poner repetir captiura
}

// Subir a Gifos

function SubirGrabacionAGifos() {
    //aparecer pantalla lila con iconos y texto de gifo subido con exito
    // botton 3 lila
}