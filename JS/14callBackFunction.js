const myfunc= (callback)=>{
    console.log("i am calling")
    callback("mai confused ho gya bhai")
}
const myfunc2=(a)=>{
    console.log("inside callback function",a)
}
myfunc(myfunc2) 