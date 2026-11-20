/* ShabbosTime - client-side calendar and display logic */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const ZIP_KEY = "zipcode";
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const form = $("searchForm"), zipInput = $("zip"), dateInput = $("futureDate");
  const submit = $("submit"), status = $("status");
  let currentParsha = "";

  function savedZip(){try{return localStorage.getItem(ZIP_KEY)||""}catch(_){return ""}}
  function saveZip(value){try{localStorage.setItem(ZIP_KEY,value)}catch(_){/* storage may be disabled */}}
  function setStatus(message,isError=false){status.textContent=message;status.classList.toggle("error",isError)}
  function setLoading(loading){submit.disabled=loading;submit.querySelector(".button-label").textContent=loading?"Loading…":"Find Times"}
  function dateParts(value){
    if(!value) return null;
    const [y,m,d]=value.split("-").map(Number);
    return {year:y,month:m,day:d};
  }
  function formatEvent(item){
    if(!item)return "—";
    const d=new Date(item.date);
    return `${days[d.getDay()]} ${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}<br>${escapeHTML(item.title||"")}`;
  }
  function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function clearHoliday(){
    $("holidaySection").hidden=true;$("holidayTitle").textContent="";$("holidayDetails").replaceChildren();
  }
  function renderHoliday(items){
    clearHoliday();
    if(!items.length)return;
    const section=$("holidaySection"), details=$("holidayDetails");
    const unique=[...new Map(items.map(x=>[x.title,x])).values()];
    $("holidayTitle").textContent=unique.map(x=>x.title).join(" • ");
    unique.forEach(item=>{
      const row=document.createElement("p");row.className="holiday-detail";row.textContent=item.title;details.append(row);
      const related=allItemsForMemo(item.title);
      related.forEach(event=>{
        const p=document.createElement("p");p.className="holiday-time";p.textContent=event.title+" — "+new Date(event.date).toLocaleString(undefined,{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"});details.append(p);
      });
    });
    section.hidden=false;
  }
  let allItemsForWeek=[];
  function allItemsForMemo(title){return allItemsForWeek.filter(x=>x.memo===title && x.category!=="holiday")}
  function renderMenorah(items){
    const chanukah=items.find(x=>/chanukah/i.test(x.title||""));
    const section=$("menorahSection"),container=$("menorah-container");
    container.replaceChildren();
    if(!chanukah){section.hidden=true;return}
    const match=(chanukah.title||"").match(/(\d+)\s*(?:st|nd|rd|th)?\s*candle/i);
    const night=Math.max(1,Math.min(8,match?Number(match[1]):1));
    const stage=document.createElement("div");stage.className="menorah-stage";
    const img=document.createElement("img");img.src="noun-menorah-949.svg";img.alt="Chanukah menorah";img.loading="lazy";stage.append(img);
    const positions=[90,80,70,60,50,40,30,20];
    positions.forEach((left,index)=>{const candle=document.createElement("span");candle.className="menorah-candle"+(index<night?" lit":"");candle.style.left=left+"%";stage.append(candle)});
    container.append(stage);
    $("menorahCaption").textContent=night+" candle"+(night===1?"":"s")+" tonight";
    section.hidden=false;
  }
  function render(data){
    allItemsForWeek=data.items||[];
    $("header").textContent=[data.location?.city,data.location?.state].filter(Boolean).join(", ")||"Shabbos Times";
    const parshaItem=allItemsForWeek.find(x=>x.category==="parashat");
    currentParsha=parshaItem?.title||"";
    $("parsha").textContent=currentParsha||"No weekly Torah portion listed";
    $("gpt").disabled=!currentParsha;
    $("parshaSummary").hidden=true;$("parshaSummary").replaceChildren();
    $("candleLighting").innerHTML=formatEvent(allItemsForWeek.find(x=>x.category==="candles"));
    $("havdala").innerHTML=formatEvent(allItemsForWeek.find(x=>x.category==="havdalah"));
    renderHoliday(allItemsForWeek.filter(x=>x.category==="holiday"));
    renderMenorah(allItemsForWeek.filter(x=>x.category==="holiday"));
  }
  async function find(){
    const zip=zipInput.value.trim();
    if(!/^\d{5}$/.test(zip)){setStatus("Please enter a valid 5-digit ZIP code.",true);zipInput.focus();return}
    saveZip(zip);setLoading(true);setStatus("Looking up Shabbos times…");
    try{
      const params=new URLSearchParams({cfg:"json",zip,m:"50"});
      const selected=dateParts(dateInput.value);
      if(selected){params.set("gy",selected.year);params.set("gm",selected.month);params.set("gd",selected.day)}
      const response=await fetch("https://www.hebcal.com/shabbat/?"+params.toString());
      if(!response.ok)throw new Error("Hebcal returned HTTP "+response.status);
      const data=await response.json();
      if(!data?.items?.length)throw new Error("No Shabbos information was found for that ZIP code and date.");
      render(data);setStatus(selected?"Showing the Shabbos week for your selected date.":"Shabbos times updated.");
    }catch(error){console.error("ShabbosTime lookup failed:",error);setStatus(error.message||"Unable to load Shabbos times. Please try again.",true)}
    finally{setLoading(false)}
  }
  form.addEventListener("submit",event=>{event.preventDefault();find()});
  $("gpt").addEventListener("click",generateAI);
  async function generateAI(){
    const button=$("gpt"),output=$("parshaSummary");
    // Never embed a RapidAPI secret in a public GitHub Pages JavaScript file.
    const apiKey=window.SHABBOSTIME_RAPIDAPI_KEY;
    if(!apiKey){setStatus("Parsha summaries need a securely configured API key. The key cannot safely live in this public JavaScript file.",true);return}
    button.disabled=true;button.innerHTML='<i class="fas fa-spinner fa-spin"></i> Generating…';
    try{
      const response=await fetch("https://simple-chatgpt-api.p.rapidapi.com/ask",{method:"POST",headers:{"content-type":"application/json","X-RapidAPI-Key":apiKey,"X-RapidAPI-Host":"simple-chatgpt-api.p.rapidapi.com"},body:JSON.stringify({question:`Summarize the Torah portion ${currentParsha} into exactly five concise, accurate bullet points. Return only an HTML ul with five li elements.`})});
      if(!response.ok)throw new Error("Summary service returned HTTP "+response.status);
      const data=await response.json();
      const answer=data.answer||data.result||data.response||data.message;
      if(!answer)throw new Error("The summary service returned an unexpected response.");
      output.innerHTML=answer;output.hidden=false;setStatus("Parsha summary ready.");
    }catch(error){console.error("Parsha summary failed:",error);setStatus(error.message||"Unable to generate the Parsha summary.",true)}
    finally{button.disabled=!currentParsha;button.innerHTML='<i class="fa-regular fa-rectangle-list"></i> Summarize Parsha'}
  }
  const stored=savedZip();if(stored)zipInput.value=stored;
  if(stored)find();
})();
