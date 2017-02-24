var async = require('async');
var locals = require('../../lib/locals');

exports = module.exports = function (req, res) {
    locals.Locals.section = 'blog';
	res.render('blog', {Locals: locals.Locals});
};
