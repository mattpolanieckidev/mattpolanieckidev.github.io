
var date;
var next;
var prev;
var dafLength;
var enPasuk;
fetch('https://www.sefaria.org/api/calendars/')
  .then(function(response) {
    return response.json()
  })
  .then(function(myJson) {
   document.getElementById('date').innerHTML = myJson.date;
   document.getElementById('pages').innerText = myJson.calendar_items[3].url;
   date = myJson.calendar_items[3].url;
   fetch('https://www.sefaria.org/api/texts/' + date)
  .then(function(response) {
    return response.json()
  })
 .then(function(textPull){
   enPasuk = textPull.text;
   hePasuk = textPull.he;
   count = 0;
   for (var pasuk of enPasuk) {
     var i = pasuk;
    var ul = document.getElementById("enText"); 
    var li = document.createElement("li");
    li.innerHTML = hePasuk[count] + "<br>"+"<br>" + "<span>" + pasuk + "</span> <br> <br>";
    ul.appendChild(li);
    count++;
  }
  document.getElementById("next").innerHTML = textPull.next;
  document.getElementById("prev").innerHTML = textPull.prev;
  next = textPull.next;
  prev = textPull.prev;
 })
  })

function nextPage(){
  fetch('https://www.sefaria.org/api/texts/' + next)
  .then(function(response){
    return response.json()
  })
  .then(function(nextPull){
    enPasuk = nextPull.text;
   hePasuk = nextPull.he;
   count = 0;
   for (var pasuk of enPasuk) {
     var i = pasuk;
    var ul = document.getElementById("enText"); 
    var li = document.createElement("li");
    li.innerHTML = hePasuk[count] + "<br>"+"<br>" + "<span>" + pasuk + "</span> <br> <br>";
    ul.appendChild(li);
    count++;
  }
  document.getElementById("next").innerHTML = nextPull.next;
  document.getElementById("prev").innerHTML = nextPull.prev;
  next = nextPull.next;
  prev = nextPull.prev;
  })
}


function prevPage(){
  fetch('https://www.sefaria.org/api/texts/' + prev)
  .then(function(response){
    return response.json()
  })
  .then(function(prevPull){
    enPasuk = prevPull.text;
    hePasuk = prevPull.he;
    count = 0;
    for (var pasuk of enPasuk) {
      var i = pasuk;
     var ul = document.getElementById("prevText"); 
     var li = document.createElement("li");
     li.innerHTML = hePasuk[count] + "<br>"+"<br>" + "<span>" + pasuk + "</span> <br> <br>";
     ul.appendChild(li);
     count++;
   }
   document.getElementById("next").innerHTML = prevPull.next;
   document.getElementById("prev").innerHTML = prevPull.prev;
    next = prevPull.next;
    prev = prevPull.prev;
  })
}