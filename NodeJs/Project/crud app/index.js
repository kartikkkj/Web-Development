const express = require("express")
const dotenv = require('dotenv')
const morgan = require("morgan")
dotenv.config({path:"config.env"})
const app = express()

const PORT = process.env.PORT ||8080
app.get('',(req,res)=>{
    res.send("crud app")
})

app.listen(PORT)