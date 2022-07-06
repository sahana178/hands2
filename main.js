Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_img" src="'+data_uri+'">';
    });
}

console.log('ml5.version',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xbZ7eVJD6/', modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speakdata_1 = "The first prediction is " + prediction_1;
    utterThis = new SpeechSynthesisUtterance(speakdata_1);
    synth.speak(utterThis);
}
 
function check(){
    img = document.getElementById('capture_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
   if (error) {
       console.error( error);
   } else {
        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "Thumbs Up"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if(results[0].label == "Peace"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if(results[0].label == "Super"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
      }
    }
