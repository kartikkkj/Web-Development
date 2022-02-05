const express = require('express')
const path = require('path')
const app = express()
app.use(express.urlencoded({
    extended:true
}))
app.set('view engine', 'pug')
app.get('',(req,res)=>{
    res.render('home',{title:'Home page'})
})
app.post('/form_submit',(req,res)=>{
    const username = req.body.username;
    const email   = req.body.email;
    res.end(username+email) 
})





// session  
const session = require("express-session")
app.use(session({
    secret:"20105111908",
    resave:true,
    saveUninitialized:true
}))
app.get('/s',(req,res)=>{
    req.session.name="John"//name
    return res.send('session')
})
app.get('/session',(req,res)=>{
    let name=req.session.name//using name
    return res.send(name)
})
app.get('/destroy',(req,res)=>{
    req.session.destroy((err)=>{
        console.log("destroyed")
    })
    return res.send('destroyed')
})


//cookies
const cookies = require("cookie-parser")
const mydata ={
    name:"Abhishek",
    age: 21
}
app.use(cookies())
app.get('/setUser',(req,res)=>{
    res.cookie("myCookie",mydata)
    res.send("added")
})
app.get('/getUser',(req,res)=>{
    res.send(req.cookies)
})
app.get('/logOut',(req,res)=>{
    res.clearCookie('myCookie')
    res.end()
})



//core Middleware


// core Routing


//API


// core views


// DataBase Integration


app.listen(process.env.PORT||3000)