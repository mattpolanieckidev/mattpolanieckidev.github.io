var date, next, prev, enPasuk, hePasuk, amudCount, section, currentAmud, masechtaProgress, masechtaSearch = document.getElementById("masechta");
var pageTitle = document.getElementById("pageTitle");
var textdiv = document.getElementById("content");
var div, heading, ul, pasuk, newHeading, links;
var slider = document.getElementById("fontSize");
var fontSize = slider.value;
var textContent = document.getElementsByClassName("pageText");


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("sw.js").then(function(registration) {
      // Registration was successful
      console.log("ServiceWorker registration successful with scope: ", registration.scope);
    }, function(err) {
      // registration failed :(
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}


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
    if (localStorage.getItem("hidden") === "hidden"){
    li.innerHTML = hePasuk[count];
    ul.appendChild(li);
    count++;
    document.getElementById("switch2").checked = false;
    adjustFont(localStorage.getItem("size"));
    }
    
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
        amudCount = (pull.length / 2) + 1;
        section = pull.sections.toString();
        hePasuk = pull.he;
        count = 0;
        createDiv();
        heading.innerHTML = pull.ref;
        writePasuk();
        document.getElementById("next").innerHTML = pull.next;
        document.getElementById("prev").innerHTML = pull.prev;
        next = pull.next;
        prev = pull.prev;
       
        document.getElementById("next").innerHTML = pull.next + "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +"<path d=\"M483.058,215.613l-215.5-177.6c-4-3.3-9.6-4-14.3-1.8c-4.7,2.2-7.7,7-7.7,12.2v93.6c-104.6,3.8-176.5,40.7-213.9,109.8c-32.2,59.6-31.9,130.2-31.6,176.9c0,3.8,0,7.4,0,10.8c0,6.1,4.1,11.5,10.1,13.1c1.1,0.3,2.3,0.4,3.4,0.4c4.8,0,9.3-2.5,11.7-6.8c73-128.7,133.1-134.9,220.2-135.2v93.3c0,5.2,3,10,7.8,12.2s10.3,1.5,14.4-1.8l215.4-178.2c3.1-2.6,4.9-6.4,4.9-10.4S486.158,218.213,483.058,215.613z M272.558,375.613v-78.1c0-3.6-1.4-7-4-9.5c-2.5-2.5-6-4-9.5-4c-54.4,0-96.1,1.5-136.6,20.4c-35,16.3-65.3,44-95.2,87.5c1.2-39.7,6.4-87.1,28.1-127.2c34.4-63.6,101-95.1,203.7-96c7.4-0.1,13.4-6.1,13.4-13.5v-78.2l180.7,149.1L272.558,375.613z\"></path>" + "</svg>";

        document.getElementById("prev").innerHTML = "<svg class=\"svg-icon\" viewBox=\"0 0 20 20\">" +
        "<path d=\"M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z\"></path>" + "</svg>" + pull.prev;
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



fetch('https://www.sefaria.org/api/texts/Siddur_Sefard%2C_Additional_Prayers_%2C_Chapter_of_Manna?lang=he&with=all&lang2=he')
  