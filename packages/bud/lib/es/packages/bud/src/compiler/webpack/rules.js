/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
var rules = function (bud) {
    return bud.hooks.filter('webpack.module', {
        module: bud.hooks.filter('webpack.module.rules', {
            rules: bud.rules.repository.map(function (rule) {
                return bud.hooks.filter("webpack.module.rules." + rule.name, rule(bud));
            }),
        }),
    });
};

export { rules };