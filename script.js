const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const minutesInput = document.getElementById("minutesInput");

let timeLeft = Number(minutesInput.value) * 60;
let timer = null;
let isPaused = false;

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function playSound() {
  const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  audio.play().catch(() => {});
}

function startTimer() {
  if (timer !== null) return;

  if (!isPaused) {
    timeLeft = Number(minutesInput.value) * 60;
  }

  timer = setInterval(function () {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      timeLeft = 0;
      isPaused = false;
      updateDisplay();
      playSound();
    }
  }, 1000);

  isPaused = false;
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
  isPaused = true;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isPaused = false;
  timeLeft = Number(minutesInput.value) * 60;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();