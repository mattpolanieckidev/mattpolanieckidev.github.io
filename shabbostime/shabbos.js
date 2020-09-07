var input;
var inputField = document.getElementById("zip");
document.getElementById("zip").maxLength = "5";
var zip;
var city;
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


function changeColor() {
  var body = document.querySelector("body");
  var color= '#' + (Math.floor(Math.random() * 2 ** 24)).toString(16).padStart(0, 6)
  body.style.backgroundColor = color;
  document.getElementById('colorlabel2').innerHTML = "Shabbos Times " + color;
}



function find(){
   input = document.getElementById("zip").value;
   zip = 'zip=' + input;
fetch('https://www.hebcal.com/shabbat/?cfg=json&'+zip+'&m=50')
  .then(
    function (response) {
      response.json().then(function (data) {
        //replace header text
        city = data.location.city + ", " + data.location.state;
        document.getElementById("header").innerHTML = city;
        //get parsha
        document.getElementById('parshalabel').innerHTML =  "Torah portion: <br> <span id = \"parsha\"> </span>";
        document.getElementById('parsha').innerHTML = data.items.filter(i => i.category == "parashat")[0].title;

        //get candlelighting
        var d = new Date(data.items.filter(i => i.category == "candles")[0].date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var formattedDate = days[d.getDay()] + " " + (d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getFullYear();
        document.getElementById("candleLighting").innerHTML = formattedDate + "<br>" + (data.items.filter(i => i.category == "candles")[0].title);

        //get havdala
        var e = new Date(data.items.filter(i => i.category == "havdalah")[0].date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var formattedDate = days[e.getDay()] + " " + (e.getMonth() + 1) + "-" + e.getDate() + "-" + e.getFullYear();
        document.getElementById("havdala").innerHTML = formattedDate + "<br>" + data.items.filter(i => i.category == "havdalah")[0].title;

      }
      );
    }
  )
  }

  // Execute a function when the user releases a key on the keyboard
  inputField.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submit").click();
    }
  });