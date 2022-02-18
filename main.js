let voices = [];
let defaultVoice;

let volumeValue = 1;
let pitchValue = 1;
let rateValue = 1;

// Volume input
document.querySelector("#volume").addEventListener("input", () => {
    const volume = document.querySelector("#volume").value;

    volumeValue = volume;

    document.querySelector("#volume-label").innerHTML = volume;
});

// Rate input
document.querySelector("#rate").addEventListener("input", () => {
    const pitch = document.querySelector("#rate").value;

    pitchValue = pitch;

    document.querySelector("#rate-label").innerHTML = pitch;
});

// Pitch input
document.querySelector("#pitch").addEventListener("input", () => {
    const rate = document.querySelector("#pitch").value;

    rateValue = rate;

    document.querySelector("#pitch-label").innerHTML = rate;
});


// Voice
window.speechSynthesis.onvoiceschanged = () => {

    voices = window.speechSynthesis.getVoices();
    defaultVoice = voices[0];
    let voiceSelect = document.querySelector("#voices");
    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
    
    
    //defaultVoice = voices.find((voice) => voice.name === "Google русский"); //test
}

document.querySelector("#voices").addEventListener("change", (e) => {
     defaultVoice = voices[e.target.value];
})


// Talk
document.querySelector("#start").addEventListener("click", () => {
    const textContent = document.querySelector("textarea").value;
    const splitText = textContent.split(".");

    splitText.forEach((text) => {

        const newText = text.split(",");

            newText.forEach((nText)=>{
                const trimmed = nText.trim();

                if (trimmed) {
                   const U = speekText(trimmed);
                   console.log(U);
                   window.speechSynthesis.speak(U);
               }
            })
    })
});

const speekText = (text) => {
    let speech = new SpeechSynthesisUtterance(text)
    
    speech.voice = defaultVoice;
    speech.lang = defaultVoice.lang;
    speech.volume = volumeValue;
    speech.rate = rateValue;
    speech.pitch = pitchValue;

    speech.onerror = (err) => console.error(err);
    speech.onstart = () => console.log("start");
    speech.onpause = () => console.log("pause");
    speech.onresume = () => console.log("resume");
    speech.onend = () => console.log("end");
    return speech;
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

//Cleat text button
document.querySelector("#clear_Text").addEventListener("click",()=>{
    document.querySelector("textarea").value = "";
});