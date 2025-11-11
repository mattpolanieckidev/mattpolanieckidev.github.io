// Wrap in DOMContentLoaded to ensure elements exist before we query them.
document.addEventListener('DOMContentLoaded', () => {
  let timer = null;
  let timeString = "";
  let originalTimeSeconds = 0;
  const timerEl = document.getElementById('timer');
  const loopCheckbox = document.getElementById('loop');

  // expose minimal functions to global scope so inline onclick works
  window.appendNumber = appendNumber;
  window.clearTime = clearTime;
  window.startTimer = startTimer;
  window.stopTimer = stopTimer;
  window.toggleFullscreen = toggleFullscreen;

  function appendNumber(num) {
    timeString += String(num);
    updateDisplay(formatInput(timeString));
  }

  function clearTime() {
    timeString = "";
    updateDisplay("00:00");
  }

  function startTimer() {
    let totalSeconds = parseTime(timeString);
    if (totalSeconds <= 0 || isNaN(totalSeconds)) {
      alert("Please enter a valid time.");
      return;
    }

    originalTimeSeconds = totalSeconds;
    updateDisplay(formatTime(totalSeconds));
    clearInterval(timer);

    timer = setInterval(function tick() {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay(formatTime(totalSeconds));
      } else {
        clearInterval(timer);
        triggerFlash(); // your flash effect
        if (loopCheckbox.checked) {
          totalSeconds = originalTimeSeconds;
          updateDisplay(formatTime(totalSeconds));
          timer = setInterval(tick, 1000);
        }
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function updateDisplay(value) {
    timerEl.textContent = value;
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function formatInput(input) {
    if (input.length <= 2) {
      return `00:${input.padStart(2, '0')}`;
    } else {
      const minutes = input.slice(0, -2) || "0";
      const seconds = input.slice(-2);
      return `${minutes.padStart(2, '0')}:${seconds}`;
    }
  }

  function parseTime(input) {
    if (!input) return 0;
    if (input.length <= 2) {
      return parseInt(input, 10) || 0;
    }
    const minutes = parseInt(input.slice(0, -2), 10) || 0;
    const seconds = parseInt(input.slice(-2), 10) || 0;
    return minutes * 60 + seconds;
  }

  function toggleFullscreen() {
    document.getElementById("number-pad").classList.toggle("fullscreen-mode");
    document.getElementById("timer").classList.toggle("ftimer");
    document.querySelector("h1").classList.toggle("fullscreen-mode");

    if (!document.fullscreenElement) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  }

  // Flash effect: add/remove CSS class on <body>
  function triggerFlash() {
    document.body.classList.add('flash');
    // duration should match your CSS animation length
    setTimeout(() => document.body.classList.remove('flash'), 2000);
  }
});
