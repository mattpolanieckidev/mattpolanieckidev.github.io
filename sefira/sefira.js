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
];

// Constants
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const OMER_START_MONTH = 3; // April (0-based index)
const OMER_START_DAY = 13; // April 13th

// Utility Functions
function getOmerStartDate(year) {
    return new Date(year, OMER_START_MONTH, OMER_START_DAY);
}

function daysBetweenDates(startDate, endDate) {
    return Math.ceil((endDate - startDate) / ONE_DAY_MS);
}

function updateTextContent(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

function getCurrentOmerDay() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const omerStartDate = getOmerStartDate(currentYear);

    if (today < omerStartDate) {
        return { day: 0, message: `Days until Omer: ${daysBetweenDates(today, omerStartDate)}` };
    }

    const diffDays = Math.floor((today - omerStartDate) / ONE_DAY_MS);
    const isBefore8pm = today.getHours() < 20;
    const displayDate = isBefore8pm ? new Date(today - ONE_DAY_MS) : today;

    return { day: diffDays, message: `This is the count for ${displayDate.toLocaleDateString()}` };
}

// Main Logic
function initializeOmer() {
    const { day, message } = getCurrentOmerDay();

    // Update DOM
    updateTextContent('today-date', message);
    updateTextContent('hebrew', omer[day]?.hebrew || "");
    updateTextContent('english', omer[day]?.english || "");

    // Mark counted days
    renderCountedDays();
}

function renderCountedDays() {
    const countedDays = getCountedDays();
    const countedDaysList = document.getElementById('counted-days');
    if (!countedDaysList) return;

    countedDaysList.innerHTML = ""; // Clear existing list
    countedDays.forEach(({ day, hebrew }) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span class="circle">${day}</span> ${hebrew}`;
        countedDaysList.appendChild(listItem);
    });
}

function markDayAsCounted(day) {
    const currentYear = new Date().getFullYear();
    const key = `omer_${currentYear}_${day}`;
    if (localStorage.getItem(key)) return;

    localStorage.setItem(key, 'true');
    renderCountedDays();
}

function getCountedDays() {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 49 }, (_, i) => i + 1)
        .filter(day => localStorage.getItem(`omer_${currentYear}_${day}`) === 'true')
        .map(day => ({ day, hebrew: omer[day - 1]?.hebrew }));
}

// Initialize
initializeOmer();
