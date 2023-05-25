var pageTitle = document.getElementById("pageTitle");
var textdiv = document.getElementById("main-content");
var textContent = document.getElementsByClassName("pageText");

// Recursive function to fetch subsequent parts of the prayer
function fetchNextPart(url) {
    return fetch(url)
      .then(response => response.json())
      .then(pull => {
  const titleVariants = pull.ref;
  const isWeekdayShacharit = titleVariants.includes("Weekday, Shacharit");
  
  if (isWeekdayShacharit) {
    const div = document.createElement("div");
    div.classList.add("textContent");
    textdiv.appendChild(div);
    const heading = document.createElement("h3");
    heading.className = "pageHeading";
    div.appendChild(heading);
    const innerDiv = document.createElement("div");
    innerDiv.classList.add("pageText");
    div.appendChild(innerDiv);
    const hePasuk = pull.he;
    heading.innerHTML = pull.heTitleVariants;
    hePasuk.forEach(pasuk => {
        const p = document.createElement("p");
        p.innerHTML = pasuk;
        innerDiv.appendChild(p);
      });

      addSectionToList(pull.ref); // Add section title to the navigation list

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
function addSectionToList(title) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = title;
    link.href = "#" + title.replace(/\s+/g, "-").toLowerCase(); // Generate anchor link based on the section title
    listItem.appendChild(link);
    navList.appendChild(listItem);
  }

// Fetch Ashkenazi Siddur - Modeh Ani from Sefaria API
fetchNextPart('https://www.sefaria.org/api/texts/Siddur_Ashkenaz%2C_Weekday%2C_Shacharit%2C_Preparatory_Prayers%2C_Modeh_Ani?ven=Artscroll_siddur&lang=bi');