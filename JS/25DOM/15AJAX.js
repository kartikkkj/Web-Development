// AJAX = Asynchronous javaScript and XML
// HTTP = Hyper text transfer protocol
// REST = represantational state transfer
// API = Application programming interface
// JSON = javaScript object Notation



const url = "https://jsonplaceholder.typicode.com/posts"

const xhr = new XMLHttpRequest()
console.log(xhr.readyState)
xhr.open("GET", url)
xhr.onreadystatechange = function(){
    console.log(xhr)
   const resp=xhr.response
   const data = JSON.parse(resp)
   console.log(data)
}

xhr.send()



// using promise
function sendReq(method,url){
    return new Promise((resolve,reject))
    const xhr=new XMLHttpRequest();
    xhr.open(method,url)
    xhr.onload= function(){
        if(xhr.status>=200 && xhr.status<300){
            resolve(xhr.response);
        }
        else reject(new Error("something Went wrong"))
    }
    xhr.onerror=()=>{
        reject(new Error("something went wrong"))
    }
}

sendReq("get",url).then((response)=>{
    return JSON.parse(response)
}).then((data)=>{
    for(let user of data){
        return user.id
    }
}).then((id)=>{
    const url = `${url}/`+id
    return sendReq("get",url)
}).then((newReq)=>{
    console.log(JSON.parse(newReq))
}).catch((error)=>{
    console.log(error)
})