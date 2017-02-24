var express = require('express');
var locals = require('../../lib/locals');
var Model = require('../../lib/dblink/Model');

exports = module.exports =  function (req, res, next) {
    if (req.method == 'GET') {
        locals.Locals.section = 'models';
        Model.getModels(function (results) {
            if (results.isError) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            }
            else {
                Model.currentModels = results;
                res.render('models', {Locals: locals.Locals, models: results});
            }
        });
    }
    else if (req.method == 'POST') {
        Model.createModel(req.body.name, req.body.items, function (err) {
            if (err) {
                var message = {};
                message.detail = err.message;
                locals.Messages.error = {message: message};
                res.render('models_add', {Locals: locals.Locals, messages: locals.Messages});
            }
            else {
                res.redirect('/models');
            }
        })
    }
};

