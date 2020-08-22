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
import { __spreadArrays } from 'tslib';
import { join } from 'path';

var copyAll = function (from, to) {
    this.options.set('copy.patterns', __spreadArrays(this.options.get('copy.patterns'), [
        this.hooks.filter('bud.copyAll.filter', {
            from: '**/*',
            context: from,
            to: to ? to : join(this.paths.get('dist'), from),
            globOptions: {
                ignore: '.*',
            },
            noErrorOnMissing: true,
        }),
    ]));
    return this;
};

export { copyAll };
