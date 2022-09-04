let count =0;
function work(){
    console.log("Network request ",count);
    count++;
}
function debounce(work, delay){// Debouncing
    let timerId
    return function optimizeFn(){
        clearTimeout(timerId)
        timerId = setTimeout(()=>{
            work()
        },delay)
    }
}
function throtling(work, delay){ // throtling
   let flag = true
    return function optfn(){
        if(flag){
                work()
                flag = false;
                setTimeout(()=>{
                    flag = true
                },delay)
        }
    }
}
let optFn= debounce(work,5000)
let optfn= throtling(work,5000)

const input = document.querySelector("input")
input.addEventListener("keydown", optFn)