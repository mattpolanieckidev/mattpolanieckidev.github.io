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

function calculateEarliestDaveningTimes(latitude, longitude, year, month, angleBelowHorizon) {
    const geoLocation = new hebcal.GeoLocation(latitude, longitude);
    const numDaysInMonth = new Date(year, month, 0).getDate();

    const daveningTimes = [];
    for (let day = 1; day <= numDaysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        const sunrise = hebcal.Hdate.sunrise(geoLocation, currentDate);
        const adjustedSunrise = new Date(sunrise.sunrise() - (angleBelowHorizon * 60000));

        daveningTimes.push({
            date: currentDate.toDateString(),
            earliestTime: adjustedSunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
    }

    return daveningTimes;
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
    const degreesAboveHorizon = parseFloat(document.getElementById('degrees').value) || 12.9;


    const latitude = 40.6229;
    const longitude = -73.7243;
    const tzid = 'America/New_York';
    const startDay = new Date(yearInput, monthInput - 1, 1);
    const endDay = new Date(yearInput, monthInput, 0);

    // Create a GeoLocation instance
    const gloc = new hebcal.GeoLocation(null, latitude, longitude, 0, tzid);

    let tallisTimes = '';

    // Loop through each day in the specified month and year
    for (let currentDate = new Date(startDay); currentDate <= endDay; currentDate.setDate(currentDate.getDate() + 1)) {
        // Create a Zmanim instance for the current day
        const zmanim = new hebcal.Zmanim(gloc, currentDate, false);

        // Calculate the Tallis time at 12.9 degrees above the horizon
        const tallisTime = zmanim.timeAtAngle(degreesAboveHorizon, true);

        // Format the time without the timezone offset using toLocaleTimeString
        const tallisTimeStr = tallisTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        tallisTimes += `${currentDate.toLocaleDateString()}: ${tallisTimeStr}\n`;
    }

    // Display Tallis times in the pre element
    document.getElementById('degreeTitle').textContent = `Earliest Talis and Tefilin time by ${degreesAboveHorizon}° below horizon`;
    document.getElementById('davening').textContent = tallisTimes;
}

function downloadCSV() {
    const tallisTimes = document.getElementById('davening').textContent;
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(tallisTimes);

    const downloadLink = document.createElement('a');
    downloadLink.href = csvContent;
    downloadLink.download = 'davening_times.csv';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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