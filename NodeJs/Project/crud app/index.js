// All required modules
const express = require("express")
const dotenv = require('dotenv')
const morgan = require("morgan")
const bodyParser = require('body-parser')
const path = require("path")
const connectDB = require('./server/database/connection')

const app = express()
              
// Port setup 
dotenv.config({path:"config.env"})
const PORT = process.env.PORT || 8080 
   
// All midlewares
app.use(morgan('tiny'))

//mongoDB connection
connectDB()

app.use(bodyParser.urlencoded({extended:true}))

//view engine 
app.set('view engine', 'ejs')
// app.set('views',path.resolve(__dirname,'views'))


app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

app.use('/',require('./server/routes/router'))
      

app.listen(PORT)   