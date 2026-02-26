
let timeLeft = 1500; // 25 minutes
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(function() {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Session Complete!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 1500;
  updateDisplay();
}

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("timer").innerText = minutes + ":" + seconds;
}

