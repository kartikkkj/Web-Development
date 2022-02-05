const http = require("http")

const hostname = '127.0.0.1'
const port = 3000;

//for give response

// const server = http.createServer((req,res)=>{
//     res.statusCode=200;
//     res.setHeader('Content-Type','text/plain');
//     res.end('welcome to HTTP server')
// })
// server.listen(port,hostname,()=>{
// console.log(`server running on the http://${hostname}:${port}/`)
// })

//OR

// http.createServer((req,res)=>{
//     res.statusCode=200;
//     res.setHeader('Content-Type','text/plain');
//     res.end('welcome to HTTP server')
// }).listen(port,hostname,()=>{
// console.log(`server running on the http://${hostname}:${port}/`)
// })

// OR

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.write('welcome to HTTP server')
    res.end()
}).listen(port,hostname,()=>{
console.log(`server running on the http://${hostname}:${port}`)
})

