var locals = require('../../lib/locals');
var Model = require('../../lib/dblink/Model');

/* GET home page. */
exports = module.exports = function (req, res, next) {
    locals.Locals.section = 'tasks';
    Model.getModels(function (results) {
        if (results.isError) {
            next(results);
        }
        else {
            Model.currentModels = results;
            res.render('tasks_add', {Locals: locals.Locals, models: Model.currentModels});
        }
    });
};

