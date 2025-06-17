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
    const startDate = localStorage.getItem("startDate");
    const daysCompletedElement = document.getElementById("daysCompleted");
    const cycleCountElement = document.getElementById("cycleCount");
    const today = new Date();
    if (!startDate) {
        daysCompletedElement.textContent = "Please set a start date.";
        cycleCountElement.textContent = "";
        return;
    }
    const startDateObj = new Date(startDate);
    const timeDiff = today - startDateObj;
    const daysCompleted = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); 
    const cycleCount = Math.floor(daysCompleted / 40); // Calculate how many 40-day cycles have been completed
    const daysInCycle = daysCompleted % 40; // Days completed in the current cycle
    daysCompletedElement.textContent = `Days Completed: ${daysInCycle} out of 40`;
    cycleCountElement.textContent = `Cycle Count: ${cycleCount}`;
    if (daysInCycle === 0) {

        daysCompletedElement.textContent = "Congratulations! You have completed a 40-day cycle!";
        cycleCountElement.textContent = `Cycles Completed: ${cycleCount}`;
    }
    else {
        daysCompletedElement.textContent = `Days Completed: ${daysInCycle} out of 40`;
        cycleCountElement.textContent = `Cycles Completed: ${cycleCount}`;
    }
    daysCompletedElement.style.display = "block";
    cycleCountElement.style.display = "block";
    document.getElementById("startDate").value = startDate; // Keep the input value consistent
    

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


function updateTextContent(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}
function getOmerDate() {
    const textContentOmer = document.getElementById("omer");
    const omerbutton = document.getElementById("omerbutton");
	const url = `https://www.hebcal.com/hebcal?maj=on&cfg=json&start=${new Date().toISOString().split('T')[0]}&zip=11516&nx=on&gs=on&o=on&end=${new Date().toISOString().split('T')[0]}`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			const omerData = data.items.find(item => item.category === 'omer');
			if (omerData) {
				const { date} = omerData;
				const count = omerData.omer.count;
				const sefira = omerData.omer.sefira;
				const numbers = omerData.title_orig.split(' ');
				const number = numbers[numbers.length - 1];
				updateTextContent('countNum', number);
				updateTextContent('hebrew', count.he);
				updateTextContent('english', count.en);
				updateTextContent('sefira', sefira.he);
				updateTextContent('today-date', `Today is ` + date);
				console.log(`${count.en}`);
				console.log(`Sefira: ${sefira.en}`);
			} else {
				console.error('Omer data not found in response.');
                textContentOmer.style.display = "none";
                omerbutton.style.display = "none";
			}
		})
		.catch(error => console.error('Error fetching Omer data:', error));
	}






getOmerDate();
