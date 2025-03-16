// Shared variables
var textContent = document.getElementsByClassName("hebrew-line");
var entextContent = document.getElementsByClassName("english-line");
var slider = document.getElementById("fontSize");
var enPasuk, hePasuk, next, prev, heading;

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

document.addEventListener('DOMContentLoaded', function() {
  const generatedText = localStorage.getItem('generatedText');
  if (generatedText) {
    document.getElementById('summary').innerText = generatedText;
  }
});

async function generateAI() {

  const button = document.querySelector('.gpt'); // Select the button element

  // Set the button to a loading state
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer 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",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "rekaai/reka-flash-3:free",
    "messages": [
      {
        "role": "user",
        "content": "What is" + content.innerHTML +"about? Summarize in a simple list of 5 statements."
      }
    ]
  })
})  
  .then(response => response.json())  // Parse the response as JSON
  .then(data => {
    // Handle the parsed response
    if (data && data.choices && data.choices[0]) {
      console.log('Answer:', data.choices[0].message.content);  // Log the response
    } else {
      console.error('Unexpected response structure:', data);
    }
  })
  .catch(error => {
    console.error('Error:', error);  // Handle errors
  })};