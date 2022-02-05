const express  = require("express")
const morgan = require("morgan")
const {v4:uuid} = require("uuid")
const fs = require('fs')
const path = require('path')
const app = express()


morgan.token('id',(req)=>{/// to create new morgan token
    return req.id
})
app.use(assignid)

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flag:'a'})


app.use(morgan(':id :method :status :url "HTTP/:http-version"'))
app.use(morgan(':id :method :status :url "HTTP/:http-version"',{stream:accessLogStream}))

app.get("", (req,res)=>{
    res.send("helllo")
})


function assignid(req,res,next){
    req.id=uuid()
    next()
}
app.listen(3000)