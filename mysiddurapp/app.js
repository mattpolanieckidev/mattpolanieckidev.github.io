
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
      textContent.item(i).style.fontSize="24px";
    }
    else if (a === "2"){
      slider.value="2";
      localStorage.setItem("size", "2");
      textContent.item(i).style.fontSize="30px";
    }
    else if (a === "3"){
      localStorage.setItem("size", "3");
      textContent.item(i).style.fontSize="36px";
    }
    }
  };


