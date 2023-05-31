var pageTitle = document.getElementById("pageTitle");
var textdiv = document.getElementById("main-content");
var textContent = document.getElementsByClassName("pageText");

// Recursive function to fetch subsequent parts of the prayer
function fetchNextPart(url) {
    return fetch(url)
      .then(response => response.json())
      .then(pull => {
        const refVariants = pull.ref;
        const isWeekdayShacharit = refVariants.includes("Weekday, Mincha");
  
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
          });
  
         // addSectionToList(pull.ref); // Add section ref to the navigation list
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




// Fetch Ashkenazi Siddur - Modeh Ani from Sefaria API
fetchNextPart('https://www.sefaria.org/api/texts/Siddur_Ashkenaz%2C_Weekday%2C_Minchah%2C_Ashrei?lang=he');

function adjustFontSize(size) {
  const textContentElements = document.getElementsByClassName("pageText");
  for (let i = 0; i < textContentElements.length; i++) {
    textContentElements[i].style.fontSize = size + "px";
  }
}

function adjustFontSize(size) {
  const textContentElements = document.getElementsByClassName("pageText");
  for (let i = 0; i < textContentElements.length; i++) {
    textContentElements[i].style.fontSize = size + "px";
  }
}

// Event listener for font size change
document.addEventListener("DOMContentLoaded", () => {
  const fontSizeButtons = document.querySelectorAll(".font-size-btn");

  fontSizeButtons.forEach(button => {
    button.addEventListener("click", event => {
      const fontSize = event.target.dataset.fontSize;
      adjustFontSize(fontSize);
      // Save the font size to local storage
      localStorage.setItem("fontSize", fontSize);
    });
  });
});

// Event listener before page unload to save font size
window.addEventListener("beforeunload", () => {
  const currentFontSize = getComputedStyle(document.querySelector(".pageText")).fontSize;
  localStorage.setItem("fontSize", parseInt(currentFontSize));
});

// Apply font size on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedFontSize = localStorage.getItem("fontSize");
  if (storedFontSize) {
    adjustFontSize(storedFontSize);
  }
});

