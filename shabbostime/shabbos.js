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
  body.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
}

fetch('https://www.hebcal.com/shabbat/?cfg=json&geonameid=5111974&m=50')
  .then(
    function (response) {
      response.json().then(function (data) {
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
