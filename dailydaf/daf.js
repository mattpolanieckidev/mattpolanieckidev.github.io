var date;
var next;
var prev;
var enPasuk;
var hePasuk;
var amudCount;
var section;
var currentAmud;
var masechtaProgress;
var masechtaSearch = document.getElementById('masechta');
var pageTitle = document.getElementById("pageTitle");
var div;
var heading;
var ul;
var pasuk;
var newHeading;

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
    li.innerHTML = hePasuk[count] + "<p class=\"english\">" + pasuk + "</p>";
    ul.appendChild(li);
    count++;
  }
}

//get today's date and page number
fetch('https://www.sefaria.org/api/calendars/')
  .then(function (response) {
    return response.json()
  })
  .then(function (myJson) {
    document.getElementById('date').innerHTML = myJson.date;
    document.getElementById('pages').innerText = myJson.calendar_items[2].url;
    date = myJson.calendar_items[2].url;
    fetch('https://www.sefaria.org/api/texts/' + date)
      .then(function (response) {
        return response.json()
      }) //get today's text
      .then(function (pull) {
        amudCount = (pull.length / 2) + 1;
        section = pull.sections.toString();
        currentAmud = Number(section.slice(0, -1));
        masechtaProgress = "Daily Daf (" + currentAmud + " of " + amudCount + ")";
        masechtaSearch.value = pull.book;
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
        pageTitle.innerText = masechtaProgress;
        document.getElementById("next").innerHTML = pull.next;
        document.getElementById("prev").innerHTML = "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +
        "<path d=\"M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z\"></path>" + "</svg>" + pull.prev;       
      })
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
      var div = document.createElement("div");
      content.appendChild(div);
      div.classList.add("textContent");
      var newHeading = document.createElement("h3");
      newHeading.innerHTML = pull.ref;
      newHeading.className = "pageHeading";
      div.appendChild(newHeading);
      var ul = document.createElement("ul");
      ul.classList.add("pageText");
      div.appendChild(ul);
      for (var pasuk of enPasuk) {
        var li = document.createElement("li");
        li.innerHTML = hePasuk[count] +"<p class=\"english\">" + pasuk + "</p>";
        ul.appendChild(li);
        count++;
      }
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
      var div = document.createElement("div");
      content.appendChild(div);
      div.classList.add("textContent");
      var newHeading = document.createElement("h3");
      newHeading.innerHTML = pull.ref;
      newHeading.className = "pageHeading";
      div.appendChild(newHeading);
      var ul = document.createElement("ul");
      ul.id = "pageText";
      div.appendChild(ul);
      for (var pasuk of enPasuk) {
        var li = document.createElement("li");
        li.innerHTML = hePasuk[count] +"<p class=\"english\">" + pasuk + "</p>";
        ul.appendChild(li);
        count++;
      }
      prev = pull.prev;
      next = pull.next;
      document.getElementById("next").innerHTML = pull.next;
      document.getElementById("prev").innerHTML = "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +
        "<path d=\"M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z\"></path>" + "</svg>" + pull.prev;
     
    })
}

function hide(){
  var x = document.getElementsByClassName("english");
  for (i = 0; i < x.length; i++) {
    x.item(i).classList.toggle("hidden");
  }
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
function getPage() {
  var masechtaName = document.getElementById("masechta").value;
  var dafNum = document.getElementById("pageSelect").value;
   fetch('https://www.sefaria.org/api/texts/' + masechtaName + "." + dafNum)
   .then(function (response) {
       return response.json()
   }) //get text
   .then(function (pull) {
    document.getElementById('content').textContent = "";
    enPasuk = pull.text;
    hePasuk = pull.he;
    count = 0;
    var div = document.createElement("div");
    content.appendChild(div);
    div.classList.add("textContent");
    var newHeading = document.createElement("h3");
    newHeading.innerHTML = pull.ref;
    newHeading.className = "pageHeading";
    div.appendChild(newHeading);
    var ul = document.createElement("ul");
    ul.classList.add("pageText");
    div.appendChild(ul);
       for (var pasuk of enPasuk) {
           var li = document.createElement("li");
           li.innerHTML = hePasuk[count] + "<p class=\"english\">" + pasuk + "</p>";
           ul.appendChild(li);
           count++;
       }
       document.getElementById("prev").innerHTML = pull.prev;
       document.getElementById("next").innerHTML = pull.next;
       next = pull.next;
       prev = pull.prev;
   })
 }
