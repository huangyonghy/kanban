var url = require('url');
var querystring = require('querystring')
var Model = require('../../lib/dblink/Model');

/* GET home page. */
exports = module.exports = function (req, res, next) {
    var params = querystring.parse(url.parse(req.url).query);
    Model.deleteModel(params.id, function (err) {
        if (err) {
            console.log(err.message)
            next(err);
        }
        else {
            res.redirect('/models');
        }
    })
};

