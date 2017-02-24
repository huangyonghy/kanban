/**
 * Created by HuangY on 2017/2/16.
 */
var mongoose = require('mongoose');
var schema = require('./schema');

var modelModel = mongoose.model('Model', schema.modelSchema);

exports.createModel = function (name, items, next) {
    if (items.length == 0) {
        var err = new Error('Items should not be empty!');
        next(err);
    }
    else {
        var model = new modelModel;
        model.name = name;
        model.items = items;
        model.save(function (err, task) {
            if (err) {
                next(err);
            }
            else {
                next();
            }
        });
    }
};

exports.getModels = function (callback) {
    modelModel.find(function (err, results) {
        if (err) {
            callback(err);
        }
        callback(results);
    });
};

exports.deleteModel = function (id, callback) {
    modelModel.remove({_id: id}, function (err) {
        callback(err);
    });
};

exports.getModelByName = function (name, callback) {
    modelModel.findOne().where('name').equals(name).exec(function (err, result) {
        if (err) {
            callback(err);
        }
        callback(result);
    });
}

exports.modelModel = modelModel;
exports.currentModels = [];