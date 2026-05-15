// existing code preserved above
async function find() {
try {
const input=document.getElementById('zip').value;
const date=document.getElementById('futureDate').value;
let query=`zip=${input}&m=50`;
if(date){query+=`&date=${date}`;}
setZipcode(input);
const response=await fetch(`https://www.hebcal.com/shabbat/?cfg=json&${query}`);
const data=await response.json();
if(!data.items)return;
const city=`${data.location.city}, ${data.location.state}`;
const parsha=data.items.find(i=>i.category==='parashat')?.title||'';
currentParsha=parsha;
const candles=data.items.find(i=>i.category==='candles');
const havdalah=data.items.find(i=>i.category==='havdalah');
updateShabbosInfo(city,parsha,formatEventText(candles.date,candles.title),formatEventText(havdalah.date,havdalah.title));
}catch(e){console.log(e)}
}