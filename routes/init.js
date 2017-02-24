var Model = require('../lib/dblink/Model');
var User = require('../lib/dblink/User');
var Task = require('../lib/dblink/Task');

exports.initModels =  function () {
        Model.getModels(function (results) {
            if (results.isError) {
                Model.currentModels = [];
            }
            else {
                Model.currentModels = results;
            }
        });
};

exports.initUsers =  function () {
        User.getUsers(function (results) {
            if (results.isError) {
                User.currentUsers = [];
            }
            else {
                User.currentUsers = results;
            }
        });
};

exports.initTasks =  function () {
        Task.getTasks(function (results) {
            if (results.isError) {
                User.currentTasks = [];
            }
            else {
                User.currentTasks = results;
            }
        });
};