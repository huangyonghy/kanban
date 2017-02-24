var locals = require('../../lib/locals');

/* GET home page. */
exports = module.exports =  function (req, res, next) {
    locals.Locals.section = 'models';
    res.render('models_add', {Locals: locals.Locals});
};

