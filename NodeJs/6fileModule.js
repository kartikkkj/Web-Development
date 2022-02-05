const fs = require("fs") // file system module 

fs.readFile('test.txt','utf-8',(err,data)=>{
    if(err){
       throw err; 
    }
    console.log(data)
});




const data=fs.readFileSync('test.txt',{
    encoding:'utf-8',
    flag:'r'
})
console.log(data);



fs.stat('test.txt',(err,stats)=>{ // to check the status of the file
    if(err){
        console.log(err)
        return
    }
    else{
        console.log(stats.isFile())
        console.log(stats.isDirectory())
        console.log(stats.isSymbolicLink())
        console.log(stats.size)
    }
})


// write in a file
const content = [{
    type:"node App"
}]
fs.writeFileSync('test.json',JSON.stringify(content))

const content1="hello hiiiiii"
fs.writeFile('test.txt',content1,{
    flag:'a+'
},(err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log("successfull")
})




//unlink
fs.unlink('test.txt',(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log("file removed")
})

fs.unlinkSync('test.json')


