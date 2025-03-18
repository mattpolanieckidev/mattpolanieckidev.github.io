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
          document.getElementById('parshalabel').innerHTML = "Torah portion: <br> <span id = \"parsha\"> </span> <button id=\"gpt\" class=\"fa-regular fa-rectangle-list fa-2xs\" onclick=\"generateAI()\"></button>";
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

  const button = document.getElementById('gpt'); // Select the button element

  // Set the button to a loading state
  button.classList.toggle("fa-regular", "fa-rectangle-list", "fa-2xs");
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  const url = "https://open-ai21.p.rapidapi.com/chatgpt";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "bd3893a85fmsh47b0203e08b8f58p13007djsn0a939f91a737", // Replace with a secure key
      "x-rapidapi-host": "open-ai21.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: "Summarize this parsha in 5 bullet sentences in HTML list format. Only include the <ul> and <li> in the return. Do not include ```html in the return " + parsha }],
      web_access: false,
    }),
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json(); // Parse response JSON
  
      // Log full response for debugging
      console.log("API Response:", data);
  
      // Extract and display the result
      if (data.status && data.result) {
        const summary = data.result;
        const summaryDiv = document.createElement('div');
        summaryDiv.innerHTML = `<h4 class=\"psummary\">Parsha Summary:</h4>${summary}`;
        document.getElementById('parsha').appendChild(summaryDiv);
        button.innerHTML = '';
      } else {
        document.getElementById("summary").innerText = "No valid response received.";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("summary").innerText = "Error retrieving data.";
    }
  };
  
  fetchData();
  
  };