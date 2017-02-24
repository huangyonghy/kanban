/**
 * Created by HuangY on 2017/2/16.
 */
var mongoose = require('mongoose');
var schema = require('./schema');
var Model = require('../../lib/dblink/Model');

var taskModel = mongoose.model('Task', schema.taskSchema);

exports.createTask = function (contents, next) {
    var task = new taskModel;
    task.name = contents.name;
    task.description = contents.description;
    task.model = contents.model_id;
    task.period_from = new Date(contents.date_from);
    task.period_to = new Date(contents.date_to);
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

exports.findTask = function (name, callback) {
    taskModel.findOne({name: name}).exec(function (err, result) {
        callback(err, result);
    });
};

exports.deleteTask = function (name, callback) {
    taskModel.remove({name: name}, function (err) {
        callback(err);
    });
};

exports.taskModel = taskModel;
exports.currentTasks = [];