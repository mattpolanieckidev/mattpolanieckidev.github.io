var pageTitle = document.getElementById("pageTitle");
var textdiv = document.getElementById("main-content");
var textContent = document.getElementsByClassName("pageText");
var slider = document.getElementById("fontSize");
var fontSize = slider.value;


  
  

// Function to create navigation list with section titles
/*function addSectionToList(title) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.textContent = title;
  const anchorId = title.replace(/\s+/g, "-").toLowerCase();
  link.href = "#" + anchorId; // Generate anchor link based on the section title
  listItem.appendChild(link);
  navList.appendChild(listItem);

  // Update the corresponding pageHeading with a link
  const pageHeading = document.querySelector(`h3[data-anchor="${anchorId}"]`);
  if (pageHeading) {
    pageHeading.innerHTML = `<a href="#${anchorId}">${title}</a>`;
  }
*/
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


  // Accordion
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

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
