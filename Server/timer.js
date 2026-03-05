document.addEventListener("DOMContentLoaded", () => {
  const timerDisplay = document.getElementById("timer");
  const sessionLabel = document.getElementById("session-label");
  const nextBreakDisplay = document.getElementById("next-break");
  const progressBar = document.getElementById("progress-bar");

  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const energySelect = document.getElementById("energy");

  let timeLeft = 1500; // default 25 min
  let totalTime = timeLeft;
  let timerInterval = null;
  let isRunning = false;
  let isBreak = false;

  function updateDisplay(seconds = timeLeft) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.innerText = `${minutes}:${secs < 10 ? "0" : ""}${secs}`;

    // Update progress bar
    const progressPercent = ((totalTime - seconds) / totalTime) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update next break timer if focus session
    if (!isBreak) {
      nextBreakDisplay.innerText = `Next break in: ${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    } else {
      nextBreakDisplay.innerText = "On break!";
    }
  }

  function startTimer() {
    if (isRunning) return;

    isRunning = true;
    isBreak = false;
    startBtn.disabled = true;
    sessionLabel.innerText = "Focus Time";

    const energy = energySelect.value;

    if (energy === "low") timeLeft = 900;
    else if (energy === "medium") timeLeft = 1500;
    else if (energy === "high") timeLeft = 2400;

    totalTime = timeLeft; // store total for progress bar
    updateDisplay();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        alert("Focus Session Complete!");

        // Determine break time
        let breakTime;
        if (energy === "low") breakTime = 600;
        else if (energy === "medium") breakTime = 300;
        else if (energy === "high") breakTime = 180;

        startBreak(breakTime);
      }
    }, 1000);
  }

  function startBreak(duration) {
    timeLeft = duration;
    totalTime = duration;
    isBreak = true;
    isRunning = true;
    startBtn.disabled = true;
    sessionLabel.innerText = "Break Time";

    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isBreak = false;
        isRunning = false;
        startBtn.disabled = false;
        sessionLabel.innerText = "Focus Time";
        timeLeft = 1500;
        totalTime = 1500;
        updateDisplay();
        alert("Break over! Ready for the next session.");
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isBreak = false;
    startBtn.disabled = false;
    timeLeft = 1500;
    totalTime = 1500;
    sessionLabel.innerText = "Focus Time";
    updateDisplay();
  }

  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);

  updateDisplay();
});