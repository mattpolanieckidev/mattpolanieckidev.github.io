var input = document.getElementById("zip").value;
var inputField = document.getElementById("zip");
document.getElementById("zip").maxLength = "5";
var zip;
var city;
var colors = ['#6F1E51', '#FFC312', '#F79F1F', '#EE5A24', '#EA2027', '#C4E538', '#A3CB38', '#009432', '#006266', '#12CBC4', '#1289A7', '#0652DD', '#1B1464', '#FDA7DF', '#D980FA', '#9980FA', '#5758BB', '#ED4C67', '#B53471', '#833471', '#6F1E51'];
var body = document.querySelector("body");
var page = document.getElementById('page')
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
          document.getElementById('parshalabel').innerHTML = "Torah portion: <br> <span id = \"parsha\"> </span>";
          document.getElementById('parsha').innerHTML = data.items.filter(i => i.category == "parashat")[0]?.title || '';

          // Get candlelighting
          var d = new Date(data.items.filter(i => i.category == "candles")[0]?.date);
          var formattedDate = days[d.getDay()] + " " + (d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getFullYear();
          var candleLightingTime = (data.items.filter(i => i.category == "candles")[0]?.title || '');
          document.getElementById("candleLightingDate").innerHTML = formattedDate;
          document.getElementById("candleLightingTime").innerHTML = candleLightingTime;

          // Get havdala
          var e = new Date(data.items.filter(i => i.category == "havdalah")[0]?.date);
          var formattedDate = days[e.getDay()] + " " + (e.getMonth() + 1) + "-" + e.getDate() + "-" + e.getFullYear();
          var havdalaTime = (data.items.filter(i => i.category == "havdalah")[0]?.title || '')
          document.getElementById("havdalaDay").innerHTML = formattedDate;
          document.getElementById("havdalaTime").innerHTML = havdalaTime;


          // Now, fetch weather data based on latitude and longitude
          const latitude = data.location.latitude; // Example: 40.62835
          const longitude = data.location.longitude; // Example: -73.726012
          const apiKey = 'dcb9fa1ae018fceadfce7f85de1eefad';
          fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
            .then(function (weatherResponse) {
              weatherResponse.json().then(function (weatherData) {
                // Check if the weather data is available
                if (weatherData && weatherData.list && weatherData.list.length > 0) {
                  // Display weather information
                  const temperature = Math.ceil(weatherData.list[0].main.temp);
                  const description = weatherData.list[0].weather[0].description;


                  // You can display weather information wherever you want in your HTML
                  document.getElementById('weatherFriday').innerHTML = `${temperature}°F <br>${description}`; 
                  document.getElementById('weatherSaturday').innerHTML = `${temperature}°F <br>${description}`;
                } else {
                  console.error("No weather data found.");
                }
              })

            });

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


// Assuming 'apiResponse' contains the API response data
const apiResponse =
{
  "cod": "200",
  "message": 0,
  "cnt": 4,
  "list": [
    {
      "dt": 1699304400,
      "main": {
        "temp": 53.91,
        "feels_like": 52.11,
        "temp_min": 52.52,
        "temp_max": 53.91,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 1018,
        "humidity": 66,
        "temp_kf": 0.77
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 75
      },
      "wind": {
        "speed": 6.98,
        "deg": 157,
        "gust": 7.65
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2023-11-06 21:00:00"
    },
    {
      "dt": 1699315200,
      "main": {
        "temp": 53.56,
        "feels_like": 51.82,
        "temp_min": 52.86,
        "temp_max": 53.56,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 1018,
        "humidity": 68,
        "temp_kf": 0.39
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 74
      },
      "wind": {
        "speed": 10.31,
        "deg": 159,
        "gust": 13.8
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2023-11-07 00:00:00"
    },
    {
      "dt": 1699326000,
      "main": {
        "temp": 54.72,
        "feels_like": 53.28,
        "temp_min": 54.72,
        "temp_max": 55.11,
        "pressure": 1017,
        "sea_level": 1017,
        "grnd_level": 1016,
        "humidity": 72,
        "temp_kf": -0.22
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 92
      },
      "wind": {
        "speed": 15.28,
        "deg": 181,
        "gust": 22.62
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2023-11-07 03:00:00"
    },
    {
      "dt": 1699336800,
      "main": {
        "temp": 56.95,
        "feels_like": 56.28,
        "temp_min": 56.95,
        "temp_max": 56.95,
        "pressure": 1014,
        "sea_level": 1014,
        "grnd_level": 1013,
        "humidity": 84,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 13.11,
        "deg": 193,
        "gust": 27.42
      },
      "visibility": 10000,
      "pop": 0.06,
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2023-11-07 06:00:00"
    }
  ],
  "city": {
    "id": 5111974,
    "name": "Cedarhurst",
    "coord": {
      "lat": 40.6284,
      "lon": -73.726
    },
    "country": "US",
    "population": 6592,
    "timezone": -18000,
    "sunrise": 1699270236,
    "sunset": 1699307187
  }
};

// Select the HTML table element where you want to display the weather data
const table = document.getElementById('weatherTable');

// Function to convert 24-hour time to 12-hour time with AM/PM
function convertTo12HourTime(time) {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const isAM = hour < 12;
  const period = isAM ? 'AM' : 'PM';
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${minutes} ${period}`;
}

// Loop through the API response and populate the table
apiResponse.list.forEach((item) => {
  // Extract the relevant data for each timestamp
  const dateTime = item.dt_txt;
  const temperature = Math.ceil(item.main.temp); // Round up temperature
  const weatherDescription = item.weather[0].description;
  const timeIn12HourFormat = convertTo12HourTime(dateTime.split(' ')[1]);

  // Create a new row in the table for each timestamp
  const row = table.insertRow();

  // Create table cells for time, temperature, and weather description
  const timeCell = row.insertCell(0);
  const temperatureCell = row.insertCell(1);
  const weatherCell = row.insertCell(2);

  // Populate the table cells with data
  timeCell.innerHTML = timeIn12HourFormat;
  temperatureCell.innerHTML = temperature + '°F';
  weatherCell.innerHTML = weatherDescription;
});