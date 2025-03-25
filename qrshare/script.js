var input = document.getElementById("input")
qrIMG = document.getElementById("qr")
var imgSRC;
var data;
const image = qr;


function myFunction() {
    data = input.value;
    if (input.value <= 0){
        console.log("nope")
        qrIMG.src = "";
        
    }
    else {
        qrIMG.src = "";
        imgSRC = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + data + "&dots=rounded";
        qrIMG.src = imgSRC;
    }
    document.getElementById("download").style.display = "block";
}  

async function download() {
    try {
        const response = await fetch(qrIMG.src);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "qrcode.png";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Download failed:', error);
    }
}