/**
 * Created by HuangY on 2017/2/16.
 */
var mongoose = require('mongoose');
var schema = require('./schema');
var Model = require('../../lib/dblink/Model');
var User = require('./User');

var taskModel = mongoose.model('Task', schema.taskSchema);;

exports.createTask = function (contents, next) {
    var task = new taskModel;
    task.name = contents.name;
    task.description = contents.description;
    task.model = contents.model_id;
    task.period_from = new Date(contents.date_from);
    task.period_to = new Date(contents.date_to);
    Model.currentModels.forEach(function(item){
        if (item._id == contents.model_id) {
            task.state = item.items[0];
        }
    })
    task.save(function (err, task) {
        if (err) {
            console.log(err);
            next(err);
        }
        else {
            next();
        }
    });
};

exports.getTasks = function (callback) {
    taskModel.find(function (err, results) {
        if (err) {
            callback(err);
        }
        callback(results);
    });
};

var findTask = exports.findTask = function (name, callback) {
    taskModel.findOne({name: name}).exec(function (err, result) {
        callback(err, result);
    });
};

exports.deleteTask = function (name, callback) {
    taskModel.remove({name: name}, function (err) {
        callback(err);
    });
};

exports.updateTask = function (name, users, state, callback) {
    findTask(name, function (err, task) {
        if (err) {
            callback(err);
        }
        else {
            users.forEach(function (userName) {
                User.currentUsers.forEach(function (item, index, array) {
                        if (item.name == userName)
                            task.users.push(item._id);
                    }
                );
            });
            task.state = state;
            task.save(function(err, task){
                callback(err, task);
            });
        }
    });
};

exports.taskModel = taskModel;
exports.currentTasks = [];