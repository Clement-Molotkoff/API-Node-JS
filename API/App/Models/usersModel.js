/**
 *  Project : API-NODE-JS 
 * 
 *  Date : May 05 2019
 *  Created by Clement Molotkoff 
 */

// UsersModel.js
const mongoose = require('mongoose');

// Setup schema
var usersSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        require: true,
    },

    token: {
        type: String,
        require: true,
        unique: true,
    },

    rank: {
        type: String,
        default: "member"
    },

    adress: String,
    
    gender: String,
    
    age: {type: Number, min: 18, max: 99},
    
    phone: String,
    
},{
    timestamps: true
});

// Export users model
var users = module.exports = mongoose.model('users', usersSchema);
module.exports.get = function (callback, limit) {
    users.find(callback).limit(limit);
}
