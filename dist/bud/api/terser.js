"use strict";
exports.__esModule = true;
exports.terser = void 0;
/**
 * ## bud.terser
 *
 * Enable or disable minification
 *
 * ```js
 * bud.hot(true) // enable
 * ```
 *
 * ```js
 * bud.hot(false) // disable
 * ```
 */
var terser = function (options) {
    var _a, _b;
    this.state.features.terser = (_a = options === null || options === void 0 ? void 0 : options.enable) !== null && _a !== void 0 ? _a : true;
    this.state.options.terser = {
        terserOptions: (_b = options === null || options === void 0 ? void 0 : options.terser) !== null && _b !== void 0 ? _b : {
            parse: {
                ecma: 8
            },
            compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2
            },
            mangle: {
                safari10: true
            },
            output: {
                ecma: 5,
                comments: false,
                ascii_only: true
            }
        },
        cache: true,
        parallel: true,
        sourceMap: this.state.features.sourceMap
    };
    return this;
};
exports.terser = terser;
//# sourceMappingURL=terser.js.map