var date;
var next;
var prev;
var enPasuk;
var current = document.getElementById("enText").childNodes;
var amudCount;
var section;
var currentAmud;
var masechtaProgress;
var pageTitle = document.getElementById("pageTitle");

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
      .then(function (textPull) {
        amudCount = (textPull.length / 2) + 1;
        section = textPull.sections.toString();
        currentAmud = Number(section.slice(0, -1));
        masechtaProgress = "Daily Daf (" + currentAmud + " of " + amudCount + ")";
        enPasuk = textPull.text;
        hePasuk = textPull.he;
        count = 0;
        for (var pasuk of enPasuk) {
          var ul = document.getElementById("enText");
          var li = document.createElement("li");
          li.innerHTML = hePasuk[count] + "<p class=\"english\">" + pasuk + "</p>";
          ul.appendChild(li);
          count++;
        }
        pageTitle.innerText = masechtaProgress;
        document.getElementById("next").innerHTML = textPull.next;
        document.getElementById("prev").innerHTML = textPull.prev;
        next = textPull.next;
        prev = textPull.prev;
      })
  })
  
//get next page
function nextPage() {
  fetch('https://www.sefaria.org/api/texts/' + next)
    .then(function (response) {
      return response.json()
    })
    .then(function (nextPull) {
      enPasuk = nextPull.text;
      hePasuk = nextPull.he;
      count = 0;
      for (var pasuk of enPasuk) {
        var ul = document.getElementById("enText");
        var li = document.createElement("li");
        li.innerHTML = hePasuk[count] +"<p class=\"english\">" + pasuk + "</p>";
        ul.appendChild(li);
        count++;
      }
      document.getElementById("next").innerHTML = nextPull.next;
      next = nextPull.next;
    })
}

//get previous page
function prevPage() {
  fetch('https://www.sefaria.org/api/texts/' + prev)
    .then(function (response) {
      return response.json()
    })
    .then(function (prevPull) {
      enPasuk = prevPull.text;
      hePasuk = prevPull.he;
      current = document.getElementById("enText").childNodes;
      count = 0;
      for (var pasuk of enPasuk) {
        var ul = document.getElementById("enText");
        var li = document.createElement("li");
        li.innerHTML = hePasuk[count] + "<p class=\"english\">" + pasuk + "</p>";
        ul.insertBefore(li, current[count]);
        count++;
      }
      prev = prevPull.prev;
      document.getElementById("prev").innerHTML = prevPull.prev;
     
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
   .then(function (foundtextPull) {
       enPasuk = foundtextPull.text;
       hePasuk = foundtextPull.he;
       count = 0;
       document.getElementById('enText').textContent = "";
       for (var pasuk of enPasuk) {
           var ul = document.getElementById("enText");
           var li = document.createElement("li");
           li.innerHTML = hePasuk[count] + "<p class=\"english\">" + pasuk + "</p>";
           ul.appendChild(li);
           count++;
       }
       document.getElementById("prev").innerHTML = foundtextPull.prev;
       document.getElementById("next").innerHTML = foundtextPull.next;
       next = foundtextPull.next;
       prev = foundtextPull.prev;
   })
 }
