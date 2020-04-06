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
  prev = textPull.prev;
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
//get previous page
function prevPage() {
  fetch('https://www.sefaria.org/api/texts/' + prev)
    .then(function (response) {
      return response.json()
    })
    .then(function (prevPull) {
      document.getElementById('content').textContent = "";
      enPasuk = prevPull.text;
      hePasuk = prevPull.he;
      count = 0;
      var newDiv = document.createElement("div");
      content.appendChild(newDiv);
      newDiv.classList.add("nextContent");
      var newHeading = document.createElement("h3");
      newHeading.innerHTML = prevPull.ref;
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
      prev = prevPull.prev;
      next = prevPull.next;
      document.getElementById("next").innerHTML = prevPull.next;
      document.getElementById("prev").innerHTML = "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +
        "<path d=\"M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z\"></path>" + "</svg>" + prevPull.prev;
     
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
    prev = findPull.prev;
    document.getElementById("prev").innerHTML = "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +
        "<path d=\"M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z\"></path>" + "</svg>" + findPull.prev;
     
  })
 }
