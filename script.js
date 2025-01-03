console.clear();

/* COUNTDOWN */ 
/*
original code from iCodeThis xmas challenge: https://icodethis.com/modes/design-to-code/252/submissions/270252
*/

const today = new Date();
const currentYear = today.getFullYear();

// Check if Christmas has passed for the current year
const christmasThisYear = new Date(`${currentYear}-12-25T00:00:00`);
const EXP_DATE = today <= christmasThisYear ? christmasThisYear : new Date(`${currentYear + 1}-12-25T00:00:00`);
const SPEED = 150;


/***************** COUNTDOWN ********************/
const panelCountdown = document.querySelector("#panel-countdown");

// Select elements and spans dynamically
const countdownElements = ["months", "days", "hours", "minutes", "seconds"];
const elements = {};
const currentValues = {};

countdownElements.forEach((id) => {
  elements[id] = document.querySelectorAll(`#${id} span`);
  currentValues[id] = [];
});


function getCurrentDate() {
  const currentDate = new Date();
  const timeDifference = EXP_DATE - currentDate;

  return {
    months: Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44)),
    days: Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
}

function updateCountdown() {
  const currentDate = getCurrentDate();

  countdownElements.forEach((unit, index) => {
    const paddedValue = padTo2(currentDate[unit]);

    paddedValue.split("").forEach((digit, i) => {
      if (digit !== currentValues[unit][i]) {
        changeNum(elements[unit][i], digit, SPEED * (countdownElements.length - index));
      }
    });

    currentValues[unit] = paddedValue.split("");
  });
}

function initialLoad() {
  const currentDate = getCurrentDate();

  countdownElements.forEach((unit) => {
    const paddedValue = padTo2(currentDate[unit]);
    currentValues[unit] = paddedValue.split("");

    elements[unit][0].innerText = currentValues[unit][0];
    elements[unit][1].innerText = currentValues[unit][1];
  });
}

// Initialize the countdown display
initialLoad();

// Interval to update the countdown every second
let EXP_DATEInterval;

function startCountdownInterval() {
  clearInterval(EXP_DATEInterval);
  EXP_DATEInterval = setInterval(updateCountdown, 1000);
}
startCountdownInterval();

// change the numbers
function changeNum(el, newVal, timing) {
  el.style.scale = 0;
  setTimeout(() => {
    el.innerText = "";
    el.style.translate = '0 -5rem';
    setTimeout(() => {
        el.style.scale = 1;
        el.innerText = newVal;
        setTimeout(() => {
            el.style.translate = '0';
        }, timing);
    }, timing);
  }, timing);
}




function padTo2(num) {
  return num.toString().padStart(2, "0");
}
