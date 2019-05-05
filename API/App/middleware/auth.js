/**
 *  Project : API-NODE-JS 
 * 
 *  Date : May 05 2019
 *  Created by Clement Molotkoff 
 */

// Auth middleware

// Import user model
const users = require('../Models/usersModel');

// Import messages and errors message : 
const message = require('../assets/message.json');

// Function authorize admin middleware
module.exports.AdminIsAuthorized  = function(req, res, next) {
    const token = req.headers.token;

    if (token != null) {
        users.findOne({token : req.headers.token}, function (err, users) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (users != null) {
                    if (users.token != req.headers.token) {
                        res.status(401).json({
                            error: message.error.token.invalid
                        });
                    } else {
                        if (users.rank === 'admin') {
                            return next();
                        } else {
                            res.status(403).json({
                                error: message.error.unauthorized
                            });
                        }
                    }
                } else {
                    res.status(401).json({
                        error: message.error.token.invalid
                    });
                }
            }
        });
    } else {
        res.status(401).json({
            error: message.error.token.missing
        });
    }
}

// Function authorize admin middleware
module.exports.StaffIsAuthorized  = function(req, res, next) {
    const token = req.headers.token;

    if (token != null) {
        users.findOne({token : req.headers.token}, function (err, users) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (users != null) {
                    if (users.token != req.headers.token) {
                        res.status(401).json({
                            error: message.error.token.invalid
                        });
                    } else {
                        if (users.rank === 'staff') {
                            return next();
                        } else {
                            res.status(403).json({
                                error: message.error.unauthorized
                            });
                        }
                    }
                } else {
                    res.status(401).json({
                        error: message.error.token.invalid
                    });
                }
            }
        });
    } else {
        res.status(401).json({
            error: message.error.token.missing
        });
    }
}

// Function authorize membre middleware
module.exports.MemberIsAuthorized  = function(req, res, next) {
    var token = req.headers.token;

    if (token != null) {
        users.findOne({token : req.headers.token}, function (err, users) {
            if (err) {
                res.send(err);
            } else {
                if (users != null) {
                    if (users.token != req.headers.token) {
                        res.status(401).json({
                            error: msgerror.error.token.invalid
                        });
                    } else {
                        if (users.rank === 'admin' || users.rank === 'member') {
                            return next();
                        } else {
                            res.status(403).json({
                                error: message.error.unauthorized
                            });
                        }
                    }
                } else {
                    res.status(401).json({
                        error: message.error.token.invalid
                    });
                }
            }
        });
    } else {
        res.status(401).json({
            error: msgerror.error.token_missing
        });
    }
}