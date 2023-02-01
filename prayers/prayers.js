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

//dark mode
function night(){
  if (localStorage.getItem("night") === "light"){
  document.getElementById("body").classList.toggle("night");
  document.getElementById("toggleclose").classList.toggle("nightcolor");
  document.getElementById("masechta").classList.toggle("nightcolor");
  document.getElementById("modal").classList.toggle("bg-dark");
  document.getElementById("nav").classList.toggle("bg-dark");
  document.getElementById("switch1").checked = true;
  localStorage.setItem("night", "dark");}
  else{
    document.getElementById("body").classList.toggle("night");
    document.getElementById("toggleclose").classList.toggle("nightcolor");
    document.getElementById("masechta").classList.toggle("nightcolor");
    document.getElementById("modal").classList.toggle("bg-dark");
    document.getElementById("nav").classList.toggle("bg-dark");
    document.getElementById("switch1").checked = false;
    localStorage.setItem("night", "light");
  }
}

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

//set slider value on mobile
function myFunction(x) {
  if (x.matches) { // If media query matches
    adjustFont("1");
  } else {
    adjustFont("2");
  }
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
function writePasuk(){
  for (var pasuk of hePasuk) {
    var p = document.createElement("p");
    if (localStorage.getItem("hidden") === "hidden"){
    p.innerHTML = hePasuk[count];
    ul.appendChild(p);
    count++;
    }
   
  }
}



//get today's date and page number
fetch('https://www.sefaria.org/api/texts/Siddur_Sefard%2C_Additional_Prayers_%2C_Chapter_of_Manna?lang=he&with=all&lang2=he')
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

var x = window.matchMedia("(orientation:portrait)")
myFunction(x)
x.addListener(myFunction)

//adjust font size based on slider value
function adjustFont(a){
  for (i = 0; i < pageText.length; i++) {
    if (a === "1"){
      slider.value="1";
      localStorage.setItem("size", "1");
      pageText.style.fontSize="18px";
    }
    else if (a === "2"){
      slider.value="2";
      localStorage.setItem("size", "2");
      pageText.style.fontSize="24px";
    }
    else if (a === "3"){
      localStorage.setItem("size", "3");
      pageText.style.fontSize="32px";
    }
    }
  };




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
/*
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

}*/