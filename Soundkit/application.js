
var soundList = {
    a: "boom",
    s: "clap",
    d: "hihat",
    f: "kick",
    g: "openhat",
    h: "ride",
    j: "snare",
    k: "tink",
    l: "tom"
}

// Tworzenie eventow
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("mouseup", mouseUp);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("click", clickHandler);

//tworzenie podstawowych tablic
var track = [[]], record = [], time = [], sound= [];

//dzwięki

//puszczenie klawisza
function keyUp(e) {
    if (document.getElementById(e.key)) {
        document.getElementById(e.key).classList.remove('key-pressed')
    }
}
//naciskanie myszki
function mouseDown(e) {
    if (Object.keys(soundList).indexOf(e.target.id) > -1) {
        e.target.classList.add('key-pressed')
    }
}
//puszczenie myszki
function mouseUp(e) { 
    if (Object.keys(soundList).indexOf(e.target.id) > -1) {
        e.target.classList.remove('key-pressed')
    }
}

function clickHandler(e) { 
    if (Object.keys(soundList).indexOf(e.target.id) > -1) {
        playKey({ key: e.target.id });
    }
}

//wczytywanie dzwięków
function loadAudio() {
    Object.values(soundList).forEach((e) => sound[e] = new Audio('./sounds/' + e + '.wav'));
}
//naciskanie klawisza
function keyDown(e) {
    if (document.getElementById(e.key)) {
        document.getElementById(e.key).classList.add('key-pressed')
        playKey(e);
    }
}

//nagrywanie 
function startRecord(tracknumber) {
    if (!record[tracknumber]) {
        record[tracknumber] = true;
        time[tracknumber] = Date.now();
        track[tracknumber] = [];
        document.getElementById("rButton" + tracknumber).innerText = "Stop recording";

    }
    else {
        record[tracknumber] = false;
        document.getElementById("rButton" + tracknumber).innerText = "Record track " + tracknumber;
        document.getElementById("status" + tracknumber).innerText = track[tracknumber].length + " Sounds recorded in "
         + Math.round(track[tracknumber][track[tracknumber].length-1].delay/100)/10+"sec";
    }
}

//odtwarzanie dzwieku
function playKey(e) { 
    sound[soundList[e.key]].currentTime=0;
    sound[soundList[e.key]].play();
    console.log(soundList[e.key]);

    for (i = 1; i <= track.length; i++){ 
        if (record[i]) {
            if (Object.keys(soundList).indexOf(e.key) > -1) {
                track[i].push(
                    {
                        delay: Date.now() - time[i],
                        key: e.key
                    })
            }
        }
    }
}
var timeout = [], koniec = [];

//odtwarzanie sciezki
function playRecord(tracknumber) {

    if (!timeout[tracknumber] && track[tracknumber][0]) {

        track[tracknumber].forEach((e) => {

            timeout[tracknumber] = setTimeout(() => { playKey(e) }, e.delay);
        })

        document.getElementById("playButton" + tracknumber).innerText = "Stop playing";

        koniec[tracknumber] = setTimeout(() => playRecord(tracknumber), track[tracknumber][track[tracknumber].length - 1].delay + 10) 
    }
    else {

        clearTimeout(koniec[tracknumber]);
        
        do {
            clearTimeout(timeout[tracknumber]);
        }
        while (timeout[tracknumber]--)
        timeout[tracknumber] = false;
        document.getElementById("playButton" + tracknumber).innerText = "Play track " + tracknumber;
    }
}
