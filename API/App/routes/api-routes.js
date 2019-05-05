/**
 *  Project : API-NODE-JS 
 * 
 *  Date : May 05 2019
 *  Created by Clement Molotkoff 
 */

// api-routes.js

// Initialize express router
const router = require('express').Router();

// Import users controller
const usersController = require('../Controllers/usersController');
const authController = require('../Controllers/authController');
const ticketsController = require('../Controllers/ticketsController');

// Import middleware
const auth = require('../middleware/auth')

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome !',
    });
});


/* ########## GROUP ROUTE CONCERN USERS ########## */
// Users register
router.route('/register')    
    .post(authController.register);

// Users login
router.route('/login')
    .post(authController.login);

// Users logout
router.route('/logout')
    .post(authController.logout);

// Return all users 
router.route('/users')
    .get(auth.MemberIsAuthorized, usersController.index);

// Return user with user_id in uri
router.route('/users/:users_id')
    .get(auth.MemberIsAuthorized, usersController.viewbyId);

// edit users with id
router.route('/users/edit/:users_id')
    .patch(auth.AdminIsAuthorized, usersController.update)
    .put(auth.AdminIsAuthorized, usersController.update);

// delete user with id 
router.route('/users/remove/:users_id')
    .delete(auth.AdminIsAuthorized, usersController.delete);

// Return user with email in uri
router.route('/users/email/:users_email')
    .get(auth.MemberIsAuthorized, usersController.viewbyemail);

/* ########## GROUP ROUTE CONCERN TEST ########## */
// Test route ping
router.route('/ping')
    .get(auth.AdminIsAuthorized, usersController.ping);

// Export API routes
module.exports = router;
