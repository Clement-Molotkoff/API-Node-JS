/**
 *  Project : API-NODE-JS 
 * 
 *  Date : May 05 2019
 *  Created by Clement Molotkoff 
 */

// usersController.js

// Import users model
const users = require('../Models/usersModel');

// Import messages and errors message : 
const message = require('../assets/message.json');

// Return index actions
exports.index = function (req, res, next) {
    users.get(function (err, users) {
        if (err) {
            return res.status(500).json({
                error: err,
            });
        }
        return res.status(200).json({
            message: message.users.retrivied,
            data: users
        });
    });
};


// Return VIEW users info
exports.viewbyId = function (req, res, next) {
    users.findById(req.params.users_id, function (err, users) {
        if (err) {
            res.status(500).send(err);
        } 
        if (users != null) {
            res.status(200).json({
                message: message.users.loading,
                data: users
            });
        } else {
            res.status(500).json({
                message: message.error.null
            }); 
        }
    });
};

// Return VIEW users info with email on URI
exports.viewbyemail = function (req, res, next) {
    users.findOne({email:req.params.users_email}, function (err, users) {
        if (err) {
            res.status(500).send(err);
        } 
        if (users != null) {
            res.status(200).json({
                message: message.users.loading,
                data: users
            });
        } else {
            res.status(500).json({
                message: message.error.null
            });
        }
    });
};

// Handle UPDATE users info
exports.update = function (req, res, next) {
users.findById(req.params.users_id, function (err, users) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (users != null) {
                
                users.firstname = req.body.firstname ? req.body.firstname : users.firstname;
                users.lastname = req.body.lastname ? req.body.lastname : users.lastname;
                users.email = req.body.email ? req.body.email : users.email;
                users.password = req.body.password ? req.body.password : users.password;
                users.token = req.body.token ? req.body.token : users.token;
                users.rank = req.body.rank ? req.body.rank : users.rank;
                users.adress = req.body.adress ? req.body.adress : users.adress;
                users.gender = req.body.age ? req.body.gender : users.gender;
                users.age = req.body.age ? req.body.age : users.age;
                users.phone = req.body.phone ? req.body.phone : users.phone;
                
                // save the users and check for errors
                users.save(function (err) {
                    if (err) {
                        res.status(500).json(err)
                    } else {
                        res.status(200).json({
                            message: message.users.update
                        });
                    }
                });
            } else {
                res.status(500).json({
                    message: message.error.null
                }); 
            }
        }
    });
};

// Handle DELETE users
exports.delete = function (req, res, next) {
    users.remove({_id:req.params.users_id}, function (err, users) {
        if (err) {
            res.status(500).send(err);
        } 
            res.status(200).json({
                message: message.users.delete
            });
    });
};


// test ping route
exports.ping = function (req, res, next) {
    res.status(200).json({
        message: message.test.test1
    });
};
