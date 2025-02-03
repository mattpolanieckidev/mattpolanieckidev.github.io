var date, next, prev, enPasuk, hePasuk, amudCount, section, currentAmud, masechtaProgress, masechtaSearch = document.getElementById("masechta"),div, heading, ul, pasuk, newHeading, links;
var pageTitle = document.getElementById("pageTitle");
var textdiv = document.getElementById("content");
var slider = document.getElementById("fontSize");
var fontSize = slider.value;
var textContent = document.getElementsByClassName("pageText");
let result;

//nightmode
if (localStorage.getItem("night") === "dark") {
  document.getElementById("content").classList.toggle("night", !isNight);
  document.getElementById("body").classList.toggle("night", !isNight);
  document.getElementById("toggleclose").classList.toggle("nightcolor", !isNight);
  document.getElementById("masechta").classList.toggle("nightcolor", !isNight);
  document.getElementById("modal").classList.toggle("bg-dark", !isNight);
  document.getElementById("nav").classList.toggle("bg-dark", !isNight);
  document.getElementById("switch1").checked = true;
 
}
else {
  document.getElementById("body").classList.remove("night");
  document.getElementById("switch1").checked = false;
  localStorage.setItem("night", "light");
}

//create and append Div, Heading, and Unordered List
function createDiv(){
  div = document.createElement("div");
  div.classList.add("textContent");
  textdiv.appendChild(div);
  heading = document.createElement("h3");
  heading.className = "pageHeading";
  div.appendChild(heading);
  ul = document.createElement("ul");
  ul.classList.add("pageText");
  div.appendChild(ul);
}

//Loop through available pasukim and append to unordered list. Check to see if the translation should be shown or not.
function writePasuk() {
  for (let i = 0; i < enPasuk.length; i++) {
    const enLines = enPasuk[i];
    const heLines = hePasuk[i];

    for (let j = 0; j < enLines.length; j++) {
      const enLine = enLines[j];
      const heLine = heLines[j];
      
      const li = document.createElement("li");
      const isHidden = localStorage.getItem("hidden") === "hidden";
      const englishClass = isHidden ? "english hidden" : "english";
      
      li.innerHTML = `<p>${heLine}</p><p class="${englishClass}">${enLine}</p>`;
      ul.appendChild(li);
    }
  }
  const isHidden = localStorage.getItem("hidden") === "hidden";
  document.getElementById("switch2").checked = !isHidden;
  adjustFont(localStorage.getItem("size"));
}

//dark mode
function night() {
  // Get the current value of the "night" key from `localStorage`
  const isNight = localStorage.getItem("night") === "dark";
  
  // Toggle the "night" class on the body, toggle the "nightcolor" class on elements, and toggle the "bg-dark" class on elements
  document.getElementById("content").classList.toggle("night", !isNight);
  document.getElementById("body").classList.toggle("night", !isNight);
  document.getElementById("toggleclose").classList.toggle("nightcolor", !isNight);
  document.getElementById("masechta").classList.toggle("nightcolor", !isNight);
  document.getElementById("modal").classList.toggle("bg-dark", !isNight);
  document.getElementById("nav").classList.toggle("bg-dark", !isNight);
  
  // Update the state of the "switch1" checkbox and the value of the "night" key in `localStorage`
  localStorage.setItem("night", isNight ? "light" : "dark");
}

//get today's date and page number
fetch("https://www.sefaria.org/api/calendars/")
  .then(response => response.json())
  .then(myJson => {
    document.getElementById("date").innerHTML = myJson.date;
    const dafYomi = myJson.calendar_items.find(i => i.title.en === "Daf Yomi").url;
    document.getElementById("pages").innerText = dafYomi;
    fetch(`https://www.sefaria.org/api/texts/${dafYomi}`)
      .then(response => response.json())
      .then(pull => {
        const amudCount = (pull.length / 2) + 1;
        const section = pull.sections.toString();
        const currentAmud = Number(section.slice(0, -1));
        const masechtaProgress = `${pull.book} ${currentAmud} of ${amudCount}`;
        masechtaSearch.value = pull.book;
        enPasuk = pull.text;
        hePasuk = pull.he;
        createDiv();
        heading.innerHTML = pull.ref;
        writePasuk();
        
        document.getElementById("next").innerHTML = pull.next;
        document.getElementById("prev").innerHTML = pull.prev;
        next = pull.next;
        prev = pull.prev;
        pageTitle.innerText = masechtaProgress;
        document.getElementById("next").innerHTML = pull.next;
        document.getElementById("prev").innerHTML = "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +"<path d=\"M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z\"></path> </svg>" + pull.prev;
      })
  })

//get next page
const nextPage = async () => {
  try {
    // Fetch the next page's content
    const response = await fetch(`https://www.sefaria.org/api/texts/${encodeURIComponent(next)}`);
    if (!response.ok) throw new Error("Failed to fetch next page");

    const { text: enPasuk, he: hePasuk, ref, next: nextPasuk } = await response.json();

    // Split the nextPasuk into masechta and page using the correct delimiter
    const [masechta, page] = nextPasuk.split('.'); // Use '.' if the API returns "Kiddushin.66"

    // Create the updated next variable
    const updatedNext = `${masechta}.${page}`;

    // Clear existing content and create a new content div
    document.getElementById("content").textContent = "";
    createDiv();
    heading.innerHTML = ref;

    // Write the new page's content to the screen
    writePasuk(enPasuk, hePasuk);

    // Scroll to the new heading
    heading.scrollIntoView({ behavior: "auto", block: "center" });

    // Update the "next" element to display the next page
    document.getElementById("next").innerHTML = updatedNext;
  } catch (error) {
    console.error("Error fetching next page:", error);
    alert("Failed to load the next page. Please try again.");
  }
};
//get previous page
const prevPage = async () => {
  document.getElementById("content").textContent = "";
  // Fetch the prev page's content
  const response = await fetch(`https://www.sefaria.org/api/texts/${prev}`);
  const { text: enPasuk, he: hePasuk, ref, prev: prevPasuk, next: nextPasuk} = await response.json();

  // Split the prevPasuk into masechta and page using space as the delimiter
  const [masechta, page] = prevPasuk.split(' ');

  // Create the new prev variable with the preferred format "Kiddushin.66"
  prev = `${masechta}.${page}`;

  // Update the next variable with the new value
  next = `${nextPasuk}`;
  // create a new content div, and set the heading
  createDiv();
  heading.innerHTML = ref;

  // Write the new page's content to the screen
  writePasuk(enPasuk, hePasuk);

  // Update the "next" element to display the next page
  document.getElementById("next").innerHTML = next;
  document.getElementById("prev").innerHTML = prev;
}


const hide = () => {
  const x = document.getElementsByClassName("english");
  for (let i = 0; i < x.length; i++) {
    x.item(i).classList.toggle("hidden");
  }
  localStorage.setItem("hidden", localStorage.getItem("hidden") === "show" ? "hidden" : "show");
}
