var date;
var next;
var prev;
var enPasuk;

//get today's date and page number
fetch('https://www.sefaria.org/api/texts/esther')
  .then(function (response) {
    return response.json()
  })
    .then(function (textPull) {
      enPasuk = textPull.text;
      hePasuk = textPull.he;
      count = 0;
      for (var pasuk of enPasuk) {
        var ul = document.getElementById("enText");
        var li = document.createElement("li");
        li.innerHTML = hePasuk[count] + "<br>" + "<br> <p class=\"english\">" + pasuk + "<br> <br> </p>";
        ul.appendChild(li);
        count++;
      }
      document.getElementById("next").innerHTML = textPull.next;
      document.getElementById("prev").innerHTML = textPull.prev;
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
      for (var pasuk of enPasuk) {
        var ul = document.getElementById("enText");
        var li = document.createElement("li");
        li.innerHTML = hePasuk[count] +"<br>" + "<br> <p class=\"english\">" + pasuk + "<br> <br> </p>";
        ul.appendChild(li);
        count++;
      }
      document.getElementById("next").innerHTML = nextPull.next;
      next = nextPull.next;
    })
}

var current = document.getElementById("enText").childNodes;
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
        li.innerHTML = hePasuk[count] + "<br>" + "<br> <p class=\"english\">" + pasuk + "<br> <br> </p>";
        ul.insertBefore(li, current[count]);
        count++;
      }
      prev = prevPull.prev;
      document.getElementById("prev").innerHTML = prevPull.prev;
      var current = document.getElementById("enText").childNodes;
    })
}

function hide(){
  var x = document.getElementsByClassName("english");
  for (i = 0; i < x.length; i++) {
    x.item(i).classList.toggle("hidden");
  }
}
