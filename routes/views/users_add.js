var locals = require('../../lib/locals');

/* GET home page. */
exports = module.exports =  function (req, res, next) {
    locals.Locals.section = 'users';
    res.render('users_add', {Locals: locals.Locals});
};

