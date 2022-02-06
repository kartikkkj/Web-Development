 const mongoose = require('mongoose')
 let schema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:String,
    status:String
 })
 const userDB = mongoose.model('userDB',schema)
 module.exports = userDB