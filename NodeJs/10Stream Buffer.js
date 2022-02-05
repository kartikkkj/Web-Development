//it efficently use of memory and time
//stream
const http= require('http')
const fs = require('fs')

http.createServer((req,res)=>{
    const stream= fs.createReadStream('test.json')
    stream.pipe(res)
}).listen(5000)



// buffer
const buf= Buffer.from("Hey")
console.log(buf.toString())
console.log(buf[0])
console.log(buf[1])
console.log(buf[2])
buf[2]=111;
console.log(buf.toString())

const buff= Buffer.alloc(4)
buff.write("hey")