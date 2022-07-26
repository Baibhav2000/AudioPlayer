var audioFile = new Audio('audios/E Ve - Avant.mp3');
var progress = document.getElementById("progress");
let presentTime = document.getElementById("current");
let duration = document.getElementById("duration");

function time(time){
    let minutes = Math.trunc(time/60);
    let seconds = Math.trunc(time%60);
    let result = minutes+":";
    if(seconds>=0 && seconds <=9)
        result += "0"+seconds;
    else
        result += seconds;

    return result;
}

function playPauseMusic(){
    let image = document.getElementById("play/pause").getAttribute("src").slice(0,-4).slice(7);
    if(image === "play"){
        document.getElementById("song-name").innerText = "E Ve - Avant";
        audioFile.play();
        document.getElementById("play/pause").setAttribute("src","images/pause.png");

        let interval = setInterval(function(){
            let maxTime = audioFile.duration;
            duration.innerHTML = time(Math.trunc(maxTime));
            let currTime = audioFile.currentTime;
            presentTime.innerHTML = time(Math.trunc(currTime));
            progress.value = currTime/maxTime * 100;
            if(audioFile.currentTime === audioFile.duration){
                document.getElementById("play/pause").setAttribute("src", "images/play.png");
                progress.value = 0;
                presentTime.innerHTML = "-:-";
                duration.innerHTML = "-:-";
                document.getElementById("song-name").innerText = "";
                clearInterval(interval);
            }
        },1000);
    }
    else{
        audioFile.pause();
        document.getElementById("play/pause").setAttribute("src", "images/play.png");
    }
}

progress.addEventListener("click", e=>{
    var clickPos = e.pageX - progress.offsetLeft;
    var maxWidth = progress.offsetWidth;
    let pct = clickPos/maxWidth * 100;
    progress.value = pct;
    audioFile.currentTime = pct/100*audioFile.duration;
    presentTime.innerHTML = time(audioFile.currentTime);
});
