const http = require("https")

const methodObj={
    hostname:"reqres.in",
    path:"/api/users",
    method:"POST", 
    header:{
        "content-Type":"Application/json"
    }}
const body =JSON.stringify({
    name:"Abhishek kumar",
    age:21
})
// to post 
// const req=http.request(methodObj,(res)=>{
//     let data=''
//     console.log(res.statusCode)
//     res.on('data',(chunk)=>{
//         data+=chunk
//     });
//     res.on('end',()=>{
        
//         console.log(JSON.parse(data));
//     });
// })
// req.write(body)
// req.end()



//using axios library
const axios = require('axios')
const url='http://reqres.in/api/users'

axios.post(url,body).then((res)=>{
    console.log(res.data)
    console.log(res.status)
}).catch((err)=>{
    console.log(err);
})
