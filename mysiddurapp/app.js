var slider = document.getElementById("fontSize");
var fontSize = slider.value;
var pageTitle = document.getElementById("pageTitle");
var textdiv = document.getElementById("main-content");
var textContent = document.getElementsByClassName("pageText");


  
  // Check if the navigation menu is open
  const navbarCollapse = document.querySelector(".navbar-collapse.show");
  if (navbarCollapse) {
    // Add a click event listener to close the navigation menu when a link is clicked
    link.addEventListener("click", () => {
      const navbarToggler = document.querySelector(".navbar-toggler");
      if (navbarToggler) {
        navbarToggler.click(); // Simulate a click on the hamburger menu button to close the menu
      }
    });
  }

function adjustFontSize(size) {
  const textContentElements = document.getElementsByClassName("pageText");
  for (let i = 0; i < textContentElements.length; i++) {
    textContentElements[i].style.fontSize = size + "px";
  }
}

//set slider value on mobile
function myFunction(x) {
  if (x.matches) { // If media query matches
    adjustFont("1");
  } else {
    adjustFont("2");
  }
}

var x = window.matchMedia("(orientation:portrait)")
myFunction(x)
x.addListener(myFunction)

//adjust font size based on slider value
function adjustFont(a){
  for (i = 0; i < textContent.length; i++) {
    if (a === "1"){
      slider.value="1";
      localStorage.setItem("size", "1");
      textContent.item(i).style.fontSize="30px";
    }
    else if (a === "2"){
      slider.value="2";
      localStorage.setItem("size", "2");
      textContent.item(i).style.fontSize="34px";
    }
    else if (a === "3"){
      localStorage.setItem("size", "3");
      textContent.item(i).style.fontSize="36px";
    }
    }
  };


// Function to enable pinch-to-zoom for font size. 
function enablePinchZoom() {
  let initialDistance = null;
  let currentFontSize = textContent.length > 0 
    ? parseInt(window.getComputedStyle(textContent[0]).fontSize, 10) 
    : 16; // Default to 16px if no elements are found

  document.addEventListener("touchmove", (event) => {
    if (event.touches.length === 2) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];

      // Calculate the distance between two touch points
      const distance = Math.sqrt(
        Math.pow(touch2.pageX - touch1.pageX, 2) +
        Math.pow(touch2.pageY - touch1.pageY, 2)
      );

      if (initialDistance === null) {
        initialDistance = distance;
      } else {
        const scale = distance / initialDistance;

        // Adjust font size based on the scale
        const newFontSize = Math.max(16, Math.min(50, currentFontSize * scale)); // Limit font size between 16px and 50px
        for (let i = 0; i < textContent.length; i++) {
          textContent[i].style.fontSize = `${newFontSize}px`;
        }
      }
    }
  });

  document.addEventListener("touchend", (event) => {
    if (event.touches.length < 2) {
      // Reset initial distance and save the current font size
      initialDistance = null;
      if (textContent.length > 0) {
        currentFontSize = parseInt(window.getComputedStyle(textContent[0]).fontSize, 10);
        localStorage.setItem("size", currentFontSize); // Save the font size to localStorage
      }
    }
  });
}

// Call the function to enable pinch-to-zoom
enablePinchZoom();


//check to see if today is Rosh Chodesh
//Sample JSON data for Rosh Chodesh
// {
//   "title": "Hebcal Cedarhurst April 2025",
//   "date": "2025-04-28T14:13:24.082Z",
//   "version": "5.9.3-3.2.5",
//   "location": {
//     "title": "Cedarhurst, NY 11516",
//     "city": "Cedarhurst",
//     "tzid": "America/New_York",
//     "latitude": 40.62835,
//     "longitude": -73.726012,
//     "cc": "US",
//     "country": "United States",
//     "elevation": 15,
//     "admin1": "NY",
//     "geo": "zip",
//     "zip": "11516",
//     "state": "NY",
//     "stateName": "New York"
//   },
//   "range": {
//     "start": "2025-04-28",
//     "end": "2025-04-28"
//   },
//   "items": [
//     {
//       "title": "Rosh Chodesh Iyyar",
//       "date": "2025-04-28",
//       "hdate": "30 Nisan 5785",
//       "category": "roshchodesh",
//       "hebrew": "ראש חודש אייר",
//       "leyning": {
//         "1": "Numbers 28:1-28:3",
//         "2": "Numbers 28:3-28:5",
//         "3": "Numbers 28:6-28:10",
//         "4": "Numbers 28:11-28:15",
//         "torah": "Numbers 28:1-15"
//       },
//       "link": "https://hebcal.com/h/rosh-chodesh-iyyar-2025?us=js&um=api",
//       "memo": "Start of month of Iyyar on the Hebrew calendar. אִיָיר (transliterated Iyyar or Iyar) is the 2nd month of the Hebrew year, has 29 days, and corresponds to April or May on the Gregorian calendar.  רֹאשׁ חוֹדֶשׁ, transliterated Rosh Chodesh or Rosh Hodesh, is a minor holiday that occurs at the beginning of every month in the Hebrew calendar. It is marked by the birth of a new moon"
//     }
//   ]
// }

// Get today's date in YYYY-MM-DD format

//check today's Date and confirm if it is Rosh Chodesh. If it's not, then hide the div with class .roshChodesh
function checkRoshChodesh() {
const today = new Date();
const date = today.toISOString().split('T')[0];
const yyymmmdd = date.split('-');
const formattedDate = yyymmmdd[0] + '-' + yyymmmdd[1] + '-' + yyymmmdd[2];  
const roshChodesh = document.getElementsByClassName("roshChodesh");
document.getElementById("todayDate").innerHTML = formattedDate;
const hebcalUrl = `https://www.hebcal.com/hebcal?cfg=json&start=${formattedDate}&end=${formattedDate}&zip=11516&nx=on`;
  fetch(hebcalUrl)
    .then(response => response.json())
    .then(data => {
      if (data.items[0].category === "roshchodesh") {
        document.getElementById("roshChodeshStatus").innerHTML = "Rosh Chodesh";        
      } else
      roshChodesh[0].style.display = "none"; //hide the roshChodesh div if not Rosh Chodesh
    })

  }    
checkRoshChodesh();

//check the current time, if it's after 12:00 PM, move the user to mincha.html. If after 7:00 PM, move the user to maariv.html
function checkTime() {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const currentTime = hours * 60 + minutes; // Convert to minutes
  const noonTime = 12 * 60; // 12:00 PM in minutes

  if (currentTime >= noonTime) {
    window.location.href = "mincha.html";
  }
  const maarivTime = 19 * 60; // 7:00 PM in minutes
  if (currentTime >= maarivTime) {
    window.location.href = "maariv.html";
  }

}
checkTime();