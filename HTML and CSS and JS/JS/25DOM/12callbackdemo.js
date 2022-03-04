console.log("helo");
const heading1 = document.querySelector(".one");
const heading2 = document.querySelector(".two");
const heading3 = document.querySelector(".three");
const heading4 = document.querySelector(".four");
const heading5 = document.querySelector(".five");
const heading6 = document.querySelector(".six");
const heading7 = document.querySelector(".seven");

// callback hell ---> nested callback;
// setTimeout(() => {
//   heading1.textContent = "hello heading1";
//   heading1.style.color = "violet";
//   setTimeout(() => {
//     heading2.textContent = "hello heading2";
//     heading2.style.color = "green"; 
//     setTimeout(() => {
//       heading3.textContent = "hello heading3";
//       heading3.style.color = "red";
//       setTimeout(() => {
//         heading4.textContent = "hello heading4";
//         heading4.style.color = "yellow";
//         setTimeout(() => {
//           heading5.textContent = "hello heading5";
//           heading5.style.color = "pink";
//           setTimeout(() => {
//             heading6.textContent = "hello heading6";
//             heading6.style.color = "blue";
//             setTimeout(() => {
//               heading7.textContent = "hello heading7";
//               heading7.style.color = "gray";
//             }, 1000);
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);




//// callback hell ---> pyramid of DOM
function changeText(element, text, color, time, onSuccessCallBack, onfailure) {
  setTimeout(() => {
    if (element) {
      element.textContent = text;
      element.style.color = color;
      if (onSuccessCallBack){
           onSuccessCallBack()
        }
    } else {
        onfailure()
    }
  }, time);
}

changeText(heading1, "heading 1", "violet", 1000, () => {
  changeText(heading2, "heading 2", "green", 1000, () => {
    changeText(heading3, "heading 3", "red", 1000, () => {
      changeText(heading4, "heading 4", "yellow", 1000, () => {
        changeText(heading5, "heading 5", "pink", 1000, () => {
          changeText(heading6, "heading 6", "blue", 1000, () => {
            changeText(heading7, "heading 7", "grey", 1000, () => {

            },()=>{console.log("heading1 does't exist")});
          },()=>{console.log("heading2 does't exist")});
        },()=>{console.log("heading3 does't exist")});
      },()=>{console.log("heading4 does't exist")});
    },()=>{console.log("heading5 does't exist")});
  },()=>{console.log("heading6 does't exist")});
},()=>{console.log("heading7 does't exist")});
