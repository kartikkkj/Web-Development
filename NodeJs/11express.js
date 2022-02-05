//install express

const express = require ('express')
const app = express()

app.get('',(req,res)=>{
    res.send("hello")
})
app.get('*',(req,res)=>{//404 page
    res.send("something wrong")
})
app.get('/about',(req,res)=>{
    res.send("about")
})
app.listen(3000)