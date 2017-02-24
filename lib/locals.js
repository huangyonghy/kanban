/**
 * Created by HuangY on 2017/2/20.
 */

var navLinks = [{key: 'tasks', label: 'Tasks', href: '/tasks'},
    {key: 'users', label: 'Users', href: '/users'},
    {key: 'models', label: 'Models', href: '/models'}];

module.exports.Locals = {
    title: 'Kanban',
    navLinks: navLinks,
    section: 'index',
};

var messages = {info: {}, success: {}, warning: {}, error: {}};
messages.clear = function () {
    this.info = {};
    this.success = {};
    this.warning = {};
    this.error = {};
}
module.exports.Messages = messages;