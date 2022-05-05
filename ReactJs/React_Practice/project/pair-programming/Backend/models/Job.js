const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    lang:{
        type: String,
        required:true,
        enum:["cpp", 'py', 'java', 'js'],
    },
    filePath:{
        type: String, 
        required: true,
    },
    submittedAt :{
        type: Date,
        default:Date.now,
    },
    startedAt:{
        type: Date
    },
    completedAt:{
        type: Date,
    },
    input: {
        type : String,
    },
    output:{
        type: String,
    },
    status:{
        type: String,
        default: "Pending",
        enum: ['Pending', "Success", "Error"],
    }
})

const Job = new mongoose.model("job", jobSchema)

module.exports  = Job;