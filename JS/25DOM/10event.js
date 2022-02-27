// event 
//1st method inside html

const { loadavg } = require("os")
const { compile } = require("proxy-addr")



//2nd method
const btn = document.querySelector(".btn-headline")
btn.onclick= function() {
    console.log("you are clicked me")
}
 
//3rd method
btn.addEventListener("click",function(){console.log("clicked 3rd method")})



// const allBtn= document.querySelector("button")//for multiple btn
// for (const button of allBtn) {
//     button.addEventListener("click", function(){
//         console.log(this.textContent)
//     })
// }

//using arrow function
const allBtn= document.querySelectorAll("button")//for multiple btn
for (const button of allBtn) {
    button.addEventListener("click", (e)=>{
        console.log(e.currentTarget.textContent)
    })
}


//event loop demonstration

const allBtn1= document.querySelectorAll("button")
console.log("event Start")
for (const btn of allBtn1) {
    btn.addEventListener("click",(e)=>{
        num=0;
        for (let i = 0; i <= 100000000; i++) {
            num+=i;
        }
        console.log(e.currentTarget.textContent +" "+ num)
    })
}
let outer=0; 
for (let i = 0; i <= 1000000000; i++) {
    outer+=i;
}
console.log(outer)
console.log("event end")





//example
const allBtn2= document.querySelectorAll("button")//for multiple btn
for (const button of allBtn2) {
    button.addEventListener("click", (e)=>{
        e.currentTarget.style.color="red"
        e.currentTarget.style.background="black"

    })   
}







//keypress event
const body= document.body;
body.addEventListener("keypress", (e)=>{
    console.log(e.key)
})


//mouseover event
const body1= document.querySelector("button");
body1.addEventListener("mouseover", ()=>{
    console.log("hello")
})

//mouseleave









//event bubbling or event propagation  if child and parent has event if you click on child then child event is called first then parent's event is also called
let body= document.body;
let gp= document.querySelector(".gp")
let p= document.querySelector(".p")
let c= document.querySelector(".c")
body.addEventListener("click", ()=>{
    console.log("body bubbling")
})
gp.addEventListener("click", ()=>{
    console.log("gp bubbling")
})
p.addEventListener("click", ()=>{
    console.log("p bubbling")
})
c.addEventListener("click", ()=>{
    console.log("c bubbling")
})






//event capturing
// if child and parent has event if you click on child then parent event is called first then child's event is also called
body.addEventListener("click", ()=>{
    console.log("body capturing")
},true)
gp.addEventListener("click", ()=>{
    console.log("gp capturing")
},true)
p.addEventListener("click", ()=>{
    console.log("p capturing")
},true)
c.addEventListener("click", ()=>{
    console.log("c capturing")
},true)

//event delegation
body.addEventListener("click", (e)=>{
    console.log(e.target)
}) 

// Important events
        // click
        // focus
        // blur
        // keydown/keyup
        // mousemove
        // mousedown/mouseup
        // DOMCotentLoaded
        // load
        // unload - BeforeUnload
        //        - afterunload
        // readystate - loading
        //            - intreactive
        //            -complete