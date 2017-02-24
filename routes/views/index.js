var locals = require('../../lib/locals');

/* GET home page. */
exports = module.exports =  function (req, res, next) {
    locals.Locals.section = 'index';
    res.render('index', {Locals: locals.Locals});
};

