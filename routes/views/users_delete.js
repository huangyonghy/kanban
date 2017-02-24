var url = require('url');
var querystring = require('querystring')
var User = require('../../lib/dblink/User');

/* GET home page. */
exports = module.exports = function (req, res, next) {
    var params = querystring.parse(url.parse(req.url).query);
    User.deleteUser(params.name, function (err) {
        if (err) {
            console.log(err.message)
            next(err);
        }
        else {
            res.redirect('/users');
        }
    })
};

