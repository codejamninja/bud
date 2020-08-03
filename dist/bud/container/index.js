"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.bindExtensionContainer = exports.bindFileContainer = exports.bindContainer = exports.container = void 0;
var fs_extra_1 = require("fs-extra");
var controller_1 = require("../repositories/plugins/controller");
var logger_1 = require("../util/logger");
var newContainer = function (key, repository) {
    if (repository === void 0) { repository = {}; }
    this.repository[key] = repository
        ? new container({})
        : new container([]);
};
var get = function (key) {
    return this.repository[key];
};
var is = function (key, value) {
    return this.get(key) == value;
};
var contents = function (key) {
    return require(this.get(key));
};
var set = function (key, value) {
    logger_1.logger.info({ name: 'container', key: key, value: value }, this.name + ".set");
    this.repository[key] = value;
};
var has = function (key) {
    return this.repository.hasOwnProperty(key) ? true : false;
};
var merge = function (key, value) {
    this.repository[key] = this.repository[key]
        ? __assign(__assign({}, this.repository[key]), value) : this.repository[key]
        ? __spreadArrays(this.repository[key], value) : [this.repository[key], value];
};
var containerMethodDelete = function (key) {
    delete this.repository[key];
};
var exists = function (key) {
    return fs_extra_1.existsSync(this.repository[key]);
};
var enable = function (key) {
    logger_1.logger.info({ name: 'container', key: key, value: true }, this.name + ".enable");
    this.repository[key] = true;
};
var disable = function (key) {
    logger_1.logger.info({ name: 'container', key: key, value: false }, this.name + ".disable");
    this.repository[key] = false;
};
var enabled = function (key) {
    return this.is(key, true);
};
var disabled = function (key) {
    return this.is(key, false);
};
var map = function () {
    var _a;
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    return (_a = this.repository).map.apply(_a, params);
};
var entries = function () {
    return this.repository;
};
var container = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    this.name = name;
    this.repository = repository;
    this["new"] = newContainer;
    this.get = get;
    this.has = has;
    this.set = set;
    this.map = map;
    this.entries = entries;
    this.merge = merge;
    this["delete"] = containerMethodDelete;
    this.is = is;
    this.enable = enable;
    this.enabled = enabled;
    this.disable = disable;
    this.disabled = disabled;
};
exports.container = container;
var bindContainer = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    logger_1.logger.info({ name: 'container', repository: repository }, "create container: " + name);
    return new container(repository, name);
};
exports.bindContainer = bindContainer;
var bindFileContainer = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    logger_1.logger.info({ name: 'container', repository: repository }, "create file container: " + name);
    var store = new container(repository, name);
    store.contents = contents;
    store.exists = exists;
    return store;
};
exports.bindFileContainer = bindFileContainer;
var bindExtensionContainer = function (repository, name) {
    if (name === void 0) { name = 'anonymous'; }
    logger_1.logger.info({ name: 'container', repository: repository }, "create extension api container: " + name);
    var store = new container(repository, name);
    store.controller = controller_1.controller;
    return store;
};
exports.bindExtensionContainer = bindExtensionContainer;
//# sourceMappingURL=index.js.map