function getJewishHolidays(year) {
    const options = {
        year: +year,
        isHebrewYear: true,
    };
    const events = hebcal.HebrewCalendar.calendar(options);
    let str = '';
    for (const ev of events) {
        const hd = ev.getDate();
        const date = hd.greg();
        str += date.toLocaleDateString() + ' ' + ev.render() + ' (' + hd.toString() + ')\n';
    }
    return str;
}

function displayJewishHolidays(events, outputElement) {
    outputElement.textContent = events;
}


document.getElementById('f1').addEventListener('submit', function (event) {
    event.preventDefault();
    const year = document.getElementById('year').value;

    if (year) {
        const holidays = getJewishHolidays(year);
        displayJewishHolidays(holidays, document.getElementById('calendar'));
    } else {
        alert('Please enter a valid Hebrew year (3763 or later)');
    }
});


function getDaveningTimes() {
    const monthInput = document.getElementById('month').value;
    const yearInput = document.getElementById('year2').value;

    const latitude = 40.6229;
    const longitude = -73.7243;
    const tzid = 'America/New_York';
    const startDay = new Date(yearInput, monthInput - 1, 1);
    const endDay = new Date(yearInput, monthInput, 0);

    // Create a GeoLocation instance
    const gloc = new hebcal.GeoLocation(null, latitude, longitude, 0, tzid);

    let daveningTimes = '';

    // Loop through each day in the specified month and year
    for (let currentDate = new Date(startDay); currentDate <= endDay; currentDate.setDate(currentDate.getDate() + 1)) {
      // Create a Zmanim instance for the current day
      const zmanim = new hebcal.Zmanim(gloc, currentDate, false);

      // Calculate the earliest Tallis and Tefilin time using misheyakirMachmir
      const tallisTime = zmanim.misheyakirMachmir();
   

      // Format the times without the timezone offset using toLocaleTimeString
      const tallisTimeStr = tallisTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });


      daveningTimes += `${currentDate.toLocaleDateString()}: Earliest Tallis Time: ${tallisTimeStr}\n`;
    }

    // Display davening times in the pre element
    document.getElementById('davening').textContent = daveningTimes;
  }
/*
const options = {
    year: 2023,
    isHebrewYear: false,
    candlelighting: true,
    location: hebcal.Location.lookup('San Francisco'),
    sedrot: true,
    omer: true,
};
const events = hebcal.HebrewCalendar.calendar(options);

for (const ev of events) {
    const hd = ev.getDate();
    const date = hd.greg();
    console.log(date.toLocaleDateString(), ev.render('en'), hd.toString());
}
*/