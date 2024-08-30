const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//  Creating User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    list:[{
        type :mongoose.Types.ObjectId,
        ref:'List',
    }],
    fav:[{
        type:mongoose.Types.ObjectId,
        ref:'List'
        }]
});

module.exports = mongoose.model('User', userSchema);



