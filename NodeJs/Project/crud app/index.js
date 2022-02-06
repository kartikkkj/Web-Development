// All required modules
const express = require("express")
const dotenv = require('dotenv')
const morgan = require("morgan")
const bodyParser = require('body-parser')
const path = require("path")
    
const app = express()
            
// Port setup
dotenv.config({path:"config.env"})
const PORT = process.env.PORT ||8080 
   
// All midlewares
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))
  
      
//view engine 
app.set('view engine', 'ejs')
// app.set('views',path.resolve(__dirname,'views'))
 
app.get('',(req,res)=>{
    res.render('index',{ title: "Crud"})
})
app.get('/add-user',(req,res)=>{
    res.render('add-user',{ title: "Crud"})
})
app.get('/update-user',(req,res)=>{
    res.render('update-user',{ title: "Crud"})
})
//    

app.listen(PORT)   