var date;
var next;
var prev;
var enPasuk;
var current = document.getElementById("content");
var amudCount;
var section;
var currentAmud;
var masechtaProgress;
var masechtaSearch = document.getElementById('masechta');
var pageTitle = document.getElementById("pageTitle");
var ul = document.getElementById("enText");
var heading;

fetch('https://www.sefaria.org/api/texts/Psalms.1')
.then(function (response) {
  return response.json()
}) //get today's text
.then(function (textPull) {
  enPasuk = textPull.text;
  hePasuk = textPull.he;
  count = 0;
  var newDiv = document.createElement("div");
  newDiv.classList.add("nextContent");
  content.appendChild(newDiv);
  var newHeading = document.createElement("h3");
  newHeading.innerHTML = textPull.ref;
  newHeading.className = "pageHeading";
  newDiv.appendChild(newHeading);
  var newUl = document.createElement("ul");
  newUl.classList.add("nextPageText");
  newDiv.appendChild(newUl);
  for (var pasuk of enPasuk) {
    var li = document.createElement("li");
    li.innerHTML = hePasuk[count] + "<p class=\"english\">" + pasuk + "</p>";
    newUl.appendChild(li);
    count++;
  }
  document.getElementById("next").innerHTML = textPull.next;
  next = textPull.next; 
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
      var newDiv = document.createElement("div");
      content.appendChild(newDiv);
      newDiv.classList.add("nextContent");
      var newHeading = document.createElement("h3");
      newHeading.innerHTML = nextPull.ref;
      newHeading.className = "pageHeading";
      newDiv.appendChild(newHeading);
      var newUl = document.createElement("ul");
      newUl.classList.add("nextPageText");
      newDiv.appendChild(newUl);
      for (var pasuk of enPasuk) {
        var li = document.createElement("li");
        li.innerHTML = hePasuk[count] +"<p class=\"english\">" + pasuk + "</p>";
        newUl.appendChild(li);
        count++;
      }
      document.getElementById("next").innerHTML = nextPull.next;
      next = nextPull.next;
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
  var dafNum = document.getElementById("pageSelect").value;
   fetch('https://www.sefaria.org/api/texts/Psalms.' + dafNum)
   .then(function (response) {
       return response.json()
   }) //get text
   .then(function (findPull) {
    document.getElementById('content').textContent = "";
    enPasuk = findPull.text;
    hePasuk = findPull.he;
    count = 0;
    var newDiv = document.createElement("div");
    content.appendChild(newDiv);
    newDiv.classList.add("nextContent");
    var newHeading = document.createElement("h3");
    newHeading.innerHTML = findPull.ref;
    newHeading.className = "pageHeading";
    newDiv.appendChild(newHeading);
    var newUl = document.createElement("ul");
    newUl.id = "nextPageText";
    newDiv.appendChild(newUl);
    for (var pasuk of enPasuk) {
      var li = document.createElement("li");
      li.innerHTML = hePasuk[count] +"<p class=\"english\">" + pasuk + "</p>";
      newUl.appendChild(li);
      count++;
    }
    document.getElementById("next").innerHTML = findPull.next;
    next = findPull.next;
  })
 }
