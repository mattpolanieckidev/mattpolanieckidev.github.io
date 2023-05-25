var date, next, hePasuk;
var pageTitle = document.getElementById("pageTitle");
var textdiv = document.getElementById("main-content");
var div, heading, innerDiv, pasuk, newHeading, links;
var textContent = document.getElementsByClassName("pageText");

function createDiv(){
    div = document.createElement("div");
    div.classList.add("textContent");
    textdiv.appendChild(div);
    heading = document.createElement("h3");
    heading.className = "pageHeading";
    div.appendChild(heading);
    innerDiv = document.createElement("div");
    innerDiv.classList.add("pageText");
    div.appendChild(innerDiv);
  }
  
  //Loop through available pasukim and append to unordered list. Check to see if the translation should be shown or not.
  function writePasuk() {
    hePasuk.forEach((pasuk, index) => {
      const p = document.createElement("p");
      p.innerHTML = `${hePasuk[index]}<p>${pasuk}</p>`;
      innerDiv.appendChild(p);
    });
 
  }
  
// Recursive function to fetch subsequent parts of the prayer
function fetchNextPart(url) {
  return fetch(url)
    .then(response => response.json())
    .then(pull => {
      // Handle the fetched part data here
      // console.log(data); // Display the data in the console for demonstration

      // You can process the part data and integrate it with your app functionality
      // For example, you can create <p> tags for each returned data and display them in the HTML
      hePasuk = pull.he;
      createDiv();
      heading.innerHTML = pull.ref;
      writePasuk();


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

// Fetch Ashkenazi Siddur - Modeh Ani from Sefaria API
fetchNextPart('https://www.sefaria.org/api/texts/Siddur_Ashkenaz%2C_Weekday%2C_Shacharit%2C_Preparatory_Prayers%2C_Modeh_Ani?ven=Artscroll_siddur&lang=bi');

