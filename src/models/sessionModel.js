const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    sessionID:
    {
        type: String,
        required: true,
        unique: true
    },
    sessionPassword:
    {
        type: String,
        required: true,
    },
    senderName:{
        type:String
    },
    macNo:
    {
        type: String,
        required: true,
    },
    CameraUrl: {
        type: String,
        default:"",
    },
    createdTime:
    {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('tbl_sessions', sessionSchema)