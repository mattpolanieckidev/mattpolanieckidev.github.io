var input = document.getElementById("zip").value;
var inputField = document.getElementById("zip");
document.getElementById("zip").maxLength = "5";
var zip;
var city;
var colors = ['#6F1E51', '#FFC312', '#F79F1F', '#EE5A24', '#EA2027', '#C4E538', '#A3CB38', '#009432', '#006266', '#12CBC4', '#1289A7', '#0652DD', '#1B1464', '#FDA7DF', '#D980FA', '#9980FA', '#5758BB', '#ED4C67', '#B53471', '#833471', '#6F1E51'];
var body = document.querySelector("body");
var page = document.getElementById('page')
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var parsha;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
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
  if (inputField.value === "") {
    console.log("empty")
  }
  else {
    find();
  }
}

function setdiv() {
  div = document.createElement("div");
  page.append(div)

}

function find() {
  input = document.getElementById("zip").value;
  zip = 'zip=' + input;
  localStorage.setItem('zipcode', input);
  fetch('https://www.hebcal.com/shabbat/?cfg=json&' + zip + '&m=50')
    .then(function (response) {
      response.json().then(function (data) {
        // Check if the 'items' array exists and is not empty
        if (data && data.items && data.items.length > 0) {
          // Replace header text
          city = data.location.city + ", " + data.location.state;
          document.getElementById("header").innerHTML = city;

          // Get parsha
          document.getElementById('parshalabel').innerHTML = "Torah portion: <br> <span id = \"parsha\"> </span> <i id=\"gpt\" class=\"fa-regular fa-rectangle-list fa-2xs\" onclick=\"generateAI()\"></i>";
          document.getElementById('parsha').innerHTML = data.items.filter(i => i.category == "parashat")[0]?.title  || '';
          parsha = data.items.filter(i => i.category == "parashat")[0]?.title;

          // Get candlelighting
          var d = new Date(data.items.filter(i => i.category == "candles")[0]?.date);
          var formattedDate = days[d.getDay()] + " " + (d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getFullYear();
          document.getElementById("candleLighting").innerHTML = formattedDate + "<br>" + (data.items.filter(i => i.category == "candles")[0]?.title || '');

          // Get havdala
          var e = new Date(data.items.filter(i => i.category == "havdalah")[0]?.date);
          var formattedDate = days[e.getDay()] + " " + (e.getMonth() + 1) + "-" + e.getDate() + "-" + e.getFullYear();
          document.getElementById("havdala").innerHTML = formattedDate + "<br>" + (data.items.filter(i => i.category == "havdalah")[0]?.title || '');

          // Handle holidays
          var holidayItems = data.items.filter(i => i.category == "holiday");
          if (holidayItems.length > 0) {
            setdiv();
            div.setAttribute("id", 'holiday');
            document.getElementById('holiday').innerHTML = holidayItems[0]?.title || '';
            var holidayname = holidayItems[0]?.title || '';
            let p = document.createElement("p");
            p.setAttribute('id', 'holidaycandle');
            p.setAttribute('class', 'holidaycandle');
            p.innerHTML = data.items.filter(i => i.memo == holidayname)[0]?.title || '';
            div.append(p);
            console.log('true');
          }

          var yomtovItems = data.items.filter(i => i.yomtov == true);
          if (yomtovItems.length >= 2) {
            setdiv();
            div.setAttribute("id", 'holiday2');
            div.setAttribute("class", 'holidaycandle');
            document.getElementById('holiday2').innerHTML = yomtovItems[0]?.title || '';
            var holidayname = yomtovItems[0]?.title || '';
            let p = document.createElement("p");
            p.setAttribute('class', 'holidaycandle');
            p.innerHTML = data.items.filter(i => i.memo == holidayname)[0]?.title || '';
            div.append(p);

            setdiv();
            div.setAttribute("id", 'holiday3');
            div.setAttribute("class", 'holidaycandle');
            document.getElementById('holiday3').innerHTML = yomtovItems[1]?.title || '';
            var holidayname2 = yomtovItems[1]?.title || '';
            let p2 = document.createElement("p");
            p2.setAttribute('class', 'holidaycandle');
            p2.innerHTML = data.items.filter(i => i.memo == holidayname2)[0]?.title || '';
            div.append(p2);
          }
        } else {
          console.error("No data items found.");
        }
      })
        .catch(function (error) {
          console.error("Error parsing JSON:", error);
        });
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });
}



// Execute a function when the user releases a key on the keyboard
inputField.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});


async function generateAI() {
  const url = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
  const button = document.getElementById('gpt'); // Select the GPT icon

  // Set the icon to a loading state
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

  // Fetch data from the API
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'bd3893a85fmsh47b0203e08b8f58p13007djsn0a939f91a737',
          'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com',
      },
      body: JSON.stringify({
          question: 'Summarize this parsha into 5 bullet points formatted as HTML list items:' + parsha, // Modify this to use the desired question
      }),
  };

  try {
      // Send the request
      const response = await fetch(url, options);

      // Check if response status is OK
      if (!response.ok) {
          throw new Error('Network response was not ok.');
      }

      // Parse response as JSON
      const data = await response.json();
      // Extract and display the summary in a div below the Parsha label
      const summary = data.answer;
      const summaryDiv = document.createElement('div');
      summaryDiv.innerHTML = `<h4>Parsha Summary:</h4>${summary}`;
      document.getElementById('parsha').appendChild(summaryDiv);

  } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, reset button state, or show error message to the user
  } finally {
      // Reset the Font Awesome icon
      button.innerHTML = '';
  }
}
