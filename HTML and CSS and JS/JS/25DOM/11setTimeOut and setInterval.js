// starting the AsyncPrograming

// setTimeOut
console.log("start")
function printHello(){
 console.log("hello you are inside setTime out function 1")
}
console.log("end")
const id1= setTimeout(printHello,1000) //first parameter is callBack function second argument is minimum time in micro-section to execute and it execute only once// setTimeOut return a id



console.log("start2")
const id2 = setTimeout(()=>{ // setTimeOut return a id
    console.log("hello you are inside setTime out function 2")
},1000) 

for(let i= 0; i<100; i++){
    console.log(">>>>>")
}
console.log(id1, id2) 
clearTimeout(id1)// this will clear the function from event queue and function will not execute
console.log("end2")






// setInterval
// this is also return id
console.log("start")
setInterval(()=>{//first parameter is callBack function second argument is minimum time in micro-section to execute and it execute once in given time // setTimeOut return a id
    console.log(Math.random())
},1000)
// clearInterval(id2) // this will clear the function from event queue and function will not execute
console.log("end")