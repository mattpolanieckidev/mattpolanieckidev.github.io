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
  const questionInput = document.getElementById('userQuestion');
  const question = questionInput.value.trim();

  if (!question) {
    alert("Please enter a question.");
    return;
  }

  const button = document.querySelector('.gpt'); // Select the button element

  // Set the button to a loading state
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

  const url = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '057428540fmsh5cec038c682e999p1c88eajsn3ad697cf50d4',
      'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com',
    },
    body: JSON.stringify({
      question: question + ' ' + enPasuk[0].join(' ') // Modify to use the displayed Daf Yomi text
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const result = await response.json();

    // Check if the response structure matches the expected format
    if (result.answer) {
      const generatedText = result.answer;
      // Store the generated text in localStorage
      localStorage.setItem('generatedText', generatedText);
      document.getElementById('summary').innerText = generatedText;
      button.innerHTML = 'Ask AI';
    } else {
      console.error('Response structure is not as expected.');
      button.innerHTML = 'Ask AI';
    }
  } catch (error) {
    console.error(error);
    button.innerHTML = 'Ask AI';
  }
}

function toggleChatContainer() {
  const chatContainer = document.querySelector('.chatContainer');
  chatContainer.classList.toggle('minimized');
}