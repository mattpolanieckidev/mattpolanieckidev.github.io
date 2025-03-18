// Shared variables
var textContent = document.getElementsByClassName("hebrew-line");
var entextContent = document.getElementsByClassName("english-line");
var slider = document.getElementById("fontSize");
var enPasuk, hePasuk, next, prev, heading;
var input = document.getElementById("userInput");

// Set slider value on mobile
const landscapeQuery = window.matchMedia("(orientation: landscape)");

// Specify the event type ("orientationchange")
landscapeQuery.addEventListener("orientationchange", e => {
  const isLandscape = e.matches;
  const fontValue = isLandscape ? "1" : "2";
  adjustFont(fontValue);
});

// Initialize based on current orientation
adjustFont(landscapeQuery.matches ? "1" : "2");

// Adjust font size based on slider value
function adjustFont(a) {
  for (let i = 0; i < textContent.length; i++) {
    if (a === "1") {
      slider.value = "1";
      localStorage.setItem("size", "1");
      textContent.item(i).style.fontSize = "18px";
      entextContent.item(i).style.fontSize = "18px";
    } else if (a === "2") {
      slider.value = "2";
      localStorage.setItem("size", "2");
      textContent.item(i).style.fontSize = "24px";
      entextContent.item(i).style.fontSize = "24px";
    } else if (a === "3") {
      localStorage.setItem("size", "3");
      entextContent.item(i).style.fontSize = "32px";
      textContent.item(i).style.fontSize = "32px";
    }
  }
}

// Progress bar for full daf cycle
const startDate = new Date("1/5/2020");
const endDate = new Date("6/7/2027");
const today = new Date();
const daysElapsed = Math.floor((today - startDate) / (1000 * 3600 * 24));
const totalDays = Math.floor((endDate - startDate) / (1000 * 3600 * 24));
const progressNum = ((daysElapsed / totalDays) * 100).toFixed(2);
const progress = document.getElementById("progress");
progress.style.width = `${progressNum}%`;
progress.innerHTML = `Siyum HaShas ${progressNum}%`;

// Find a daf
const getPage = () => {
  const masechtaName = document.getElementById("masechta").value;
  const dafNum = document.getElementById("pageSelect").value;

  fetch(`https://www.sefaria.org/api/texts/${masechtaName}.${dafNum}`)
    .then(response => response.json())
    .then(pull => {
      document.getElementById("content").textContent = "";
      enPasuk = pull.text;
      hePasuk = pull.he;
      createDiv();
      heading.innerHTML = pull.ref;
      writePasuk();
      document.getElementById("prev").innerHTML = pull.prev;
      document.getElementById("next").innerHTML = pull.next;
      next = pull.next;
      prev = pull.prev;
    });
};

// document.addEventListener('DOMContentLoaded', function() {
//   const generatedText = localStorage.getItem('generatedText');
//   if (generatedText) {
//     document.getElementById('summary').innerText = generatedText;
//   }
// });

async function generateAI() {

  const button = document.querySelector('.gpt'); // Select the button element

  // Set the button to a loading state
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

  const url = "https://open-ai21.p.rapidapi.com/chatgpt";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "bd3893a85fmsh47b0203e08b8f58p13007djsn0a939f91a737", // Replace with a secure key
      "x-rapidapi-host": "open-ai21.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: "What is" + content.innerHTML+ "about?" }],
      web_access: false,
    }),
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json(); // Parse response JSON
  
      // Log full response for debugging
      console.log("API Response:", data);
  
      // Extract and display the result
      if (data.status && data.result) {
        document.getElementById("summary").innerText = data.result; // Make sure there's a div with id="output" in your HTML
      } else {
        document.getElementById("summary").innerText = "No valid response received.";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("summary").innerText = "Error retrieving data.";
    }
  };
  
  fetchData();
  
  };