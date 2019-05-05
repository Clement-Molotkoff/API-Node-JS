/**
 *  Project : API-NODE-JS 
 * 
 *  Date : May 05 2019
 *  Created by Clement Molotkoff 
 */

// AuthController.js

// Import users model
const users = require('../Models/usersModel');

// Import messages and errors message : 
const message = require('../assets/message.json');

// Import extern usefull libs 
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Handle CREATE users actions
exports.register = function (req, res) {
    var user = new users();

    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.token = crypto.randomBytes(265).toString('hex');
    user.rank = req.body.rank;
    user.adress = req.body.adress;
    user.gender = req.body.gender;
    user.age = req.body.age;
    user.phone = req.body.phone;
    
    user.save(function (err) {
         if (err) {
             res.status(500).json(err);
        } else {
            res.status(200).json({
                message: message.users.create,
            });
        }
    });
};

// Connect user, create token
exports.login = function (req, res, next) {
    var req_email = req.body.email;
    var req_password = req.body.password;

    if (req_email != null || req_password != null) {
        users.findOne({email:req_email}, function (err, myUser) {
            if (err) {
                res.status(500).send(err);
            } else {
                if (myUser != null ) {
                    console.log(myUser);
                    if(bcrypt.compareSync(req_password, myUser.password)) { // ICI
                        myUser.token = crypto.randomBytes(420).toString('hex');
                        myUser.save();
                        console.log(myUser);
                        res.status(200).json({
                            data: myUser,
                        });
                    } else {
                        res.status(400).json({
                            message: message.error.notmatch
                        });
                    }
                }else {
                    res.status(500).json({
                        message: message.error.null
                    });
                }
            } 
        });
    } else {
        res.status(500).json({
            message: message.error.invalidfield
        });
    }
}

// Disonnect user, remove token.
exports.logout = function (req, res) {
    users.findOne({_id: req.body.id}, function (err, myUser) {
        if (err) {
            res.send(err);
        } else {
            if (myUser != null) {
                myUser.token = null;
                // save the users and check for errors
                myUser.save(function (err) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({
                            message: message.error.disconect,
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