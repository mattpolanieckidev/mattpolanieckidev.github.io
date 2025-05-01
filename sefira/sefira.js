function updateTextContent(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

//here is the response from Hebcal for an alternative Omer date pull https://www.hebcal.com/hebcal?maj=on&cfg=json&start=2025-04-30&zip=11516&nx=on&gs=on&o=on&end=2025-04-30
// {
//     "title": "Hebcal Cedarhurst April 2025",
//     "date": "2025-05-01T13:20:23.363Z",
//     "version": "5.9.3-3.2.5",
//     "location": {
//         "title": "Cedarhurst, NY 11516",
//         "city": "Cedarhurst",
//         "tzid": "America/New_York",
//         "latitude": 40.62835,
//         "longitude": -73.726012,
//         "cc": "US",
//         "country": "United States",
//         "elevation": 15,
//         "admin1": "NY",
//         "geo": "zip",
//         "zip": "11516",
//         "state": "NY",
//         "stateName": "New York"
//     },
//     "range": {
//         "start": "2025-04-30",
//         "end": "2025-04-30"
//     },
//     "items": [
//         {
//             "title": "Yom HaZikaron",
//             "date": "2025-04-30",
//             "hdate": "2 Iyyar 5785",
//             "category": "holiday",
//             "subcat": "modern",
//             "hebrew": "יום הזכרון",
//             "link": "https://hebcal.com/h/yom-hazikaron-2025?us=js&um=api",
//             "memo": "Israeli Memorial Day. Remembers those who died in the War of Independence and other wars in Israel. The full name of the holiday is Yom HaZikaron LeHalalei Ma'arakhot Yisrael ul'Nifge'ei Pe'ulot HaEivah (Hebrew: יוֹם הזִּכָּרוֹן לְחַלְלֵי מַעֲרָכוֹת יִשְׂרָאֵל וּלְנִפְגְעֵי פְּעֻלּוֹת הָאֵיבָה), Memorial Day for the Fallen Soldiers of the Wars of Israel and Victims of Actions of Terrorism. Although Yom Hazikaron is normally observed on the 4th of Iyyar, it may be moved earlier or postponed if observance of the holiday (or Yom HaAtzma'ut, which always follows it) would conflict with Shabbat"
//         },
//         {
//             "title": "17th day of the Omer",
//             "date": "2025-04-30",
//             "hdate": "2 Iyyar 5785",
//             "category": "omer",
//             "title_orig": "Omer 17",
//             "hebrew": "עומר יום 17",
//             "link": "https://hebcal.com/o/5785/17?us=js&um=api",
//             "omer": {
//                 "count": {
//                     "he": "הַיּוֹם שִׁבְעָה עָשָׂר יוֹם, שְׁהֵם שְׁנֵי שָׁבוּעוֹת וּשְׁלוֹשָׁה יָמִים לָעֽוֹמֶר",
//                     "en": "Today is 17 days, which is 2 weeks and 3 days of the Omer"
//                 },
//                 "sefira": {
//                     "he": "תִּפְאֶֽרֶת שֶׁבְּתִּפְאֶֽרֶת",
//                     "translit": "Tiferet sheb'Tiferet",
//                     "en": "Beauty within Beauty"
//                 }
//             }
//         }
//     ]
// }

function getOmerDate() {
	const url = `https://www.hebcal.com/hebcal?maj=on&cfg=json&start=${new Date().toISOString().split('T')[0]}&zip=11516&nx=on&gs=on&o=on&end=${new Date().toISOString().split('T')[0]}`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			const omerData = data.items.find(item => item.category === 'omer');
			if (omerData) {
				const { date, hdate, title } = omerData;
				const hebrewDate = hdate.split(' ')[0];	
				const count = omerData.omer.count;
				const sefira = omerData.omer.sefira;
				const numbers = omerData.title_orig.split(' ');
				const number = numbers[numbers.length - 1];
				updateTextContent('countNum', number);
				updateTextContent('hebrew', count.he);
				updateTextContent('english', count.en);
				updateTextContent('sefira', sefira.he);
				updateTextContent('date', date);
				console.log(`${count.en}`);
				console.log(`Sefira: ${sefira.en}`);
			} else {
				console.error('Omer data not found in response.');
			}
		})
		.catch(error => console.error('Error fetching Omer data:', error));
	}






getOmerDate();
