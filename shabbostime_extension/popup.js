// Cache DOM elements
const inputField = document.getElementById("zip");
const submitBtn = document.getElementById("submit");
const changeColorBtn = document.getElementById("changeColor");
const page = document.getElementById("page");

// Set input field properties
inputField.maxLength = 5;

// Initialize variables
let zip;
let city;
let parsha;

// Define constants
const colors = [
  '#6F1E51', '#FFC312', '#F79F1F', '#EE5A24', '#EA2027', '#C4E538', '#A3CB38',
  '#009432', '#006266', '#12CBC4', '#1289A7', '#0652DD', '#1B1464', '#FDA7DF',
  '#D980FA', '#9980FA', '#5758BB', '#ED4C67', '#B53471', '#833471', '#6F1E51'
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Chrome Storage functions
async function getZipcode() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['zipcode'], (result) => {
            resolve(result.zipcode || '');
        });
    });
}

async function setZipcode(zipcode) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ zipcode }, resolve);
    });
}

function getRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function changeColor() {
    const newColor = getRandomColor(colors);
    document.body.style.backgroundColor = newColor;
}

async function init() {
    const savedZip = await getZipcode();
    inputField.value = savedZip;
    
    if (savedZip) {
        await find();
    }
    
    changeColor();
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
    updateTextContent("header", `Shabbos Times for ${city}`);
    updateTextContent('parshalabel', `Torah portion: <br><span id="parsha">${parsha}</span> <button id="gpt" class="fa-regular fa-rectangle-list fa-2xs" title="Generate Summary"></button>`);
    updateTextContent("candleLighting", candles);
    updateTextContent("havdala", havdalah);

}

async function find() {
    try {
        const input = inputField.value.trim();
        
        // Validate zip code
        if (!input || input.length !== 5 || isNaN(input)) {
            alert("Please enter a valid 5-digit zip code");
            return;
        }

        zip = `zip=${input}`;
        await setZipcode(input);

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

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
        city = `${data.location.city}, ${data.location.state}`;

        // Extract parsha
        const parashatItem = data.items.find(i => i.category === "parashat");
        parsha = parashatItem?.title || '';

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

        // Clear previous holiday containers
        document.querySelectorAll('[id^="holiday"]').forEach(el => el.remove());

        // Handle holidays
        const holidayItems = data.items.filter(i => i.category === "holiday");
        handleHolidays(holidayItems);

        // Handle Yom Tov
        const yomtovItems = data.items.filter(i => i.yomtov === true);
        handleYomTov(yomtovItems);

    } catch (error) {
        console.error("Error fetching or processing data:", error);
        alert("Error fetching Shabbos times. Please try again.");
    } finally {
        submitBtn.innerHTML = 'Submit';
        submitBtn.disabled = false;
    }
}

// Helper function to format event text
function formatEventText(date, title) {
    const d = new Date(date);
    return `${days[d.getDay()]} ${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}<br>${title}`;
}

// Helper function to handle holidays
function handleHolidays(holidayItems) {
    if (holidayItems.length > 0) {
        const holidayDiv = setdiv('holiday', 'holidaycandle small');
        const holidayName = holidayItems[0]?.title || '';
        updateTextContent('holiday', holidayName);
    }
}

// Helper function to handle Yom Tov
function handleYomTov(yomtovItems) {
    if (yomtovItems.length >= 2) {
        yomtovItems.slice(0, 2).forEach((item, index) => {
            const holidayDiv = setdiv(`holiday${index + 2}`, 'holidaycandle small');
            const holidayName = item?.title || '';
            updateTextContent(`holiday${index + 2}`, holidayName);
        });
    }
}

// Event Listeners
submitBtn.addEventListener('click', find);
changeColorBtn.addEventListener('click', changeColor);

inputField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        find();
    }
});

// Initialize the popup
document.addEventListener('DOMContentLoaded', init);