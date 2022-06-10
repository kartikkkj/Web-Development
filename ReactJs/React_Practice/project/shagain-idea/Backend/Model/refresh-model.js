const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refreshSchema = new Schema(
  {
    token: { type: String, required: true },
    userId: {type : Schema.Types.ObjectId, ref:"User"},
    // password:{type:String, required:true},
  },
  {
    timeStamp: true,
  }
);
  
module.exports = mongoose.model("Refresh", refreshSchema, "tokens");
