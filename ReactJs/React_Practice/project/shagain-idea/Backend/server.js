require('dotenv').config({path: "./.env"})

const express = require("express")
const router = require('./routes')
const cors = require("cors")
const dbConnect = require("./database")
const cookieParser = require('cookie-parser')
const app = express();
const PORT = process.env.PORT || 5000
dbConnect()
app.use(cookieParser())
const corsOption={
    credentials: true,
    origin: ["http://localhost:3000"]
}
app.use(cors(corsOption))
app.use('/storage', express.static('storage'))
app.use(express.json({limit:"8mb"}));
app.use(router) 
app.get("/",(req,res)=>{
    res.send("hello")
})
 
app.listen(PORT)