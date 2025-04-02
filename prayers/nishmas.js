
        function today(){
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth()+1;
            const year = today.getFullYear();
            return "Today is: " +month+ "/" + day + "/" + year;
     
        }
        document.getElementById("date").innerHTML = today();
        
        function updateDaysCompleted() {
            let count = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (localStorage.getItem(key) === "completed") {
                    count++;
                }
            }
            document.getElementById("daysCompleted").innerHTML = `Days Completed: ${count}`;
        }

        function dayCompleted() {
            const day = today();
            const dayCompleted = localStorage.getItem(day);
            if (dayCompleted) {
                alert("Day already completed");
            } else {
                localStorage.setItem(day, "completed");
                updateDaysCompleted();
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


// Initialize the count and dark mode when page loads
updateDaysCompleted();
applyDarkModePreference();