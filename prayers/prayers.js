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
var textdiv = document.getElementById("content");
var div;
var heading;
var ul;
var pasuk;
var newHeading;
var versionNum;
var versionDate;
var links;

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
function writePasuk(){
  for (var pasuk of hePasuk) {
    var li = document.createElement("li");
    if (localStorage.getItem("hidden") === "hidden"){
    li.innerHTML = hePasuk[count] + "<p class=\"english hidden\">" + pasuk + "</p>";
    ul.appendChild(li);
    count++;
    }
    else {
      li.innerHTML = hePasuk[count] + "<p class=\"english\">" + pasuk + "</p>";
      ul.appendChild(li);
      count++;
    }
  }
}

//get today's date and page number
fetch('https://www.sefaria.org/api/texts/Siddur_Sefard%2C_Various_Prayers_%26_Segulot%2C_Parashat_Haman_Reading_for_Tuesday_Beshalach.1')
  .then(function (response) {
    return response.json()
  })
    .then(function (textPull) {
      hePasuk = textPull.he;
      count = 0;
      createDiv();
      heading.innerHTML = textPull.ref;
      writePasuk();
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
    .then(function (pull) {
      hePasuk = pull.he;
      count = 0;
      createDiv();
      heading.innerHTML = pull.ref;
      writePasuk();
      heading.scrollIntoView({behavior:"auto", block:"center"});
      document.getElementById("next").innerHTML = pull.next;
      next = pull.next;
    })
}


//get previous page
/*function prevPage() {
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
*/

function hide(){
  var x = document.getElementsByClassName("english");
  for (i = 0; i < x.length; i++) {
    x.item(i).classList.toggle("hidden");
  }
  if (localStorage.getItem("hidden") === "show"){
  localStorage.setItem("hidden", "hidden");}
    else{
      localStorage.setItem("hidden", "show");
    }

}