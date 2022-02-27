const video = document.querySelector("video");
const recordBtnCont = document.querySelector(".record-btn-cont");
const captureBtnCont = document.querySelector(".capture-btn-cont");
const recordBtn = document.querySelector(".record-btn");
const captureBtn = document.querySelector(".capture-btn");
let trasparentColor = "transparent"
let recordFlag = false;

let recorder;
let chucks = [];
const constraints = {
  video: true,
  audio: false,
};

// navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//   video.srcObject = stream;
//   recorder = new MediaRecorder(stream);
//   recorder.addEventListener("start", (e) => {
//     chucks = [];
//   });
//   recorder.addEventListener("dataavailable", (e) => {
//     chucks.push(e.data);
//   });

//   recorder.addEventListener("stop", (e) => {
//     let blob = new Blob(chucks, { type: "video/mp4" });
//     let videoURL = URL.createObjectURL(blob);
//     let a = document.createElement("a");
//     a.href = videoURL;
//     a.download = "stream.mp4";
//     a.click();
//   });
// });

recordBtnCont.addEventListener("click", (e) => {
  if (!recorder) {
    return;
  }
  recordFlag = !recordFlag;
  if (recordFlag) {
      recordBtn.classList.add("scale-record");
    recorder.start();
    startTimer()
  } else {
      recordBtn.classList.remove("scale-record");
    recorder.stop();
    stopTimer()
  }
});
captureBtnCont.addEventListener("click", (e) => {
  let canvas = document.createElement("canvas")
  canvas.height = video.videoHeight
  canvas.width = video.videoWidth
  let tool = canvas.getContext("2d")
  tool.drawImage(video,0,0,canvas.width, canvas.height)
  tool.fillStyle = trasparentColor 
  tool.fillRect(0,0,canvas.width, canvas.height)
  let imageURL = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = imageURL;
    a.download = "image.jpg";
    a.click();
});

let timerID;
let counter = 0;
let timer = document.querySelector(".timer");
function startTimer() {
    timer.style.display = "block"
  function displayTimer() {
    let totalSeconds = counter;
    let hour = Number.parseInt(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Number.parseInt(totalSeconds / 60);
    totalSeconds %= 60;
    let seconds = totalSeconds;
    hour = hour < 10 ? `0${hour}` : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    timer.innerText = `${hour}:${minutes}:${seconds}`;
    counter++;
  }
  timerID = setInterval(displayTimer, 1000);
}
function stopTimer() {
    counter =0
  timer.style.display = "none"
  clearInterval(timerID);
  timer.innerText = "00:00:00";
}
let filterLayer = document.querySelector(".filter-layer")
let allfilter = document.querySelectorAll(".filter")
allfilter.forEach(filterElem=>{
    filterElem.addEventListener("click", (e)=>{
        trasparentColor = getComputedStyle(filterElem).getPropertyValue('background-color')
         filterLayer.style.backgroundColor = trasparentColor
    })
})