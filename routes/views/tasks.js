var express = require('express');
var locals = require('../../lib/locals');
var Task = require('../../lib/dblink/Task');
var Model = require('../../lib/dblink/Model');

/* GET home page. */
exports = module.exports = function (req, res, next) {
    if (req.method == 'GET') {
        locals.Messages.clear();
        locals.Locals.section = 'tasks';
        Task.getTasks(function (results) {
            if (results.isError) {
                var message = {};
                message.detail = results.message;
                locals.Messages.error = {message: message};
            }
            else {
                Task.currentTasks = results;
                res.render('tasks', {Locals: locals.Locals, tasks: results, messages: locals.Messages});
            }
        });
    }
    else if (req.method == 'POST') {
        Task.createTask(req.body, function (err) {
            if (err) {
                var message = {};
                message.detail = err.message;
                locals.Messages.error = {message: message};
                res.render('tasks_add', {Locals: locals.Locals, messages: locals.Messages, models: Model.currentModels});
            }
            else {
                res.redirect('/tasks');
            }
        })
    }
};

