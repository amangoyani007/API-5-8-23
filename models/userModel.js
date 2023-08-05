const { strict } = require('assert');
const mongoose = require('mongoose');
const { stringify } = require('querystring');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add the user name"],
    },
    email:{
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"]
    },
    password:{
        type: String,
        // required: [true, "Please add the user Password"],
    },
},{
    timestemp: true,
});

module.exports = mongoose.model("User", userSchema);
