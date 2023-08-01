if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("service-worker.js").then(function(registration) {
      // Registration was successful
      console.log("ServiceWorker registration successful with scope: ", registration.scope);
    }, function(err) {
      // registration failed :(
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}

var slider = document.getElementById("fontSize");
var fontSize = slider.value;
var pageTitle = document.getElementById("pageTitle");
var textdiv = document.getElementById("main-content");
var textContent = document.getElementsByClassName("pageText");

// Recursive function to fetch subsequent parts of the prayer
function fetchNextPart(url) {
    return fetch(url)
      .then(response => response.json())
      .then(pull => {
        const refVariants = pull.ref;
        const isWeekdayShacharit = refVariants.includes("Weekday, Shacharit");
  
        if (isWeekdayShacharit) {
          const div = document.createElement("div");
          div.classList.add("textContent");
          textdiv.appendChild(div);
          const heading = document.createElement("h3");
          heading.className = "pageHeading";
          heading.setAttribute("data-anchor", pull.ref.replace(/\s+/g, "-").toLowerCase()); // Set data-anchor attribute
          div.appendChild(heading);
          const innerDiv = document.createElement("div");
          innerDiv.classList.add("pageText");
          div.appendChild(innerDiv);
          const hePasuk = pull.he;
          heading.innerHTML = pull.heTitleVariants; // Use pull.ref instead of pull.heTitleVariants
          hePasuk.forEach(pasuk => {
            const p = document.createElement("p");
            p.innerHTML = pasuk;
            innerDiv.appendChild(p);
            adjustFont(localStorage.getItem("size"));
          });
  
       //   addSectionToList(pull.ref); // Add section ref to the navigation list
        }
  
        // Check if there is a next part
        if (pull.next) {
          // Fetch the next part recursively
          return fetchNextPart(`https://www.sefaria.org/api/texts/${pull.next}`);
        }
      })
      .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error fetching part of the prayer:', error);
      });
  }
  
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

// Fetch Ashkenazi Siddur - Modeh Ani from Sefaria API
fetchNextPart('https://www.sefaria.org/api/texts/Siddur_Ashkenaz%2C_Weekday%2C_Shacharit%2C_Preparatory_Prayers%2C_Modeh_Ani?ven=Artscroll_siddur&lang=bi');

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


