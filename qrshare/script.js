var input = document.getElementById("input")
qrIMG = document.getElementById("qr")
var imgSRC;
var data;
var sharebtn = document.getElementById("share");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = qr;


function myFunction() {
    data = input.value;
    if (input.value <= 0){
        console.log("nope")
        qrIMG.src = "";
        
    }
    else {
        qrIMG.src = "";
        imgSRC = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + data;
        qrIMG.src = imgSRC;
        draw();
    }

}  

function draw() {
    ctx.drawImage(image, 1, 1);
    };


/*
async function shareCanvas() {
const canvasElement = document.getElementById('canvas');
const dataUrl = canvasElement.toDataURL();
const blob = await (await fetch(dataUrl)).blob();
const filesArray = [
new File(
  [blob],
  'animation.png',
  {
    type: blob.type,
    lastModified: new Date().getTime()
  }
)
];
const shareData = {
files: filesArray,
};
navigator.share(shareData);
}



const capture = async () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const video = document.createElement("video");
    
    try {
        const captureStream = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = captureStream;
        context.drawImage(video, 0, 0, window.width, window.height);
        const frame = canvas.toDataURL("image/png");
        captureStream.getTracks().forEach(track => track.stop());
        window.location.href = frame;
    } catch (err) {
        console.error("Error: " + err);
    }
};

capture();


async function onShare() {
    
    const response = await fetch('nacho.jpg');
    const blob = await response.blob();
    const filesArray: File[] = [new File([blob], 'meme.jpg', { type: "image/jpeg", lastModified: new Date().getTime() })];
    const shareData = {
        files: filesArray,
    };
    navigator.share(shareData as any).then(() => {
        console.log('Shared successfully');
    })
}
*/