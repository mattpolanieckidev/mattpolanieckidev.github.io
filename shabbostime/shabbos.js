// Cache DOM elements
const inputField = document.getElementById("zip");
const body = document.querySelector("body");
const page = document.getElementById("page");

// Set input field properties
inputField.maxLength = 5;

// Initialize variables
let input = inputField.value;
let zip;
let city;
let parsha;

// Define constants

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getZipcode() {
  return localStorage.getItem("zipcode") || '';
}

function setZipcode(zipcode) {
  localStorage.setItem("zipcode", zipcode);
}

function changeColor() {
  document.getElementById('colorlabel2').innerHTML = "Shabbos Times";
  inputField.value = getZipcode();
  if (inputField.value === "") {
    console.log("empty")
  }
  else {
    find();
  }
}

function setdiv(id, className) {
  const div = document.createElement("div");
  div.setAttribute("id", id);
  if (className) div.setAttribute("class", className);
  page.append(div);
  return div;
}

function updateTextContent(id, text) {
  const element = document.getElementById(id);
  if (element) element.innerHTML = text;
}

function updateShabbosInfo(city, parsha, candles, havdalah) {
  updateTextContent("header", city);
  updateTextContent('parshalabel', "Torah portion: <br> <span id = \"parsha\"> </span> <button id=\"gpt\" class=\"fa-regular fa-rectangle-list fa-2xs\" onclick=\"generateAI()\"></button>");
  updateTextContent('parsha', parsha);
  updateTextContent("candleLighting", candles);
  updateTextContent("havdala", havdalah);
}

async function find() {
  try {
    // Get the zip code from the input field
    const input = document.getElementById("zip").value;
    const zip = `zip=${input}`;
    setZipcode(input);

    // Fetch data from Hebcal API
    const response = await fetch(`https://www.hebcal.com/shabbat/?cfg=json&${zip}&m=50`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    // Check if the 'items' array exists and is not empty
    if (!data || !data.items || data.items.length === 0) {
      console.error("No data items found.");
      return;
    }

    // Extract city and state
    const city = `${data.location.city}, ${data.location.state}`;

    // Extract parsha
    const parashatItem = data.items.find(i => i.category === "parashat");
    const parsha = parashatItem?.title || '';

    // Extract candlelighting and havdalah times
    const candlesItem = data.items.find(i => i.category === "candles");
    const havdalahItem = data.items.find(i => i.category === "havdalah");

    const candlesText = candlesItem
      ? formatEventText(candlesItem.date, candlesItem.title)
      : '';
    const havdalahText = havdalahItem
      ? formatEventText(havdalahItem.date, havdalahItem.title)
      : '';

    // Update Shabbos info
    updateShabbosInfo(city, parsha, candlesText, havdalahText);

    clearHolidayCards();

    // Handle holidays
    const holidayItems = data.items.filter(i => i.category === "holiday");
    handleHolidays(holidayItems);

    // Handle Yom Tov
    const yomtovItems = data.items.filter(i => i.yomtov === true);
    handleYomTov(yomtovItems);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

// Helper function to format event text
function formatEventText(date, title) {
  const d = new Date(date);
  return `${days[d.getDay()]} ${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}<br>${title}`;
}

function clearHolidayCards() {
  ['holiday', 'holiday2', 'holiday3'].forEach((id) => {
    const existing = document.getElementById(id);
    if (existing) existing.remove();
  });
}

// Helper function to handle holidays
function handleHolidays(holidayItems) {
  if (holidayItems.length > 0) {
    const holidayDiv = setdiv('holiday', 'holidaycandle');
    const holidayName = holidayItems[0]?.title || '';
    updateTextContent('holiday', holidayName);
    const holidayDetail = holidayItems.find(i => i.memo === holidayName)?.title || '';

    if (holidayDetail) {
      const p = document.createElement("p");
      p.setAttribute('id', 'holidaycandle');
      p.setAttribute('class', 'holidaycandle');
      p.innerHTML = holidayDetail;
      holidayDiv.append(p);
    }
  }
}

// Helper function to handle Yom Tov
function handleYomTov(yomtovItems) {
  if (yomtovItems.length >= 2) {
    yomtovItems.slice(0, 2).forEach((item, index) => {
      const holidayDiv = setdiv(`holiday${index + 2}`, 'holidaycandle');
      const holidayName = item?.title || '';
      updateTextContent(`holiday${index + 2}`, holidayName);
      const yomTovDetail = yomtovItems.find(i => i.memo === holidayName)?.title || '';

      if (yomTovDetail) {
        const p = document.createElement("p");
        p.setAttribute('class', 'holidaycandle');
        p.innerHTML = yomTovDetail;
        holidayDiv.append(p);
      }
    });
  }
}

// Execute a function when the user releases a key on the keyboard
inputField.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});

async function generateAI() {

  const button = document.getElementById('gpt'); // Select the button element

  // Set the button to a loading state
  button.classList.toggle("fa-regular", "fa-rectangle-list", "fa-2xs");
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  const url = "https://open-ai21.p.rapidapi.com/chatgpt";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "bd3893a85fmsh47b0203e08b8f58p13007djsn0a939f91a737", // Replace with a secure key
      "x-rapidapi-host": "open-ai21.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: "Summarize this parsha in 5 bullet sentences in HTML list format. Only include the <ul> and <li> in the return. Do not include ```html in the return " + parsha }],
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
        const summary = data.result;
        const summaryDiv = document.createElement('div');
        summaryDiv.innerHTML = `<h4 class=\"psummary\">Parsha Summary:</h4>${summary}`;
        document.getElementById('parsha').appendChild(summaryDiv);
        button.innerHTML = '';
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
