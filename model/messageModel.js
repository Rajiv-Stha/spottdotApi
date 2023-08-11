const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat"
    },
    text:String,
    sender:{},


},{timestamps:true})

module.exports = messageSchema ;