const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()


app.use((req,res,next)=>{
    next()
})
app.use((req,res,next)=>{
    const filepath = path.join(__dirname,"static",req.url)
    fs.stat(filepath,(err,fileInfo)=>{
        if(err){
            next()
            return
        }
        if(fileInfo.isFile()){
            res.sendFile(filepath)
        }else{
            next()
        }
    })
})

app.use((req,res,next)=>{
    res.status(404)
    res.send("File Note Found")
    next()
})
app.get('*',(req,res)=>{
    res.send("hello")
})

app.listen(3000)