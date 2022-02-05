const express = require('express')
const app = express();

const myLog = (req,res,next)=>{
    console.log('LOGGED')
    next()
}
const date1 = (req,res,next)=>{
    req.reqTime= Date.now()
    next()
}

app.use(myLog)
app.use(date1)
app.get('',(req,res)=>{
    res.send(""+req.reqTime)
})

// static file in express
const path = require('path')
const publicPath=path.resolve(__dirname)
app.use(express.static(publicPath)) //express.static() in-build middleware fuction
//also as app.use('WEB DEV',express.static(Nodejs))
const val = '<img src="img,jpg"></img>'
app.get('/static',(req,res)=>{
    res.send(val)
})
app.listen(3000)





