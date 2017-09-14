'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
let UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: String

});

//export our module to use in server.js
module.exports = mongoose.model('User', UserSchema);