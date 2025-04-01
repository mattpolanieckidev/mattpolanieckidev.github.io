
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

        function toggleDarkMode() {
            const body = document.body;
            const darkModeToggle = document.getElementById("darkModeToggle");
            const isDarkMode = body.classList.toggle("dark-mode");

            darkModeToggle.innerHTML = isDarkMode ? "☀️" : "🌙";
            localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
        }

        // Initialize the count when page loads
        updateDaysCompleted();