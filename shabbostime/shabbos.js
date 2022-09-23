var input = document.getElementById("zip").value;
var inputField = document.getElementById("zip");
document.getElementById("zip").maxLength = "5";
var zip;
var city;
var colors = ['#6F1E51','#FFC312','#F79F1F','#EE5A24','#EA2027','#C4E538','#A3CB38','#009432','#006266','#12CBC4','#1289A7','#0652DD','#1B1464','#FDA7DF','#D980FA','#9980FA','#5758BB','#ED4C67','#B53471','#833471','#6F1E51'];
var body = document.querySelector("body");
var page = document.getElementById('page')

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
  var i = colors[Math.floor(Math.random() * colors.length)]
  body.style.backgroundColor = i;
  document.getElementById('colorlabel2').innerHTML = "Shabbos Times " + i;
  inputField.value = localStorage.getItem("zipcode")
  if (inputField.value === ""){
    console.log("empty")
  }
  else {
    find();
  }
}

function find(){
   input = document.getElementById("zip").value;
   zip = 'zip=' + input;
   localStorage.setItem('zipcode', input);
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

        if (data.items.filter(i => i.category == "holiday")){
          div = document.createElement("div");
          page.append(div)
          div.setAttribute("id",'holiday');  
          document.getElementById('holiday').innerHTML = '<hr>' + data.items.filter(i => i.category == "holiday")[0].title;
          var holidayname=data.items.filter(i => i.category == "holiday")[0].title;
          let p = document.createElement("p")
          p.setAttribute('id', 'holidaycandle')
          p.innerHTML=data.items.filter(i => i.memo == holidayname)[0].title
          div.append(p)
          console.log('true')
        }
        if (data.items.filter(i => i.yomtov == true)){
          div = document.createElement("div");
          page.append(div)
          div.setAttribute("id",'holiday2');
          div.setAttribute("class",'holidaycandle');    
          document.getElementById('holiday2').innerHTML = '<hr>' + data.items.filter(i => i.yomtov == true)[0].title;
          var holidayname=data.items.filter(i => i.yomtov == true)[0].title;
          let p = document.createElement("p")
          p.setAttribute('class', 'holidaycandle')
          p.innerHTML=data.items.filter(i => i.memo == holidayname)[0].title
          div.append(p)
          div = document.createElement("div");
          page.append(div)
          div.setAttribute("id",'holiday3');  
          div.setAttribute("class",'holidaycandle');  
          document.getElementById('holiday3').innerHTML = '<hr>' + data.items.filter(i => i.yomtov == true)[1].title;
          var holidayname2 = data.items.filter(i => i.yomtov == true)[1].title;
          let p2 = document.createElement("p");
          p2.setAttribute('class', 'holidaycandle')
          p2.innerHTML=data.items.filter(i => i.memo == holidayname2)[0].title
          div.append(p2)
        }
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