// ----- HTML-ELEMENT -----
const bodyEl = document.getElementById("body");
const clockEl = document.getElementById("clock");
const inputformEl = document.getElementById("inputform");
const inputtimeEl = document.getElementById("input-time");
const submitEl = document.getElementById("submit");
const countdownsectionEl = document.getElementById("countdownsection");
const countdownEl = document.getElementById("countdown");
const starttimespanEl = document.getElementById("starttime");
const soundEl = document.getElementById("sound");
const introsoundEl = document.getElementById("introsound");


// ----- GLOBALA VARIABLER -----
let startTimeMilli = 0;


// ----- FUNKTIONER -----
// Prevent default on sumbit
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
});

// Klocka
function showTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);
    clockEl.innerHTML = h + ":" + m + " " + "<span class='seconds'>" + s + "</span>";
}

// Addera nolla i klockan vid behov
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
}

// Visa nuvarande tid som förvalt
function defaultTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = addZero(m);
    h = addZero(h);
    let time = h + ":" + m;
    inputtimeEl.value = time;
}

defaultTime();

// Hämta inmatad starttid (Kör vid submit)
function startCountdown() {
    // Nuvarande tid
    const now = new Date();

    // Nuvarande datum
    const today = now.toLocaleDateString();

    // Hämta inmatad tid från formuläret
    let inputtime = inputtimeEl.value;

    // Tid till mötesstart (lägg till dagens datum först)
    let inputtimedate = today + "T" + inputtime;

    // Konvertera till datumobjekt
    let startTime = new Date(inputtimedate);

    // Tid för mötesstart i millisekunder (sätt värde på global variabel)
    startTimeMilli = startTime.getTime();

    // Visa mötets starttid
    starttimespanEl.innerHTML = inputtime;

    // Visa klockan
    showTime();

    // Visa återstående tid
    timeLeft();

    // Kör återstående tid varje sekund
    setInterval(timeLeft, 1000);

    // Kör klockfunktionen varje sekund
    setInterval(showTime, 1000);

    // Dölj formulär
    inputformEl.style.opacity = 0;
    inputformEl.style.zIndex = -1;

    // Visa nedräkningssektion
    countdownsectionEl.style.opacity = 1;

    introsoundEl.volume = 0.15;
    introsoundEl.play();
}

// Återstående tid till mötesstart
function timeLeft() {
    // Nuvarande tid
    const now = new Date();

    // Nuvarande tid i millisekunder
    let nowMilli = now.getTime();

    // Räkna ut återstående tid till mötesstart
    let timeLeft = startTimeMilli - nowMilli;

    // Räkna om återstående tid till minuter
    const second = 1000;
    const minute = second * 60;

    // Minuter
    let minutesLeft = timeLeft / minute;
    let minutesToStart = Math.ceil(minutesLeft);

    // Skriv ut återstående tid till sidan
    countdownEl.innerHTML = minutesToStart;

    // På mötestiden
    if (minutesToStart <= 0) {
        countdownsectionEl.innerHTML = "<p class='soon'>Lektionen startar strax 🎉</p>";
    }

    // Vid en minut kvar till mötet
    // if(minutesToStart <= 1) {
    //     soundEl.volume = 0.15;
    //     soundEl.play();
    // }

    // Dölj muspekaren vid helskärm
    if (document.fullscreenElement) {
        bodyEl.style.cursor = "none";
    } else {
        bodyEl.style.cursor = "default";
    }
};

// ----- EVENTHANTERARE -----
submitEl.addEventListener("click", startCountdown);


// ----- FUNKTIONSANROP -----
// Kör funktionen showTime för att visa tiden
showTime();

// Kör klockfunktionen varje sekund
setInterval(showTime, 1000);

// Helskärm vid dubbelklick
bodyEl.addEventListener("dblclick", () => {
    // Starta helskärm
    document.documentElement.requestFullscreen();
})

window.onload = function () {
    // Sätt fokus på input-fältet
    inputtimeEl.focus();
};

document.addEventListener("keyup", function(event) {
  if (event.key === "q") {
    // Gradvis sänk ljudvolymen
    const numSteps = 10;
    const fadeOutDuration = 1000;

    let currentStep = 0;
    const initialVolume = introsoundEl.volume;

    const fadeOutInterval = setInterval(() => {
      currentStep++;
      const targetVolume = initialVolume - (currentStep / numSteps) * initialVolume;
      introsoundEl.volume = targetVolume;

      if (currentStep >= numSteps) {
        // När vi har nått det sista steget, stoppa intervallet och tysta ljudet helt
        clearInterval(fadeOutInterval);
        introsoundEl.pause();
        introsoundEl.volume = initialVolume; // Återställ volymen till dess ursprungliga värde

        // Skicka ett meddelande till överordnade fönstret (presentationen)
        window.parent.postMessage("qKeyPressed", "*");
      }
    }, fadeOutDuration / numSteps);
  }
});
