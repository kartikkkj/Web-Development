const heading1 = document.querySelector(".one");
const heading2 = document.querySelector(".two");
const heading3 = document.querySelector(".three");
const heading4 = document.querySelector(".fur");
const heading5 = document.querySelector(".five");
const heading6 = document.querySelector(".six");
const heading7 = document.querySelector(".seven");


function changeText(element, text, color, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (element) {
        element.textContent = text;
        element.style.color = color;
        resolve();
      } else {
        reject(new Error("element not found"));
      }
    }, time);
  });
}

changeText(heading1,"one","violet",1000)
.then(()=>changeText(heading2,"two","violet",1000))
.then(()=> changeText(heading2,"two","violet",1000))
.then(()=>changeText(heading3,"three","violet",1000))
.then(()=>changeText(heading4,"four","violet",1000))
.then(()=>changeText(heading5,"five","violet",1000))
.then(()=>changeText(heading6,"six","violet",1000))
.then(()=>changeText(heading7,"seven","violet",1000))
.catch((error)=> console.log(error))
