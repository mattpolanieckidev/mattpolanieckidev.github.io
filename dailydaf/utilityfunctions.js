
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("sw.js").then(function(registration) {
      // Registration was successful
      console.log("ServiceWorker registration successful with scope: ", registration.scope);
    }, function(err) {
      // registration failed :(
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}

//set slider value on mobile
const myFunction = x => {
    const fontValue = x.matches ? "1" : "2";
    adjustFont(fontValue);
  }
  
  var x = window.matchMedia("(orientation:portrait)")
  myFunction(x)
  x.addListener(myFunction)
  
  //adjust font size based on slider value
  function adjustFont(a){
    for (i = 0; i < textContent.length; i++) {
      if (a === "1"){
        slider.value="1";
        localStorage.setItem("size", "1");
        textContent.item(i).style.fontSize="18px";
      }
      else if (a === "2"){
        slider.value="2";
        localStorage.setItem("size", "2");
        textContent.item(i).style.fontSize="24px";
      }
      else if (a === "3"){
        localStorage.setItem("size", "3");
        textContent.item(i).style.fontSize="32px";
      }
      }
    };
  
  //progress bar for full daf cycle
  const startDate = new Date("1/5/2020");
  const endDate = new Date("6/7/2027");
  const today = new Date();
  const daysElapsed = Math.floor((today - startDate) / (1000 * 3600 * 24));
  const totalDays = Math.floor((endDate - startDate) / (1000 * 3600 * 24));
  const progressNum = ((daysElapsed / totalDays) * 100).toFixed(2);
  const progress = document.getElementById("progress");
  progress.style.width = `${progressNum}%`;
  progress.innerHTML = `Siyum HaShas ${progressNum}%`;
  
  //find a daf
  const getPage = () => {
    const masechtaName = document.getElementById("masechta").value;
    const dafNum = document.getElementById("pageSelect").value;
    
    fetch(`https://www.sefaria.org/api/texts/${masechtaName}.${dafNum}`)
      .then(response => response.json())
      .then(pull => {
        document.getElementById("content").textContent = "";
        enPasuk = pull.text;
        hePasuk = pull.he;
        createDiv();
        heading.innerHTML = pull.ref;
        writePasuk();
        document.getElementById("prev").innerHTML = pull.prev;
        document.getElementById("next").innerHTML = pull.next;
        next = pull.next;
        prev = pull.prev;
      })
  }
  
  
  async function generateAI() {
    const url = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
    const button = document.querySelector('.gpt'); // Select the button element
  
    // Set the button to a loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '057428540fmsh5cec038c682e999p1c88eajsn3ad697cf50d4',
        'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com',
      },
      body: JSON.stringify({
        question: 'Summarize this text into 5 bullet points:' + enPasuk[0], // Modify this to use the desired question
      }),
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const result = await response.json();
  
      // Check if the response structure matches the expected format
      if (result.answer) {
        const generatedText = result.answer;
        document.getElementById('summary').innerText = generatedText;
        button.innerHTML = 'Generate AI Summary'
      } else {
        console.error('Response structure is not as expected.');
      }
    } catch (error) {
      console.error(error);
      button.classList.remove('loading-button');
    } 
  }
  