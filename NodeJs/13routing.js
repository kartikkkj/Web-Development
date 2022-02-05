const express = require('express')
const app = express()
const port = 3000;
const data = {
    name : "Abhi",
    age: 21
}

app.get('',(req,res)=>{
    // res.send(data) 
    // res.json(data)
    res.sendFile(__dirname+'/11express.js')
})
app.get('/about',(req,res)=>{
    res.send('about')
})
app.get('/contact',(req,res)=>{
    res.send('contact')
})
app.listen(port)