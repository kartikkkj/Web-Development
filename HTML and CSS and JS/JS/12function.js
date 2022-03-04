function functionName(){
    console.log("hiiii why calling me")
    return "chutiya"
}

functionName()
const youAre= functionName()
console.log("tu sach me", youAre)
console.log(functionName())



function sum(t,r){
    return t+r
}
console.log(sum(4,6)) 


// Function expresion
const multiple= function(r, t){ // this is also known as annonymus function
    return r*t
}
console.log(multiple(4,6))




// Arrow functions
const division= (r, t)=>{ 
    return (r/t)
}
console.log(division(4,5))

const singleParameter = number =>{
    return number%2===0;
}
console.log(singleParameter(57))

const singleLineArrowFunction= number=> number/4
console.log(singleLineArrowFunction(5))


// IIFE-- Immediatly Invoke Function expretion (~,!,+,-,void)
!function fn() {
    console.log("hello")
}();
  
 


//hoisting
hello()
function hello(){
    console.log("hello birather")
}
// calling a function before declaration 
//hoisting is happen only with fuction declaration not with fuction expresion or arrow fuction








// function inside function and laxical scope
const app= ()=>{
    const inside= ()=> "Abhishek"
    const inside2=()=> "Kumar"
    // this function called only in outer function
    console.log(inside())
    console.log(inside2())
    
}  
app()



//default parameter
const myfunc=(a=0,b=5)=>a*b
console.log(myfunc(5));

//varArg(rest parameter as array)
const myfunc1=(a,b,...varArg)=>a*b// 
console.log(myfunc(5,6,4,8,4,9)); 