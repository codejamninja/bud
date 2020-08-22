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
import TerserPlugin from 'terser-webpack-plugin';

var terser = function (bud) { return ({
    bud: bud,
    name: 'terser-webpack-plugin',
    options: bud.options.get('adapters.terser'),
    make: function () {
        return new TerserPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('minify');
    },
}); };

export { terser };
