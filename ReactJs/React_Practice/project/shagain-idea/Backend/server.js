require('dotenv').config()
const express = require("express")
const router = require('./routes')
const dbConnect = require("./database")
const app = express();
const PORT = process.env.PORT || 5000
dbConnect()
app.use(express.json());
app.use(router)
app.get("/",(req,res)=>{
    res.send("hello")
})
 
app.listen(PORT)