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
const colors = [
  '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe',
  '#43e97b', '#38f9d7', '#fa709a', '#fee140', '#a8edea', '#fed6e3',
  '#ff9a9e', '#fecfef', '#fccb90', '#d4fc79', '#96e6a1', '#ffd89b',
  '#19547b', '#ffecd2', '#fcb69f', '#a3bded', '#6991c7', '#13547a'
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/* ===============================
   ZIP STORAGE
================================ */
function getZipcode() {
  return localStorage.getItem("zipcode") || '';
}

function setZipcode(zipcode) {
  localStorage.setItem("zipcode", zipcode);
}

/* ===============================
   UI HELPERS
================================ */
function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function changeColor() {
  body.style.backgroundColor = getRandomColor(colors);
  document.getElementById('colorlabel2').innerHTML = "Shabbos Times ";
  inputField.value = getZipcode();
  if (inputField.value !== "") find();
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
  updateTextContent(
    'parshalabel',
    "Torah portion:<br><span id=\"parsha\"></span> " +
    "<button id=\"gpt\" class=\"fa-regular fa-rectangle-list fa-2xs\" onclick=\"generateAI()\"></button>"
  );
  updateTextContent('parsha', parsha);
  updateTextContent("candleLighting", candles);
  updateTextContent("havdala", havdalah);
}

/* ===============================
   CHANUKAH HELPERS
================================ */
function getChanukahNight(holidayItems) {
  const chanukahItem = holidayItems.find(i =>
    i.title && i.title.toLowerCase().includes("chanukah")
  );

  if (!chanukahItem) return null;

  const match = chanukahItem.title.match(/(\d+)\s*Candle/);
  return match ? parseInt(match[1], 10) : 1;
}

function candleSVG(lit) {
  return `
    <svg width="16" height="38" viewBox="0 0 16 38">
      <rect x="4" y="10" width="8" height="24" rx="2" fill="#f5deb3"/>
      ${lit ? `<circle cx="8" cy="6" r="4" fill="#ffb703"/>` : ""}
    </svg>
  `;
}


function renderMenorah(night) {
  let container = document.getElementById("menorah-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "menorah-container";
    page.prepend(container);
  }

  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.width = "320px";
  wrapper.style.margin = "20px auto";

  const menorah = document.createElement("img");
  menorah.src = "noun-menorah-949.svg";
  menorah.style.width = "100%";
  menorah.style.display = "block";

  wrapper.appendChild(menorah);

 const candleXPositions = [
  310,
  276,
  242,
  208,
  174,
  140,
  106,
  72
];

  candleXPositions.forEach((x, index) => {
    const candle = document.createElement("div");
    candle.style.position = "absolute";
    candle.style.left = `${x}px`;
    candle.style.top = "1px";
    candle.style.transform = "translateX(-50%)";

    // Right → Left lighting
    const isLit = index < night;
    candle.innerHTML = candleSVG(isLit);

    wrapper.appendChild(candle);
  });

  container.appendChild(wrapper);
}


  candleXPositions.forEach((x, index) => {
    const candle = document.createElement("div");
    candle.style.position = "absolute";
    candle.style.left = `${x}px`;
    candle.style.top = "1px"; // adjust up/down to match arms
    candle.style.transform = "translateX(-50%)";

    // Light candles from RIGHT → LEFT
    const isLit = index < night;

    candle.innerHTML = candleSVG(isLit);
    wrapper.appendChild(candle);
  });

  container.appendChild(wrapper);


/* ===============================
   MAIN FETCH
================================ */
async function find() {
  try {
    const input = document.getElementById("zip").value;
    setZipcode(input);

    const response = await fetch(`https://www.hebcal.com/shabbat/?cfg=json&zip=${input}&m=50`);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const data = await response.json();
    if (!data?.items?.length) return;

    const city = `${data.location.city}, ${data.location.state}`;

    const parashatItem = data.items.find(i => i.category === "parashat");
    const parsha = parashatItem?.title || '';

    const candlesItem = data.items.find(i => i.category === "candles");
    const havdalahItem = data.items.find(i => i.category === "havdalah");

    const candlesText = candlesItem ? formatEventText(candlesItem.date, candlesItem.title) : '';
    const havdalahText = havdalahItem ? formatEventText(havdalahItem.date, havdalahItem.title) : '';

    updateShabbosInfo(city, parsha, candlesText, havdalahText);

    const holidayItems = data.items.filter(i => i.category === "holiday");
    handleHolidays(holidayItems);

    const chanukahNight = getChanukahNight(holidayItems);
    if (chanukahNight) renderMenorah(chanukahNight);

  } catch (error) {
    console.error("Error:", error);
  }
}

/* ===============================
   FORMATTING HELPERS
================================ */
function formatEventText(date, title) {
  const d = new Date(date);
  return `${days[d.getDay()]} ${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}<br>${title}`;
}

function handleHolidays(holidayItems) {
  if (!holidayItems.length) return;

  const holidayDiv = setdiv('holiday', 'holidaycandle');
  updateTextContent('holiday', holidayItems[0].title);
}

/* ===============================
   INPUT HANDLING
================================ */
inputField.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});

/* ===============================
   AI SUMMARY (UNCHANGED)
================================ */
async function generateAI() {
  const button = document.getElementById('gpt');
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  const url = "https://open-ai21.p.rapidapi.com/chatgpt";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "REPLACE_WITH_SECURE_KEY",
      "x-rapidapi-host": "open-ai21.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{
        role: "user",
        content: "Summarize this parsha in 5 bullet sentences in HTML list format. Only include <ul><li>. " + parsha
      }],
      web_access: false,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data?.result) {
      document.getElementById('parsha').insertAdjacentHTML(
        "beforeend",
        `<h4 class="psummary">Parsha Summary:</h4>${data.result}`
      );
      button.innerHTML = "";
    }
  } catch (err) {
    console.error(err);
  }
}
