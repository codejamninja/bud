"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.miniCssExtract = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var miniCssExtract = function () { return ({
    setOptions: function () {
        return {
            filename: this.bud.state.features.hash
                ? "[name].[hash:8].css"
                : '[name].css'
        };
    },
    make: function () {
        return new mini_css_extract_plugin_1["default"](this.options);
    }
}); };
exports.miniCssExtract = miniCssExtract;
//# sourceMappingURL=miniCssExtract.js.map