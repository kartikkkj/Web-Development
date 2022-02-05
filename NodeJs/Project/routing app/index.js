const bodyParser = require("body-parser");
const express = require("express")
const route = require("./router")
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use('/api',route)
app.get('',(req,res)=>{
    res.end("hello")
})

app.listen(3000)