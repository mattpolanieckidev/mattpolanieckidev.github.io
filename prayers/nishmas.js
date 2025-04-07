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
//2. The function updates the number of days left and days completed.
//3. It would show the days completed as "xx of 40 days".
//4. The day is completed when the user clicks the "Day Completed" button.
//4. The days completed are stored in local storage.

function cycleStart(){
    const startDate = document.getElementById("startDate").value;
    localStorage.setItem("startDate", startDate);
    updateDaysCompleted();
}

function updateDaysCompleted() {
    const startDate = new Date(localStorage.getItem("startDate"));
    const today = new Date();
    const daysLeft = Math.floor((today - startDate) / (1000 * 3600 * 24));
    const daysCompleted = 40 - daysLeft;
    document.getElementById("daysCompleted").textContent = `You have completed ${daysCompleted} of 40 days`;
    
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


// Initialize the count and dark mode when page loads
updateDaysCompleted();
applyDarkModePreference();