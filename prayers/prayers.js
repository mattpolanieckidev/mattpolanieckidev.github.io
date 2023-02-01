var date, next, prev, hePasuk, amudCount, section, currentAmud;
var pageTitle = document.getElementById("pageTitle");
var textdiv = document.getElementById("content");
var div, heading, ul, pasuk, newHeading, links;
var slider = document.getElementById("fontSize");
var fontSize = slider.value;
var textContent = document.getElementsByClassName("pageText");


if (localStorage.getItem("night") === "dark") {
  document.getElementById("body").classList.add("night");
  document.getElementById("nav").classList.add("bg-dark");
  document.getElementById("modal").classList.add("bg-dark");
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
function writePasuk(){
  for (var pasuk of hePasuk) {
    var li = document.createElement("li");
    li.innerHTML = hePasuk[count];
    ul.appendChild(li);
    count++;
    document.getElementById("switch2").checked = false;
    adjustFont(localStorage.getItem("size"));
  }
}

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

//get today's date and page number
    fetch('https://www.sefaria.org/api/texts/Siddur_Sefard%2C_Additional_Prayers_%2C_Chapter_of_Manna?lang=he&with=all&lang2=he')
      .then(function (response) {
        return response.json()
      }) //get today's text
      .then(function (pull) {
        section = pull.sections.toString();
        hePasuk = pull.he;
        count = 0;
        createDiv();
        heading.innerHTML = pull.ref;
        writePasuk();

      })


//get next page
function nextPage() {
  fetch("https://www.sefaria.org/api/texts/Siddur_Sefard%2C_Additional_Prayers_%2C_Chapter_of_Manna?lang=he&with=all&lang2=he" + next)
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
      heading.scrollIntoView({behavior:"auto", block:"center"});
      document.getElementById("next").innerHTML = pull.next;
      next = pull.next;
    })
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

var x = window.matchMedia("(orientation:portrait)")
myFunction(x)
x.addListener(myFunction)

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



  