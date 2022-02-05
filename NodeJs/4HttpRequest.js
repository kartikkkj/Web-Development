const http = require("http")

const url= 'http://api.open-notify.org/astros.json'
// to request 
http.get(url,(res)=>{
    let data=''
    res.on('data',(chunk)=>{
        data+=chunk
    });
    res.on('end',()=>{
        data=JSON.parse(data)
        console.log(data);
    });
})