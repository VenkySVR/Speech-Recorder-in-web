// var mediaRecorder;
// var recordedChunks;
var gumStream;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const audioPlayer = document.getElementById('player');
const downloadLink = document.getElementById('download');
stopButton.disabled = true;

// startButton.addEventListener('click', startRecording);
// stopButton.addEventListener('click', stopRecording);



// function startRecording() {
// document.getElementById('status').innerHTML = "Recording...";

// startButton.disabled = true;
// stopButton.disabled = false;


//     navigator.mediaDevices.getUserMedia({
//         audio: true, video: false
//     }).then((stream) => {
//         mediaRecorder = new MediaRecorder(stream);
//         recordedChunks = [];

//         mediaRecorder.start();
//         mediaRecorder.addEventListener('dataavailable', (e) => {
//             recordedChunks.push(e.data);
//         });


//     }).catch((err) => {
//         startButton.disabled = false;
//         stopButton.disabled = true;
//     });


// }

// function stopRecording() {
// document.getElementById('status').innerHTML = "Click on start to record."
// startButton.disabled = false;
// stopButton.disabled = true;

//     mediaRecorder.stop();

// const audioBlob = new Blob(recordedChunks);
// const audioUrl = URL.createObjectURL(audioBlob);

// audioPlayer.controls = true;
// audioPlayer.src = audioUrl;

//     downloadLink.href = audioUrl;
// downloadLink.download = new Date().toISOString() + '.wav';

// }

const speechRecorder = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    const recordedChunks = [];
    gumStream = stream;

    document.getElementById('status').innerHTML = "Recording...";
    startButton.disabled = true;
    stopButton.disabled = false;
    mediaRecorder.start();


    mediaRecorder.addEventListener('dataavailable', (e) => {
        recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(recordedChunks);
        const audioUrl = URL.createObjectURL(audioBlob);


        audioPlayer.controls = true;
        audioPlayer.src = audioUrl;
        downloadLink.href = audioUrl;
        downloadLink.download = new Date().toISOString() + '.wav';


        // $.ajax({
        //     url: Flask.url_for('index'),
        //     type: 'POST',
        //     data: audioBlob,
        // }).done(function(result){
        //     console.log(result)
        // })


    });




    stopButton.addEventListener('click', () => {
        document.getElementById('status').innerHTML = "Click on start to record."
        startButton.disabled = false;
        stopButton.disabled = true;
        mediaRecorder.stop();
        gumStream.getAudioTracks()[0].stop();
        audioPlayer.src = downloadLink.href;

    });


};


startButton.addEventListener('click', () => {
    
    navigator.mediaDevices.getUserMedia({
        audio: true, video: false
    }).then(speechRecorder).catch((err) => {
        startButton.disabled = false;
        stopButton.disabled = true;
    });

});


// console.log(recordedChunks);
