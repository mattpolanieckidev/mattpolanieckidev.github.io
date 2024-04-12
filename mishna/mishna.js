// Variables
var date, next, prev, enPasuk, current = document.getElementById("content"), amudCount, section, currentAmud, masechtaProgress, masechtaSearch = document.getElementById('masechta'), pageTitle = document.getElementById("pageTitle"), div, heading, ul, pasuk, hidden = 0, slider = document.getElementById("fontSize"), fontSize = slider.value, textContent = document.getElementsByClassName("pageText");


//create and append Div, Heading, and Unordered List
function createDiv(){
  div = document.createElement("div");
  div.classList.add("textContent");
  content.appendChild(div);
  heading = document.createElement("h3");
  heading.className = "pageHeading";
  div.appendChild(heading);
  ul = document.createElement("ul");
  ul.classList.add("pageText");
  div.appendChild(ul);
}

//Loop through available pasukim and append to unordered list
function writePasuk(){
  for (var pasuk of enPasuk) {
    var li = document.createElement("li");
    li.innerHTML = hePasuk[count] + "<p class=\"english hidden\">" + pasuk + "</p>";
    ul.appendChild(li);
    count++;
  }
}

fetch('https://www.sefaria.org/api/texts/Mishna_Berakhot')
.then(function (response) {
  return response.json()
}) //get today's text
.then(function (pull) {
  enPasuk = pull.text;
  hePasuk = pull.he;
  count = 0;
  createDiv();
  heading.innerHTML = pull.ref;
  writePasuk();
  document.getElementById("next").innerHTML = pull.next;
  document.getElementById("prev").innerHTML = pull.prev;
  next = pull.next; 
  prev = pull.prev;
})
  
//get next page
function nextPage() {
  fetch('https://www.sefaria.org/api/texts/' + next)
    .then(function (response) {
      return response.json()
    })
    .then(function (pull) {
      enPasuk = pull.text;
      hePasuk = pull.he;
      count = 0;
      createDiv();
      heading.innerHTML = pull.ref;
      writePasuk();
      document.getElementById("next").innerHTML = pull.next;
      next = pull.next;
    })
}
//get previous page
function prevPage() {
  fetch('https://www.sefaria.org/api/texts/' + prev)
    .then(function (response) {
      return response.json()
    })
    .then(function (pull) {
      document.getElementById('content').textContent = "";
      enPasuk = pull.text;
      hePasuk = pull.he;
      count = 0;
      createDiv();
      heading.innerHTML = pull.ref;
      writePasuk();
      prev = pull.prev;
      next = pull.next;
      document.getElementById("next").innerHTML = pull.next;
      document.getElementById("prev").innerHTML = "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +
        "<path d=\"M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z\"></path>" + "</svg>" + pull.prev;
     
    })
}

const hide = () => {
    const x = document.getElementsByClassName("english");
    for (let i = 0; i < x.length; i++) {
      x.item(i).classList.toggle("hidden");
    }
    localStorage.setItem("hidden", localStorage.getItem("hidden") === "show" ? "hidden" : "show");
  }

//progress bar for full daf cycle
let date1 = new Date("1/5/2020")
let date2 = new Date("6/7/2027");
let today = new Date();
var difference_in_time = today.getTime() -  date1.getTime();
var Difference_In_Days = difference_in_time / (1000 * 3600 * 24); 
var progressNum = ((Difference_In_Days *100) / 2710).toFixed(2);
var progress = document.getElementById("progress");
progress.style.width = progressNum +"%";
progress.innerHTML = progressNum +"%";



//find a daf
const getPage = () => {
    const masechtaName = document.getElementById("masechta").value;
    const dafNum = document.getElementById("pageSelect").value;
    fetch(`https://www.sefaria.org/api/texts/Mishna_${masechtaName}.${dafNum}`)
   .then(function (response) {
       return response.json()
   }) //get text
   .then(function (pull) {
    document.getElementById('content').textContent = "";
    enPasuk = pull.text;
    hePasuk = pull.he;
    count = 0;
    createDiv();
    heading.innerHTML = pull.ref;
    writePasuk();
    document.getElementById("next").innerHTML = pull.next;
    next = pull.next;
    prev = pull.prev;
    document.getElementById("prev").innerHTML = "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +
        "<path d=\"M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z\"></path>" + "</svg>" + pull.prev;
     
  })
 }


 //set slider value on mobile
const landscapeQuery = window.matchMedia("(orientation: landscape)");

// Specify the event type ("orientationchange")
landscapeQuery.addEventListener("orientationchange", e => {
  const isLandscape = e.matches;
  const fontValue = isLandscape ? "1" : "2";
  adjustFont(fontValue);
});

// Initialize based on current orientation
adjustFont(landscapeQuery.matches ? "1" : "2");
  
  //adjust font size based on slider value
  function adjustFont(a){
    for (i = 0; i < textContent.length; i++) {
      if (a === "1"){
        slider.value="1";
        localStorage.setItem("size", "1");
        textContent.item(i).style.fontSize="18px";
      }
      else if (a === "2"){
        slider.value="2";
        localStorage.setItem("size", "2");
        textContent.item(i).style.fontSize="24px";
      }
      else if (a === "3"){
        localStorage.setItem("size", "3");
        textContent.item(i).style.fontSize="32px";
      }
      }
    };


// Define an array of the names of all the tractates
var tractates = [
    "Berakhot", "Pe'ah", "Demai", "Kil'ayim", "Shevi'it", "Terumot", "Ma'aserot", "Ma'aser Sheni", "Hallah", "Orlah", "Bikkurim",
    "Shabbat", "Eruvin", "Pesachim", "Shekalim", "Yoma", "Sukkah", "Beitzah", "Rosh Hashanah", "Ta'anit", "Megillah", "Mo'ed Katan", "Hagigah",
    "Yevamot", "Ketubot", "Nedarim", "Nazir", "Sotah", "Gittin", "Kiddushin",
    "Bava Kamma", "Bava Metzia", "Bava Batra", "Sanhedrin", "Makkot", "Shevu'ot", "Eduyot", "Avodah Zarah", "Avot", "Horayot",
    "Zevachim", "Menachot", "Chullin", "Bekhorot", "Arakhin", "Temurah", "Keritot", "Me'ilah", "Tamid", "Middot", "Kinnim",
    "Kelim", "Oholot", "Nega'im", "Parah", "Tohorot", "Mikva'ot", "Niddah", "Makhshirin", "Zavim", "Tevul Yom", "Yadayim", "Uktzin"
];

// Function to populate the dropdown with tractate options
function populateDropdown() {
    var dropdown = document.getElementById("masechtaDropdown");
    tractates.forEach(function(masechta) {
        var option = document.createElement("option");
        option.text = masechta;
        option.value = masechta;
        dropdown.appendChild(option);
    });
}

// Call the function to populate the dropdown
populateDropdown();

document.addEventListener('DOMContentLoaded', function() {
    const generatedText = localStorage.getItem('generatedText');
    if (generatedText) {
        document.getElementById('summary').innerText = generatedText;
    }
});
    
async function generateAI() {
    const url = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
    const button = document.querySelector('.gpt'); // Select the button element

    // Set the button to a loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '057428540fmsh5cec038c682e999p1c88eajsn3ad697cf50d4',
            'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com',
        },
        body: JSON.stringify({
            question: 'Summarize this text into 5 bullet points:' + enPasuk[0], // Modify this to use the desired question
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
            button.innerHTML = 'Generate AI Summary'
        } else {
            console.error('Response structure is not as expected.');
        }
    } catch (error) {
        console.error(error);
        button.classList.remove('loading-button');
    }
}


