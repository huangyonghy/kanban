var express = require('express');
var router = express.Router();
var importer = require('../lib/importer');
var init = require('./init');

var importRoutes = importer(__dirname);
var routes = {
	views: importRoutes('./views'),
};

//init enviroment
init.initModels();
init.initUsers();

// Setup Route Bindings
router.get('/', routes.views.index);
router.all('/tasks', routes.views.tasks);
router.get('/tasks/add', routes.views.tasks_add);
router.get('/tasks/delete', routes.views.tasks_delete);
router.all('/users', routes.views.users);
router.get('/users/add', routes.views.users_add);
router.get('/users/delete', routes.views.users_delete);
router.all('/models', routes.views.models);
router.get('/models/add', routes.views.models_add);
router.get('/models/delete', routes.views.models_delete);

router.all('/tasks/:task', routes.views.task);
// router.get('/blog/:category?', routes.views.blog);
// router.get('/blog/post/:post', routes.views.post);
// router.get('/news/:category?', routes.views.news);
// router.get('/news/post/:post', routes.views.postNews);
// router.get('/gallery', routes.views.gallery);
// router.all('/contact', routes.views.contact);

module.exports = router;
