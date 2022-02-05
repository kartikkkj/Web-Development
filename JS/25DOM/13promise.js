//promise status pending, reject or fullfill

// const bucket = ["coffee", "chip", "salt", "rice", "vegetable"];

// producing a promise
// const friedRicePromise = new Promise((resolve, reject) => {
//   if (
//     bucket.includes("vegetable") &&
//     bucket.includes("salt") &&
//     bucket.includes("rice")
//   ) {
//     console.log("ready");
//     resolve("fried rice");
//   } else {
//     console.log("can't do");
//     reject("can't do");
//   }
// });
// // consuming a promise
// friedRicePromise.then(
//   (ifResolved) => {
//     console.log("resolved", ifResolved);
//   },
//   (ifReject) => {
//     console.log("rejected", ifReject);
//   }
// ).catch((ifReject)=>{
//     console.log("rejected",ifReject)
// });







// function rice() {
//   const bucket = ["coffee", "chip", "salt", "rice", "vegetable"];
//   return  new Promise((resolve, reject) => {
//     if (
//       bucket.includes("vegetable") &&
//       bucket.includes("salt") &&
//       bucket.includes("rice")
//     ) {
//       console.log("ready");
//       resolve("fried rice");
//     } else {
//       console.log("can't do");
//       reject("can't do");
//     }
//   });
// }

// rice().then(
//   (ifResolved) => {
//     console.log("resolved", ifResolved);
//   },
//   (ifReject) => {
//     console.log("rejected", ifReject);
//   }
// ).catch((ifReject)=>{
//     console.log("rejected",ifReject)
// });





// function rice1() {
//   const bucket = ["coffee", "chip", "salt", "rice", "vegetable"];
//   return  new Promise((resolve, reject) => {
//     setTimeout(()=>{
//       if (
//         bucket.includes("vegetable") &&
//         bucket.includes("salt") &&
//         bucket.includes("rice")
//       ) {
//         console.log("ready");
//         resolve("fried rice");
//       } else {
//         console.log("can't do");
//         reject("can't do");
//       }
//     },2000)
//   })
// }

// rice1().then(
//   (ifResolved) => {
//     console.log("resolved", ifResolved);
//   },
//   (ifReject) => {
//     console.log("rejected", ifReject);
//   }
// ).catch((ifReject)=>{
//     console.log("rejected",ifReject)
// });






// then() it always return a promise
// promise.resolve()
// priomise chaining
Promise.resolve(5).then((res)=>{ console.log("hello",res); return res+1}).then((res2)=>{console.log(res2)})