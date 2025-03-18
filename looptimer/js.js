let timer;
let timeString = "";
let isLooping = document.getElementById('loop').checked;

document.getElementById('loop').addEventListener('change', function() {
    isLooping = this.checked;
});

function appendNumber(num) {
    timeString += num;
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
    timeString = formatTime(totalSeconds); 
    updateDisplay(timeString);
    clearInterval(timer);
    timer = setInterval(function() {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay(formatTime(totalSeconds));
        } else {
            clearInterval(timer);
            if (isLooping) {
                totalSeconds = parseTime(timeString);
                updateDisplay(formatTime(totalSeconds));
                timer = setInterval(arguments.callee, 1000);
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function updateDisplay(value) {
    document.getElementById('timer').textContent = value;
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function formatInput(input) {
    if (input.length <= 2) {
        return `00:${input.padStart(2, '0')}`;
    } else {
        let minutes = input.slice(0, -2) || "0";
        let seconds = input.slice(-2);
        return `${minutes.padStart(2, '0')}:${seconds}`;
    }
}

function parseTime(input) {
    if (input.length <= 2) {
        return parseInt(input, 10) || 0;
    }
    let minutes = parseInt(input.slice(0, -2), 10) || 0;
    let seconds = parseInt(input.slice(-2), 10) || 0;
    return minutes * 60 + seconds;
}

function toggleFullscreen() {
    document.getElementById("number-pad").classList.toggle("fullscreen-mode");
    document.getElementById("timer").classList.toggle("ftimer");
    document.querySelector("h1").classList.toggle("fullscreen-mode")

}