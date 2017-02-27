/**
 * Created by HuangY on 2017/2/16.
 */
var mongoose = require('mongoose');
var dbname = 'kanban';
mongoose.connect('mongodb://localhost/' + dbname);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Connect database ' + dbname);
});

var Schema = mongoose.Schema;

// Define User Schema
var userSchema = Schema(
    {
        name: {type: String, unique: true, required: true},
    },
    {collection: 'user'}
);
userSchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name"
    console.log(greeting);
};
exports.userSchema = userSchema;
var  User = require('./User');

// Define Model Schema
var modelSchema = mongoose.Schema({
        name: {type: String, unique: true, required: true},
        items: {type: [], required: true},
    },
    {collection: 'model'});
exports.modelSchema = modelSchema;
var  Model = require('./Model');

// Define Task Schema
var taskSchema = mongoose.Schema({
        name: {type: String, unique: true, required: true},
        description: {type: String, unique: true, required: true},
        users: [{type: Schema.Types.ObjectId, ref: 'User'}],
        model: {type: Schema.Types.ObjectId, ref: 'Model', required: true},
        period_from: {type: Date, default: Date.now, required: true},
        period_to: {type: Date, default: Date.now, required: true},
        state: {type: String},
    },
    {collection: 'task'});
taskSchema.methods.getModelNameFromId = function (model_id) {
   // console.log(Model.currentModels);
   for(var i=0; i< Model.currentModels.length; i++) {
       var model = Model.currentModels[i];
       if (model._id.toString() == model_id.toString()) {
           return model.name;
       }
   }
};
taskSchema.methods.contactUsers = function (task) {
   var result = [];
   task.users.forEach(function(id){
       User.currentUsers.forEach(function(user){
           if (id.toString() == user._id.toString()) {
               result.push(user.name);
           }
       });
   });
   return result.join(',');
};
exports.taskSchema = taskSchema;