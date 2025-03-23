var omer = [
	{ hebrew: 'הַיּוֹם אחד יָמִים לָעֹמֶר', english: 'Today is One Day of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁנֵי יָמִים לָעֹמֶר', english: 'Today is Two Days of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁלֹשָׁה יָמִים לָעֹמֶר', english: 'Today is Three Days of the Omer' },
	{ hebrew: 'הַיּוֹם אַרְבָּעָה יָמִים לָעֹמֶר', english: 'Today is Four Days of the Omer' },
	{ hebrew: 'הַיּוֹם חֲמִשָּׁה יָמִים לָעֹמֶר', english: 'Today is Five Days of the Omer' },
	{ hebrew: 'הַיּוֹם שִׁשָּׁה יָמִים לָעֹמֶר', english: 'Today is Six Days of the Omer' },
	{ hebrew: 'הַיּוֹם שִׁבְעָה יָמִים, שֶׁהֵם שָׁבוּעַ אֶחָד לָעֹמֶר', english: 'Today is Seven Days, which are One Week of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁמוֹנָה יָמִים, שֶׁהֵם שָׁבוּעַ אֶחָד וְיוֹם אֶחָד לָעֹמֶר', english: 'Today is Eight Days, which are One Week and One Day of the Omer' },
	{ hebrew: 'הַיּוֹם תִּשְׁעָה יָמִים, שֶׁהֵם שָׁבוּעַ אֶחָד וּשְׁנֵי יָמִים לָעֹמֶר', english: 'Today is Nine Days, which are One Week and Two Days of the Omer' },
	{ hebrew: 'הַיּוֹם עֲשָׂרָה יָמִים, שֶׁהֵם שָׁבוּעַ אֶחָד וּשְׁלֹשָׁה יָמִים לָעֹמֶר', english: 'Today is Ten Days, which are One Week and Three Days of the Omer' },
	{ hebrew: 'הַיּוֹם אַחַד עָשָׂר יוֹם, שֶׁהֵם שָׁבוּעַ אֶחָד וְאַרְבָּעָה יָמִים לָעֹמֶר', english: 'Today is Eleven Days, which are One Week and Four Days of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁנֵים עָשָׂר יוֹם, שֶׁהֵם שָׁבוּעַ אֶחָד וַחֲמִשָּׁה יָמִים לָעֹמֶר', english: 'Today is Twelve Days, which are One Week and Five Days of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁלֹשָׁה עָשָׂר יוֹם, שֶׁהֵם שָׁבוּעַ אֶחָד וְשִׁשָּׁה יָמִים לָעֹמֶר', english: 'Today is Thirteen Days, which are One Week and Six Days of the Omer' },
	{ hebrew: 'הַיּוֹם אַרְבָּעָה עָשָׂר יוֹם, שֶׁהֵם שְׁנֵי שָׁבוּעוֹת לָעֹמֶר', english: 'Today is Fourteen Days, which are Two Weeks of the Omer' },
	{ hebrew: 'הַיּוֹם חֲמִשָּׁה עָשָׂר יוֹם, שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וְיוֹם אֶחָד לָעֹמֶר', english: 'Today is Fifteen Days, which are Two Weeks and One Day of the Omer' },
	{ hebrew: 'הַיּוֹם שִׁשָּׁה עָשָׂר יוֹם, שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וּשְׁנֵי יָמִים לָעֹמֶר', english: 'Today is Sixteen Days, which are Two Weeks and Two Days of the Omer' },
	{ hebrew: 'הַיּוֹם שִׁבְעָה עָשָׂר יוֹם, שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וּשְׁלֹשָׁה יָמִים לָעֹמֶר', english: 'Today is Seventeen Days, which are Two Weeks and Three Days of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁמוֹנָה עָשָׂר יוֹם, שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וְאַרְבָּעָה יָמִים לָעֹמֶר', english: 'Today is Eighteen Days, which are Two Weeks and Four Days of the Omer' },
	{ hebrew: 'הַיּוֹם תִּשְׁעָה עָשָׂר יוֹם, שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וַחֲמִשָּׁה יָמִים לָעֹמֶר', english: 'Today is Nineteen Days, which are Two Weeks and Five Days of the Omer' },
	{ hebrew: 'הַיּוֹם עֶשְׂרִים יוֹם, שֶׁהֵם שְׁנֵי שָׁבוּעוֹת וְשִׁשָּׁה יָמִים לָעֹמֶר', english: 'Today is Twenty Days, which are Two Weeks and Six Days of the Omer' },
	{ hebrew: 'הַיּוֹם אֶחָד וְעֶשְׂרִים יוֹם, שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת לָעֹמֶר', english: 'Today is Twenty-One Days, which are Three Weeks of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁנַֽיִם וְעֶשְׂרִים יוֹם, שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וְיוֹם אֶחָד לָעֹמֶר', english: 'Today is Twenty-Two Days, which are Three Weeks and One Day of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁלֹשָׁה וְעֶשְׂרִים יוֹם, שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וּשְׁנֵי יָמִים לָעֹמֶר', english: 'Today is Twenty-Three Days, which are Three Weeks and Two Days of the Omer' },
	{ hebrew: 'הַיּוֹם אַרְבָּעָה וְעֶשְׂרִים יוֹם, שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וּשְׁלֹשָׁה יָמִים לָעֹמֶר', english: 'Today is Twenty-Four Days, which are Three Weeks and Three Days of the Omer' },
	{ hebrew: 'הַיּוֹם חֲמִשָּׁה וְעֶשְׂרִים יוֹם, שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וְאַרְבָּעָה יָמִים לָעֹמֶר', english: 'Today is Twenty-Five Days, which are Three Weeks and Four Days of the Omer' },
	{ hebrew: 'הַיּוֹם שִׁשָּׁה וְעֶשְׂרִים יוֹם, שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וַחֲמִשָּׁה יָמִים לָעֹמֶר', english: 'Today is Twenty-Six Days, which are Three Weeks and Five Days of the Omer' },
	{ hebrew: 'הַיּוֹם שִׁבְעָה וְעֶשְׂרִים יוֹם, שֶׁהֵם שְׁלֹשָׁה שָׁבוּעוֹת וְשִׁשָּׁה יָמִים לָעֹמֶר', english: 'Today is Twenty-Seven Days, which are Three Weeks and Six Days of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁמוֹנָה וְעֶשְׂרִים יוֹם, שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת לָעֹמֶר', english: 'Today is Twenty-Eight Days, which are Four Weeks of the Omer' },
	{ hebrew: 'הַיּוֹם תִּשְׁעָה וְעֶשְׂרִים יוֹם, שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וְיוֹם אֶחָד לָעֹמֶר', english: 'Today is Twenty-Nine Days, which are Four Weeks and One Day of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁלֹשִׁים יוֹם, שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וּשְׁנֵי יָמִים לָעֹמֶר', english: 'Today is Thirty Days, which are Four Weeks and Two Days of the Omer' },
	{ hebrew: 'הַיּוֹם אֶחָד וּשְׁלֹשִׁים יוֹם, שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וּשְׁלֹשָׁה יָמִים לָעֹמֶר', english: 'Today is Thirty-One Days, which are Four Weeks and Three Days of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁנַיִם וּשְׁלֹשִׁים יוֹם, שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וְאַרְבָּעָה יָמִים לָעֹמֶר', english: 'Today is Thirty-Two Days, which are Four Weeks and Four Days of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁלֹשָׁה וּשְׁלֹשִׁים יוֹם, שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וַחֲמִשָּׁה יָמִים לָעֹמֶר', english: 'Today is Thirty-Three Days, which are Four Weeks and Five Days of the Omer' },
	{ hebrew: 'הַיּוֹם אַרְבָּעָה וּשְׁלֹשִׁים יוֹם, שֶׁהֵם אַרְבָּעָה שָׁבוּעוֹת וְשִׁשָּׁה יָמִים לָעֹמֶר', english: 'Today is Thirty-Four Days, which are Four Weeks and Six Days of the Omer' },
	{ hebrew: 'הַיּוֹם חֲמִשָּׁה וּשְׁלֹשִׁים יוֹם, שֶׁהֵם חֲמִשָּׁה שָׁבוּעוֹת לָעֹמֶר', english: 'Today is Thirty-Five Days, which are Five Weeks of the Omer' },
	{ hebrew: 'הַיּוֹם שִׁשָּׁה וּשְׁלֹשִׁים יוֹם, שֶׁהֵם חֲמִשָּׁה שָׁבוּעוֹת וְיוֹם אֶחָד לָעֹמֶר', english: 'Today is Thirty-Six Days, which are Five Weeks and One Day of the Omer' },
	{ hebrew: 'הַיּוֹם שִׁבְעָה וּשְׁלֹשִׁים יוֹם, שֶׁהֵם חֲמִשָּׁה שָׁבוּעוֹת וּשְׁנֵי יָמִים לָעֹמֶר', english: 'Today is Thirty-Seven Days, which are Five Weeks and Two Days of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁמוֹנָה וּשְׁלֹשִׁים יוֹם, שֶׁהֵם חֲמִשָּׁה שָׁבוּעוֹת וּשְׁלֹשָׁה יָמִים לָעֹמֶר', english: 'Today is Thirty-Eight Days, which are Five Weeks and Three Days of the Omer' },
	{ hebrew: 'הַיּוֹם תִּשְׁעָה וּשְׁלֹשִׁים יוֹם, שֶׁהֵם חֲמִשָּׁה שָׁבוּעוֹת וְאַרְבָּעָה יָמִים לָעֹמֶר', english: 'Today is Thirty-Nine Days, which are Five Weeks and Four Days of the Omer' },
	{ hebrew: 'הַיּוֹם אַרְבָּעִים יוֹם, שֶׁהֵם חֲמִשָּׁה שָׁבוּעוֹת וַחֲמִשָּׁה יָמִים לָעֹמֶר', english: 'Today is Forty Days, which are Five Weeks and Five Days of the Omer' },
	{ hebrew: 'הַיּוֹם אֶחָד וְאַרְבָּעִים יוֹם, שֶׁהֵם חֲמִשָּׁה שָׁבוּעוֹת וְשִׁשָּׁה יָמִים לָעֹמֶר', english: 'Today is Forty-One Days, which are Five Weeks and Six Days of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁנַיִם וְאַרְבָּעִים יוֹם, שֶׁהֵם שִׁשָּׁה שָׁבוּעוֹת לָעֹמֶר', english: 'Today is Forty-Two Days, which are Six Weeks of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁלֹשָׁה וְאַרְבָּעִים יוֹם, שֶׁהֵם שִׁשָּׁה שָׁבוּעוֹת וְיוֹם אֶחָד לָעֹמֶר', english: 'Today is Forty-Three Days, which are Six Weeks and One Day of the Omer' },
	{ hebrew: 'הַיּוֹם אַרְבָּעָה וְאַרְבָּעִים יוֹם, שֶׁהֵם שִׁשָּׁה שָׁבוּעוֹת וּשְׁנֵי יָמִים לָעֹמֶר', english: 'Today is Forty-Four Days, which are Six Weeks and Two Days of the Omer' },
	{ hebrew: 'הַיּוֹם חֲמִשָּׁה וְאַרְבָּעִים יוֹם, שֶׁהֵם שִׁשָּׁה שָׁבוּעוֹת וּשְׁלֹשָׁה יָמִים לָעֹמֶר', english: 'Today is Forty-Five Days, which are Six Weeks and Three Days of the Omer' },
	{ hebrew: 'הַיּוֹם שִׁשָּׁה וְאַרְבָּעִים יוֹם, שֶׁהֵם שִׁשָּׁה שָׁבוּעוֹת וְאַרְבָּעָה יָמִים לָעֹמֶר', english: 'Today is Forty-Six Days, which are Six Weeks and Four Days of the Omer' },
	{ hebrew: 'הַיּוֹם שִׁבְעָה וְאַרְבָּעִים יוֹם, שֶׁהֵם שִׁשָּׁה שָׁבוּעוֹת וַחֲמִשָּׁה יָמִים לָעֹמֶר', english: 'Today is Forty-Seven Days, which are Six Weeks and Five Days of the Omer' },
	{ hebrew: 'הַיּוֹם שְׁמוֹנָה וְאַרְבָּעִים יוֹם, שֶׁהֵם שִׁשָּׁה שָׁבוּעוֹת וְשִׁשָּׁה יָמִים לָעֹמֶר', english: 'Today is Forty-Eight Days, which are Six Weeks and Six Days of the Omer' },
	{ hebrew: 'הַיּוֹם תִּשְׁעָה וְאַרְבָּעִים יוֹם, שֶׁהֵם שִׁבְעָה שָׁבוּעוֹת לָעֹמֶר', english: 'Today is Forty-Nine Days, which are Seven Weeks of the Omer' },
]

var omerStartDate;

function daysUntilNextOmerCycle() {
    const today = new Date();
    const currentYear = today.getFullYear();
    omerStartDate = new Date(`${currentYear}-04-14T00:00:00`); // April 23rd, 2024

    if (today < omerStartDate) {
        const daysUntilNextOmer = Math.ceil((omerStartDate - today) / (1000 * 60 * 60 * 24));
        return `There are ${daysUntilNextOmer} days until this year's Omer cycle starts.`;
    } else {
        const nextYear = currentYear + 1;
        const nextOmerStartDate = new Date(`${nextYear}-04-14T00:00:00`); // April 23rd of next year
        const daysUntilNextOmer = Math.ceil((nextOmerStartDate - today) / (1000 * 60 * 60 * 24));
        return `There are ${daysUntilNextOmer} days until next year's Omer cycle starts.`;
    }
}
daysUntilNextOmerCycle();

function countDays(startDate) {
    const oneDay = 24 * 60 * 60 * 1000; // number of milliseconds in a day
    const now = new Date(); // get the current date and time

    // Check if today's date is before the start of the Omer cycle
    if (now < omerStartDate) {
        const daysUntilOmerStart = Math.ceil((omerStartDate - now) / oneDay);
        const displayText = `Days until Omer: ${daysUntilOmerStart}`;
        const todayDateP = document.getElementById('today-date');
        todayDateP.textContent = displayText;
        return 0; // Return 0 days counted as the Omer cycle hasn't started yet
    }
  
    const diffDays = Math.floor((now - omerStartDate) / oneDay);
  
    // get the current time and check if it's before 8pm
    const currentHour = now.getHours();
    const isBefore8pm = currentHour < 20; // 8pm = 20:00 in 24-hour time format
  
    // if it's before 8pm, subtract one day from the current date to get yesterday's date
    const displayDate = isBefore8pm ? new Date(now.getTime() - oneDay).toLocaleDateString() : now.toLocaleDateString();
  
    // add the date to a P tag
    const todayDateP = document.getElementById('today-date');
    todayDateP.textContent = `This is the count for ${displayDate}`;
  
    return diffDays; // return the number of days
}

  
const daysSinceStart = countDays("2025-04-14");
const colors = ['#6F1E51', '#FFC312', '#F79F1F', '#EE5A24', '#EA2027', '#C4E538', '#A3CB38', '#009432', '#006266', '#12CBC4', '#1289A7', '#0652DD', '#1B1464', '#FDA7DF', '#D980FA', '#9980FA', '#5758BB', '#ED4C67', '#B53471', '#833471', '#6F1E51'];
const body = document.body;
const nav = document.getElementById("colorlabel2");

document.getElementById('hebrew').textContent = omer[daysSinceStart]?.hebrew || "";
document.getElementById('english').textContent = omer[daysSinceStart]?.english || "";

function changeColor() {
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	body.style.backgroundColor = randomColor;
	nav.style.backgroundColor = randomColor;
	nav.innerHTML = "Sefirat HaOmer " + randomColor;
}

function markDayAsCounted(day) {
	const today = new Date();
    const currentYear = today.getFullYear();
	// check if the day has already been counted
	if (localStorage.setItem(`omer_${currentYear}_${day}`, 'true')) {
		console.log(`Day ${day} has already been counted.`);

		// update the button to show that the day has been counted
		const button = document.getElementById(`count-button`);
		button.textContent = '✓';

		return;
	}

	// mark the day as counted
	localStorage.setItem(`omer_${currentYear}_${day}`, 'true');

	// update the button to show that the day has been counted
	const button = document.getElementById(`count-button`);
	button.textContent = '✓';

	console.log(`Day ${day} has been counted.`);

	// add the newly counted day to the list
	const countedDaysList = document.getElementById('counted-days');
	const listItem = document.createElement('li');
	const dayNumber = document.createElement('span');
	dayNumber.textContent = day;
	dayNumber.classList.add('circle');
	listItem.appendChild(dayNumber);
	countedDaysList.appendChild(listItem);
}

const countedDays = getCountedDays();
const countedDaysList = document.getElementById('counted-days');
countedDays.forEach(day => {
	const listItem = document.createElement('li');
	const dayNumber = document.createElement('span');
	dayNumber.textContent = day.day;
	dayNumber.classList.add('circle');
	listItem.appendChild(dayNumber);
	countedDaysList.appendChild(listItem);
});


function getCountedDays() {
    const countedDays = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 1; i <= 49; i++) {
        // Check if the day is counted for the current year
        if (localStorage.getItem(`omer_${currentYear}_${i}`) === 'true') {
            countedDays.push({
                day: i,
                hebrew: omer[i - 1].hebrew
            });
        }
    }
    return countedDays;
}
