/**
 * Created by HuangY on 2017/2/16.
 */
var mongoose = require('mongoose');
var schema = require('./schema');

var userModel = mongoose.model('User', schema.userSchema);;

exports.createUser = function (name, next) {
    var user = new userModel;
    user.name = name;
    user.speak();
    user.save(function (err) {
        if (err, user) {
            console.error(err);
        }
        next();
    });
};

exports.getUsers = function (callback) {
    userModel.find(function (err, results) {
        if (err) {
            // return console.error(err);
            callback(err);
        }
        callback(results);
    });
};

exports.deleteUser = function (name, callback) {
    userModel.remove({name: name}, function(err) {
            callback(err);
    });
};

exports.userModel = userModel;
exports.currentUsers = [];