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


const latitude = 41.822232;
const longitude = -71.448292;
const tzid = 'America/New_York';
const decemberStart = new Date(2023, 11, 1); // December 1, 2023
const decemberEnd = new Date(2023, 11, 31);  // December 31, 2023

// Create a GeoLocation instance
const gloc = new hebcal.GeoLocation(null, latitude, longitude, 0, tzid);

// Loop through each day in December
for (let currentDate = new Date(decemberStart); currentDate <= decemberEnd; currentDate.setDate(currentDate.getDate() + 1)) {
  // Create a Zmanim instance for the current day
  const zmanim = new hebcal.Zmanim(gloc, currentDate, false);

  // Calculate the earliest Shacharit time
  const earliestShacharit = zmanim.alotHaShachar();

  // Format the time without the timezone offset using toLocaleTimeString
  const timeStr = earliestShacharit.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  console.log(`${currentDate.toLocaleDateString()}: Earliest Shacharit Time: ${timeStr}`);
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