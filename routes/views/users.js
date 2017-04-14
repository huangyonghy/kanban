var express = require('express');
var locals = require('../../lib/locals');
var User = require('../../lib/dblink/User');
var email = require('../../lib/email');

/* GET home page. */
exports = module.exports = function (req, res, next) {
    if (req.method == 'GET') {
        locals.Locals.section = 'users';
        User.getUsers(function (results) {
            if (results.isError) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            }
            else {
                User.currentUsers = results;
                res.render('users', {Locals: locals.Locals, users: results});
            }
        });
    }
    else if (req.method == 'POST') {
        User.createUser(req.body.name, function (err) {
            if (err) {
                var message = {};
                message.detail = err.message;
                locals.Messages.error = {message: message};
                res.render('users_add', {Locals: locals.Locals, messages: locals.Messages});
            }
            else {
                res.redirect('/users');
            }
        });
        email.sendEmail(req.body.name, req.body.email, 'Hello, world!', function (error, info) {
            if (error) {
                return next(error);
            }
            else {
                // console.log('Message sent: ' + info.response);
                res.redirect('/users');
            }
        });
    }
};

