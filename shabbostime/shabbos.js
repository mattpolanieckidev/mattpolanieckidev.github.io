var input = document.getElementById("zip").value;
document.getElementById("zip").maxLength = "5";
var zip = 'zip=' + input;
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
fetch('https://www.hebcal.com/shabbat/?cfg=json&'+zip+'&m=50')
  .then(
    function (response) {
      response.json().then(function (data) {
        //replace header text
        input = document.getElementById("zip").value;
        city = data.location.city;
        document.getElementById("header").innerHTML = city;
        //get parsha
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