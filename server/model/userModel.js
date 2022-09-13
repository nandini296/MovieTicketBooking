const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now
    },
    city:{
        type : String,
        require: true
    },
    state:{
        type : String,
        require: true
    },
    SeatsSelected:{
        type: String,
        default:0
        
    }
})

module.exports = mongoose.model("movieTicket",userSchema);