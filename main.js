//let speech = new SpeechSynthesisUtterance();

//speech.lang = "ru-RU";

let voices = [];
let defaultVoice;
// // Volume input
// document.querySelector("#volume").addEventListener("input", () => {
//     const volume = document.querySelector("#volume").value;

//     speech.volume = volume;

//     document.querySelector("#volume-label").innerHTML = volume;
// });

// // Rate input
// document.querySelector("#rate").addEventListener("input", () => {
//     const pitch = document.querySelector("#rate").value;

//     speech.pitch = pitch;

//     document.querySelector("#rate-label").innerHTML = pitch;
// });

// // Pitch input
// document.querySelector("#pitch").addEventListener("input", () => {
//     const rate = document.querySelector("#pitch").value;

//     speech.rate = rate;

//     document.querySelector("#pitch-label").innerHTML = rate;
// });


// Voice
window.speechSynthesis.onvoiceschanged = () => {

    voices = window.speechSynthesis.getVoices();

    // speech.voice = voices[0];

    // let voiceSelect = document.querySelector("#voices");
    // voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));

    defaultVoice = voices.find((voice) => voice.name === "Google русский");
}

// document.querySelector("#voices").addEventListener("change", () => {
//     speech.voice = voices[document.querySelector("#voices").value];
// })


// Talk
document.querySelector("#start").addEventListener("click", () => {
    //speech.text = document.querySelector("textarea").value;
    const textContent = document.querySelector("textarea").value;
    const splitText = textContent.split(".");
    //speech.text = splitText;
    splitText.forEach((text) => {
             const trimmed = text.trim();
            // speech.text = trimmed;
             //console.log(speech);
             if (trimmed) {
                const U = test(trimmed);
                console.log(U);
                window.speechSynthesis.speak(U);
            }
        //console.log(speech);

    })
    // speech.volume = 1;
    // speech.rate = 1;
    // speech.pitch = 1;

});

const test = (text) => {
    let newSpeech = new SpeechSynthesisUtterance(text)
    
    newSpeech.voice = defaultVoice;
    newSpeech.lang = defaultVoice.lang;
    newSpeech.volume = 1;
    newSpeech.rate = 1;
    newSpeech.pitch = 1;

    newSpeech.onerror = (err) => console.error(err);
    newSpeech.onstart = () => console.log("start");
    newSpeech.onpause = () => console.log("pause");
    newSpeech.onresume = () => console.log("resume");
    newSpeech.onend = () => console.log("end");
    //window.speechSynthesis.speak(newSpeech);
    //console.log(newSpeech);
    return newSpeech;
}

// Pause
document.querySelector("#pause").addEventListener("click", () => {
    window.speechSynthesis.pause();
});

// Resume
document.querySelector("#resume").addEventListener("click", () => {
    window.speechSynthesis.resume();
});

// Cancel
document.querySelector("#cancel").addEventListener("click", () => {
    window.speechSynthesis.cancel();
});
