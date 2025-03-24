var date, next, prev, enPasuk, hePasuk, amudCount, section, currentAmud, masechtaProgress, masechtaSearch = document.getElementById("masechta"), div, heading, ul, pasuk, newHeading, links;
var pageTitle = document.getElementById("pageTitle");
var textdiv = document.getElementById("content");
var slider = document.getElementById("fontSize");
var fontSize = slider.value;
var hebpairs = document.getElementsByClassName("hebrew-line")
let result;

// Night mode initialization
const isNight = localStorage.getItem("night") === "dark";
if (isNight) {
  document.getElementById("content").classList.add("night");
  document.getElementById("body").classList.add("night");
  document.getElementById("toggleclose").classList.add("nightcolor");
  document.getElementById("masechta").classList.add("nightcolor");
  document.getElementById("modal").classList.add("bg-dark");
  document.getElementById("nav").classList.add("bg-dark");
  document.getElementById("switch1").checked = true;
  
  // Add night mode styles for chat container on initial load
  const chatContainer = document.querySelector('.chatContainer');
  chatContainer.style.background = '#2d2d2d';
  chatContainer.style.borderColor = '#404040';
  chatContainer.querySelector('input').style.background = '#404040';
  chatContainer.querySelector('input').style.color = 'white';
  chatContainer.querySelector('#summary').style.background = '#404040';
  chatContainer.querySelector('#summary').style.color = 'white';
} else {
  document.getElementById("body").classList.remove("night");
  document.getElementById("switch1").checked = false;
  localStorage.setItem("night", "light");
}

// Create and append Div, Heading, and Unordered List
function createDiv() {
  div = document.createElement("div");
  div.classList.add("heading");
  textdiv.appendChild(div);
  heading = document.createElement("h3");
  heading.className = "pageHeading";
  div.appendChild(heading);
}

// Loop through available pasukim and append to unordered list. Check to see if the translation should be shown or not.
const writePasuk = () => {
  const content = document.getElementById("content");
  if (Array.isArray(hePasuk) && Array.isArray(enPasuk)) {
    for (let i = 0; i < Math.max(hePasuk.length, enPasuk.length); i++) {
      const pairDiv = document.createElement("div");
      pairDiv.className = "pasuk-pair";

      // Hebrew Text
      if (Array.isArray(hePasuk[i])) {
        hePasuk[i].forEach((line) => {
          const heDiv = document.createElement("div");
          heDiv.className = "hebrew-line";
          const heP = document.createElement("p");
          heP.innerHTML = line;
          heDiv.appendChild(heP);
          pairDiv.appendChild(heDiv);
        });
      } else if (typeof hePasuk[i] === "string") {
        const heDiv = document.createElement("div");
        heDiv.className = "hebrew-line";
        const heP = document.createElement("p");
        heP.innerHTML = hePasuk[i];
        heDiv.appendChild(heP);
        pairDiv.appendChild(heDiv);
      }

      // English Text
      if (Array.isArray(enPasuk[i])) {
        enPasuk[i].forEach((line) => {
          const enDiv = document.createElement("div");
          enDiv.className = "english-line";
          const enP = document.createElement("p");
          enP.innerHTML = line;
          enDiv.appendChild(enP);
          pairDiv.appendChild(enDiv);
        });
      } else if (typeof enPasuk[i] === "string") {
        const enDiv = document.createElement("div");
        enDiv.className = "english-line";
        const enP = document.createElement("p");
        enP.innerHTML = enPasuk[i];
        enDiv.appendChild(enP);
        pairDiv.appendChild(enDiv);
      }

      content.appendChild(pairDiv);
    }
  } else {
    content.innerHTML = "<p>Error: Hebrew and English text not available.</p>";
  }
};

// Dark mode
function night() {
  const isNight = localStorage.getItem("night") === "dark";
  document.getElementById("content").classList.toggle("night", !isNight);
  document.getElementById("body").classList.toggle("night", !isNight);
  document.getElementById("toggleclose").classList.toggle("nightcolor", !isNight);
  document.getElementById("masechta").classList.toggle("nightcolor", !isNight);
  document.getElementById("modal").classList.toggle("bg-dark", !isNight);
  document.getElementById("nav").classList.toggle("bg-dark", !isNight);
  
  // Add night mode styles for chat container
  const chatContainer = document.querySelector('.chatContainer');
  chatContainer.classList.toggle('night', !isNight);
  
  localStorage.setItem("night", isNight ? "light" : "dark");
}

// Get today's date and page number
const loadToday = async () => {
  try {
    // Fetch today's date and page number
    const calendarResponse = await fetch("https://www.sefaria.org/api/calendars/");
    if (!calendarResponse.ok) throw new Error("Failed to fetch calendar data");

    const myJson = await calendarResponse.json();
    document.getElementById("date").innerText = myJson.date;

    dafYomi = myJson.calendar_items.find(i => i.title.en === "Daf Yomi").url;
    document.getElementById("pages").innerText = dafYomi;

    // Fetch today's daf
    const response = await fetch(`https://www.sefaria.org/api/texts/${dafYomi}`);
    if (!response.ok) throw new Error("Failed to fetch today's daf");
    const initialPull = await response.json(); // Store the initial response

    if (!initialPull.text || !initialPull.he || !initialPull.next || !initialPull.prev) {
        throw new Error("Invalid API response: Missing required fields");
    }

    let correctPull = initialPull; // Initialize with the initial data

    const prevUrl = `https://www.sefaria.org/api/texts/${initialPull.prev}`;

    // Function to efficiently check if a URL ends with 'a' or 'b'
    function endsWithAorB(url) {
        return url && (url.endsWith('a') || url.endsWith('b'));
    }

    if (!endsWithAorB(initialPull.ref)) { // Check if initial ref is missing a or b
        const aUrl = `https://www.sefaria.org/api/texts/${initialPull.ref}a`;
        const bUrl = `https://www.sefaria.org/api/texts/${initialPull.ref}b`;

        const checkResponse = async (urlToCheck) => {
            const checkResponse = await fetch(urlToCheck);
            if (checkResponse.ok) {
                return await checkResponse.json();
            }
            return null;
        }

        const aPull = await checkResponse(aUrl);
        const bPull = await checkResponse(bUrl);

        if (aPull) {
            correctPull = aPull;
        } else if (bPull) {
            correctPull = bPull;
        } else {
            console.warn("Could not find 'a' or 'b' version for:", initialPull.ref);
        }
    }

    // Update global variables with the CORRECT data
    enPasuk = correctPull.text;
    hePasuk = correctPull.he;
    next = correctPull.next;
    prev = correctPull.prev;

    document.getElementById("content").textContent = "";
    createDiv();
    heading.innerHTML = correctPull.ref; // Use the correct ref
    writePasuk();

    document.getElementById("next").innerText = correctPull.next;
    document.getElementById("prev").innerHTML =  correctPull.prev; // SVG as before

    console.log("Corrected ref:", correctPull.ref);

} catch (error) {
    console.error("Error loading today's daf:", error);
    alert("Failed to load today's daf. Please try again.");
}
};
loadToday();

// Get next page
const nextPage = async () => {
  try {
    // Fetch the next page's content
    const response = await fetch(`https://www.sefaria.org/api/texts/${next}`);
    if (!response.ok) throw new Error("Failed to fetch next page");

    const pull = await response.json();
    console.log("API Response:", pull); // Debugging: Log the entire response

    // Check if the required fields exist
    if (!pull.text || !pull.he || !pull.next || !pull.prev) {
      throw new Error("Invalid API response: Missing required fields");
    }

    // Update global variables
    enPasuk = pull.text;
    hePasuk = pull.he;
    next = pull.next;
    prev = pull.prev;

    // Clear existing content
    document.getElementById("content").textContent = "";

    // Create a new content div and set the heading
    createDiv();
    heading.innerHTML = pull.ref;

    // Write the new page's content to the screen
    writePasuk();

    // Scroll to the new heading
    heading.scrollIntoView({ behavior: "auto", block: "center" });

    // Update the "next" and "prev" elements
    document.getElementById("next").innerHTML = pull.next;
    document.getElementById("prev").innerHTML = "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +
      "<path d=\"M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z\"></path> </svg>" +
      pull.prev;
  } catch (error) {
    console.error("Error fetching next page:", error);
    alert("Failed to load the next page. Please try again.");
  }
};

// Get previous page
const prevPage = async () => {
  try {
    // Fetch the previous page's content
    const response = await fetch(`https://www.sefaria.org/api/texts/${prev}`);
    if (!response.ok) throw new Error("Failed to fetch previous page");

    const pull = await response.json();
    console.log("API Response:", pull); // Debugging: Log the entire response

    // Check if the required fields exist
    if (!pull.text || !pull.he || !pull.next || !pull.prev) {
      throw new Error("Invalid API response: Missing required fields");
    }

    // Update global variables
    enPasuk = pull.text;
    hePasuk = pull.he;
    next = pull.next;
    prev = pull.prev;

    // Clear existing content
    document.getElementById("content").textContent = "";

    // Create a new content div and set the heading
    createDiv();
    heading.innerHTML = pull.ref;

    // Write the new page's content to the screen
    writePasuk();

    // Scroll to the new heading
    heading.scrollIntoView({ behavior: "auto", block: "center" });

    // Update the "next" and "prev" elements
    document.getElementById("next").innerHTML = pull.next;
    document.getElementById("prev").innerHTML = "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +
      "<path d=\"M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z\"></path> </svg>" +
      pull.prev;
  } catch (error) {
    console.error("Error fetching previous page:", error);
    alert("Failed to load the previous page. Please try again.");
  }
};

// Toggle English translation visibility
const hide = () => {
  const x = document.getElementsByClassName("english-line");
  for (let i = 0; i < x.length; i++) {
    x.item(i).classList.toggle("hidden");
  }
  localStorage.setItem("hidden", localStorage.getItem("hidden") === "show" ? "hidden" : "show");
};

// Toggle chat container visibility
const toggleChat = () => {
  const chatContainer = document.querySelector('.chatContainer');
  const minimizeButton = document.getElementById('minimizeButton');

  chatContainer.classList.toggle('minimized');
  
  // Update button text/icon based on state
  if (chatContainer.classList.contains('minimized')) {
    
    minimizeButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  } else {
    minimizeButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
  }
};

// Initialize chat container structure
document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.querySelector('.chatContainer');
  if (chatContainer) {
    // Create header if it doesn't exist
    if (!chatContainer.querySelector('.chat-header')) {
      const header = document.createElement('div');
      header.className = 'chat-header';
      
      // Move the minimize button into the header
      const minimizeButton = document.getElementById('minimizeButton');
      if (minimizeButton) {
        header.appendChild(minimizeButton);
      }
      
      // Insert header at the beginning of chat container
      chatContainer.insertBefore(header, chatContainer.firstChild);
    }
  }
});