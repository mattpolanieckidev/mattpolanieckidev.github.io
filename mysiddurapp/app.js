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
          });
  
          addSectionToList(pull.ref); // Add section ref to the navigation list
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
  
  

// Function to create navigation list with section refs
function addSectionToList(ref) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.textContent = ref;
  const anchorId = ref.replace(/\s+/g, "-").toLowerCase();
  link.href = "#" + anchorId; // Generate anchor link based on the section ref
  listItem.appendChild(link);
  navList.appendChild(listItem);

  // Update the corresponding pageHeading with a link
  const pageHeading = document.querySelector(`h3[data-anchor="${anchorId}"]`);
  if (pageHeading) {
    pageHeading.innerHTML = `<a href="#${anchorId}">${ref}</a>`;
  }

  // Check if the hamburger menu button exists
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler) {
    // Add a click event listener to close the navigation menu when a link is clicked
    link.addEventListener("click", () => {
      navbarToggler.click(); // Simulate a click on the hamburger menu button to close the menu
    });
  }
}


// Fetch Ashkenazi Siddur - Modeh Ani from Sefaria API
fetchNextPart('https://www.sefaria.org/api/texts/Siddur_Ashkenaz%2C_Weekday%2C_Shacharit%2C_Preparatory_Prayers%2C_Modeh_Ani?ven=Artscroll_siddur&lang=bi');
