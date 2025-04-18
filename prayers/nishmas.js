function today(){
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    return "Today is: " +month+ "/" + day + "/" + year;
    
}
document.getElementById("date").innerHTML = today();

//function to keep track of Nishmas 40 day cycle. 
//1.User sets the start date of the cycle in the date input and it is stored in local storage. 
//2. The function counts how many days it has been since the start date and displays the number of days completed out of 40.
//3. The function is called when the user loads the page and when the user clicks the "Start Cycle" button.
//4. The function also checks if the user has set a start date before and uses that date to calculate the days completed.
//5. After 40 days are completed, it should start the count over again but retain how many times I've completed a 40 day cycle.
function cycleStart(){
    const startDate = document.getElementById("startDate").value;
    localStorage.setItem("startDate", startDate);
    updateDaysCompleted();
}

function updateDaysCompleted() {
    const startDate = new Date(localStorage.getItem("startDate"));
    const today = new Date();
    const daysLeft = Math.floor((today - startDate) / (1000 * 3600 * 24));
    const daysCompleted = Math.max(0, Math.min(daysLeft, 40)); // Ensure daysCompleted is between 0 and 40
    document.getElementById("daysCompleted").textContent = `You have completed ${daysCompleted} of 40 days`;
    document.getElementById("startDate").value = startDate.toISOString().split("T")[0]; // Update the input field with the stored date
   // Start a new cycle if 40 days have been completed. Retain original start date and mark how many cycles have been completed. 
    if (daysCompleted === 40) {
        const cyclesCompleted = parseInt(localStorage.getItem("cyclesCompleted")) || 0;
        localStorage.setItem("startDate", startDate.toISOString().split("T")[0]);
        localStorage.setItem("cyclesCompleted", cyclesCompleted + 1);
        document.getElementById("startDate").value = startDate.toISOString().split("T")[0];
        document.getElementById("daysCompleted").textContent = `You have completed ${daysCompleted} of 40 days. You have completed ${cyclesCompleted + 1} cycles`;
     
    }
}



// Check for dark mode preference on page load
function applyDarkModePreference() {
    const body = document.body;
    const darkModeToggle = document.getElementById("darkModeToggle");
    const darkModePreference = localStorage.getItem("darkMode");
    
    if (darkModePreference === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.innerHTML = "☀️";
    } else {
        body.classList.remove("dark-mode");
        darkModeToggle.innerHTML = "🌙";
    }
}
function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById("darkModeToggle");
    const isDarkMode = body.classList.toggle("dark-mode");
    
    darkModeToggle.innerHTML = isDarkMode ? "☀️" : "🌙";
    darkModeToggle.setAttribute("aria-pressed", isDarkMode); // Update aria-pressed
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

function toggleSettings() {
    const settings = document.getElementById("settingsContainer");
    settings.style.display = settings.style.display === "none" ? "block" : "none";
}

// Initialize the count and dark mode when page loads
updateDaysCompleted();
applyDarkModePreference();