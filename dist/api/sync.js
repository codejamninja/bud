var sync = function (_a) {
    var _b = _a.enabled, enabled = _b === void 0 ? true : _b, options = _a.options;
    this.features.set('browserSync', enabled !== null && enabled !== void 0 ? enabled : true);
    this.features.enabled('browserSync') && this.options.merge('browserSync', options);
    return this;
};
export { sync };
//# sourceMappingURL=sync.js.map