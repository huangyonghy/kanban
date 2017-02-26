var express = require('express');
var url = require('url');
var locals = require('../../lib/locals');
var Task = require('../../lib/dblink/Task');
var Model = require('../../lib/dblink/Model');
var User = require('../../lib/dblink/User');

/* GET home page. */
exports = module.exports = function (req, res, next) {
    var taskName = req.params.task;
    if (req.method == 'GET') {
        Task.taskModel.findOne({name: taskName}).populate({path: 'model', model: 'Model'}).exec(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                res.render('task', {
                    Locals: locals.Locals,
                    model: result.model,
                    task: result,
                    users: User.currentUsers
                });
            }
        });
    }
    else if (req.method == 'POST') {
        var users = req.body.users.split(',');
        var state = req.body.state;
        Task.updateTask(taskName, users, state, function(err, task){
            if (err) {
                next(err)
            }
            else {
                res.redirect('/tasks');
            }
        });
    }
};

