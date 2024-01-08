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
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
});

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

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
}

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

function startCountdown() {
    const now = new Date();
    const today = now.toLocaleDateString();
    let inputtime = inputtimeEl.value;
    let inputtimedate = today + "T" + inputtime;
    let startTime = new Date(inputtimedate);
    startTimeMilli = startTime.getTime();
    starttimespanEl.innerHTML = inputtime;
    showTime();
    timeLeft();
    setInterval(timeLeft, 1000);
    setInterval(showTime, 1000);
    inputformEl.style.opacity = 0;
    inputformEl.style.zIndex = -1;
    countdownsectionEl.style.opacity = 1;
}

function timeLeft() {
    const now = new Date();
    let nowMilli = now.getTime();
    let timeLeft = startTimeMilli - nowMilli;
    const second = 1000;
    const minute = second * 60;
    let minutesLeft = timeLeft / minute;
    let minutesToStart = Math.ceil(minutesLeft);
    countdownEl.innerHTML = minutesToStart;

    if (minutesToStart <= 0) {
        countdownsectionEl.innerHTML = "<p class='soon'>The lecture will start soon 🎉</p>";
    }

    if (document.fullscreenElement) {
        bodyEl.style.cursor = "none";
    } else {
        bodyEl.style.cursor = "default";
    }
};

// ----- FUNKTIONSANROP -----
showTime();
setInterval(showTime, 1000);

// ----- EVENTHANTERARE -----
submitEl.addEventListener("click", startCountdown);

bodyEl.addEventListener("dblclick", () => {
    document.documentElement.requestFullscreen();
})

window.onload = function () {
    inputtimeEl.focus();
};