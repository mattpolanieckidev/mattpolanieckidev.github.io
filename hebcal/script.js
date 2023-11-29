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

function displayDaveningTimesInHTML(times, outputElement) {
    outputElement.innerHTML = ''; // Clear previous content

    times.forEach((time) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${time.date}: ${time.earliestTime}`;
        outputElement.appendChild(listItem);
    });
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

document.getElementById('f2').addEventListener('submit', function (event) {
    event.preventDefault();
    const month = document.getElementById('month').value;
    const year = document.getElementById('year2').value;

    if (month && year) {
        const latitude = 40.7128; // New York City
        const longitude = -74.0060; // New York City
        const angleBelowHorizon = 12.9;

        const daveningTimes = calculateEarliestDaveningTimes(latitude, longitude, year, month, angleBelowHorizon);
        displayDaveningTimesInHTML(daveningTimes, document.getElementById('davening'));
    } else {
        alert('Please enter valid month and year values.');
    }
});


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