var url = require('url');
var querystring = require('querystring')
var Task = require('../../lib/dblink/Task');

/* GET home page. */
exports = module.exports = function (req, res, next) {
    var params = querystring.parse(url.parse(req.url).query);
    Task.deleteTask(params.name, function (err) {
        if (err) {
            console.log(err.message)
            next(err);
        }
        else {
            res.redirect('/tasks');
        }
    })
};

