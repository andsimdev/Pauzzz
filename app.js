// HTML-ELEMENT
const clockEl = document.getElementById("clock");
const inputtimeEl = document.getElementById("input-time");
const submitEl = document.getElementById("submit");
const countdownEl = document.getElementById("countdown");

// GLOBALA VARIABLER
let startTimeMilli = 0;

// EVENTHANTERARE
submitEl.addEventListener("click", startCountdown);

// FUNKTIONER

// Prevent sumbit
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault()
});

// Klocka
function showTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = addZero(m);
    s = addZero(s);
    clockEl.innerHTML = h + ":" + m + " " + s;
}

// Addera nolla i klockan vid behov
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
}

showTime();

// Kör klockfunktionen varje sekund
setInterval(showTime, 1000);

// Hämta inmatad starttid (Kör vid submit)
function startCountdown() {
    console.log("Kör startCountdown...");

    // Nuvarande tid
    const now = new Date();

    // Nuvarande datum
    const today = now.toLocaleDateString();

    // Nuvarande tid i millisekunder
    nowMilli = now.getTime();

    // Hämta inmatad tid från formuläret
    let inputtime = inputtimeEl.value;

    // Tid till mötesstart (lägg till dagens datum först)
    inputtime = today + "T" + inputtime;

    // Konvertera till datumobjekt
    let startTime = new Date(inputtime);

    // Tid för mötesstart i millisekunder (sätt värde på global variabel)
    startTimeMilli = startTime.getTime();

    timeLeft();

    // Kör återstående tid varje sekund
    setInterval(timeLeft, 1000);
}

// ÅTERSTÅENDE TID TILL MÖTESSTART
function timeLeft() {
    // Räkna ut återstående tid till mötesstart
    let timeLeft = startTimeMilli - nowMilli;

    // Räkna om återstående tid till minuter
    const second = 1000;
    const minute = second * 60;

    // Minuter
    let minutesLeft = timeLeft / minute;
    let minutesToStart = Math.ceil(minutesLeft);

    console.log(minutesToStart);

    // Skriv ut återstående tid till sidan
    countdownEl.innerHTML = minutesToStart;
};