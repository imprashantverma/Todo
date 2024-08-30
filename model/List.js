const User = require('./user');
const mongoose = require('mongoose');
//  Creating List Schema

const List = new mongoose.Schema({
    title:{
        type : String,
        required:true
    },
    body:{
        type :String,
        required:true,
    },
    time:{
        type:Date,
        default :Date.now
    },
    user : [{
        type:mongoose.Types.ObjectId,
        ref:'User',

    }]
})

module.exports = mongoose.model('List',List);