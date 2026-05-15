var inputField=document.getElementById('zip');

function changeColor(){
const savedZip=localStorage.getItem('zipcode');
if(savedZip){
document.getElementById('zip').value=savedZip;
find();
}
}

async function find() {
try {
const input=document.getElementById('zip').value;
const selectedDate=document.getElementById('futureDate').value;

localStorage.setItem('zipcode',input);

let query=`zip=${input}&cfg=json&m=50`;

if(selectedDate){
 const d=new Date(selectedDate);
 const year=d.getFullYear();
 const month=d.getMonth()+1;
 const day=d.getDate();
 query += `&gy=${year}&gm=${month}&gd=${day}`;
}

const response=await fetch(`https://www.hebcal.com/shabbat/?${query}`);
const data=await response.json();

if(!data || !data.items || data.items.length===0) return;

const city=`${data.location.city}, ${data.location.state}`;
document.getElementById('header').innerHTML=city;

const parshaItem=data.items.find(i=>i.category==='parashat');
const parsha=parshaItem ? parshaItem.title : 'No weekly Torah portion';

document.getElementById('parsha').innerHTML=parsha;

const candles=data.items.find(i=>i.category==='candles');
const havdalah=data.items.find(i=>i.category==='havdalah');

if(candles){
document.getElementById('candleLighting').innerHTML=candles.title;
}

if(havdalah){
document.getElementById('havdala').innerHTML=havdalah.title;
}

}catch(e){console.log(e)}
}

inputField.addEventListener('keyup',function(event){
if(event.keyCode===13){
event.preventDefault();
document.getElementById('submit').click();
}
});