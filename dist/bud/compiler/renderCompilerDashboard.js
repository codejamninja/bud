"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.renderCompilerDashboard = void 0;
var webpack_1 = __importDefault(require("webpack"));
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var Runner_1 = require("./Runner");
var injectHot = function (webpackConfig) {
    var client = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&overlay=true';
    Object.keys(webpackConfig.entry).forEach(function (entry) {
        webpackConfig.entry[entry] = [client].concat(webpackConfig.entry[entry]);
    });
    return webpackConfig;
};
/**
 * Webpack compilation dashboard renderer.
 */
var renderCompilerDashboard = function (bud, webpackConfig) {
    var compiler = bud.featureEnabled('hot')
        ? webpack_1["default"](injectHot(webpackConfig))
        : webpack_1["default"](webpackConfig);
    var runnerProps = {
        bud: bud,
        compiler: compiler
    };
    var application = react_1["default"].createElement(Runner_1.Runner, runnerProps);
    /** 🚀 */
    ink_1.render(application);
};
exports.renderCompilerDashboard = renderCompilerDashboard;
//# sourceMappingURL=renderCompilerDashboard.js.map