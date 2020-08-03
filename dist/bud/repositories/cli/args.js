"use strict";
exports.__esModule = true;
exports.args = void 0;
var yargs_1 = require("yargs");
/**
 * Resolve a value from CLI, envvar or a fallback.
 *
 * Order of precedence:
 *  - cli
 *  - env
 *  - fallback
 */
var source = function (argKey, env, fallback) {
    var _a;
    var fromCli = yargs_1.argv && argKey ? yargs_1.argv[argKey] : null;
    var fromEnv = env !== null && env !== void 0 ? env : null;
    return (_a = fromCli !== null && fromCli !== void 0 ? fromCli : fromEnv) !== null && _a !== void 0 ? _a : fallback;
};
var args = function (framework) {
    var _a;
    var env = framework.env;
    return {
        level: (_a = yargs_1.argv['level']) !== null && _a !== void 0 ? _a : 'info',
        mode: source('env', env.get('APP_ENV'), 'none'),
        host: source('host', env.get('APP_DEV_HOST'), false),
        port: source('port', env.get('APP_DEV_PORT'), null),
        proxy: source('proxy', env.get('APP_DEV_PROXY'), null),
        src: source('src', env.get('APP_SRC'), null),
        dist: source('dist', env.get('APP_DIST'), null),
        feature: source('feature', env.get('APP_BUILD_FEATURE'), null)
    };
};
exports.args = args;
//# sourceMappingURL=args.js.map