

/**
 * Gets the zmanim for the current date and stores it in local storage. Then it fetches the zmanim data from the Hebcal API and populates the sunrise and sunset fields on the page.
 */
async function getZmanim() {
  const today = new Date();
  const date = today.toISOString().split('T')[0];
  const formattedDate = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
  document.getElementById("date").innerHTML = formattedDate;
  if (!localStorage.getItem("zipcode")) {
    document.getElementById("zip").value = localStorage.getItem("zipcode");
  }

  const zip = localStorage.getItem("zipcode");
  const url = `https://www.hebcal.com/zmanim?cfg=json&zip=${zip}&start=${date}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  document.getElementById("city").innerHTML = data.location.city + ", " + data.location.state;
  document.getElementById("sunrise").innerHTML = formatTime(data.times.sunrise);
  document.getElementById("sunset").innerHTML = formatTime(data.times.sunset);
}

// Check if zip code is already stored in local storage
if (localStorage.getItem("zipcode")) {
document.getElementById("zip").value = localStorage.getItem("zipcode");
  getZmanim();
}
function formatTime(time) {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}   

//example of data:
// {
//     "date": "2025-03-27",
//     "location": {
//         "title": "Cedarhurst, NY 11516",
//         "city": "Cedarhurst",
//         "tzid": "America/New_York",
//         "latitude": 40.62835,
//         "longitude": -73.726012,
//         "cc": "US",
//         "country": "United States",
//         "admin1": "NY",
//         "geo": "zip",
//         "zip": "11516",
//         "state": "NY",
//         "stateName": "New York"
//     },
//     "times": {
//         "chatzotNight": "2025-03-27T01:00:00-04:00",
//         "alotHaShachar": "2025-03-27T05:24:00-04:00",
//         "misheyakir": "2025-03-27T05:49:00-04:00",
//         "misheyakirMachmir": "2025-03-27T05:56:00-04:00",
//         "dawn": "2025-03-27T06:19:00-04:00",
//         "sunrise": "2025-03-27T06:46:00-04:00",
//         "sofZmanShmaMGA19Point8": "2025-03-27T09:02:00-04:00",
//         "sofZmanShmaMGA16Point1": "2025-03-27T09:12:00-04:00",
//         "sofZmanShmaMGA": "2025-03-27T09:17:00-04:00",
//         "sofZmanShma": "2025-03-27T09:53:00-04:00",
//         "sofZmanTfillaMGA19Point8": "2025-03-27T10:22:00-04:00",
//         "sofZmanTfillaMGA16Point1": "2025-03-27T10:28:00-04:00",
//         "sofZmanTfillaMGA": "2025-03-27T10:32:00-04:00",
//         "sofZmanTfilla": "2025-03-27T10:56:00-04:00",
//         "chatzot": "2025-03-27T13:00:00-04:00",
//         "minchaGedola": "2025-03-27T13:32:00-04:00",
//         "minchaGedolaMGA": "2025-03-27T13:38:00-04:00",
//         "minchaKetana": "2025-03-27T16:39:00-04:00",
//         "minchaKetanaMGA": "2025-03-27T17:21:00-04:00",
//         "plagHaMincha": "2025-03-27T17:57:00-04:00",
//         "sunset": "2025-03-27T19:15:00-04:00",
//         "beinHaShmashos": "2025-03-27T19:34:00-04:00",
//         "dusk": "2025-03-27T19:42:00-04:00",
//         "tzeit7083deg": "2025-03-27T19:48:00-04:00",
//         "tzeit85deg": "2025-03-27T19:56:00-04:00",
//         "tzeit42min": "2025-03-27T19:57:00-04:00",
//         "tzeit50min": "2025-03-27T20:05:00-04:00",
//         "tzeit72min": "2025-03-27T20:27:00-04:00"
//     }
// }
//
