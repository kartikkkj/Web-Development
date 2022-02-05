const express = require('express')
const app = express()

app.set('view engine','pug' )
// app.set('view', 'views') // to change the folder of views 
app.get('',(req,res)=>{
    res.render('home',{p:"helo"})
}).listen(3000)