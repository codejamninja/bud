import type Webpack from 'webpack'
import {VueLoaderPlugin} from 'vue-loader'
import {Extension, Item, Loader} from '@roots/bud-typings'

/** Patched compiler.*/
/* eslint-disable */
const compiler = require('./vue-template-compiler/index')

export const registerLoaders: Extension.Module.RegisterMany<Loader> = {
  vue: require.resolve('vue-loader'),
}

export const registerItems: Extension.Module.RegisterMany<Item.Module> = {
  vue: {
    ident: 'vue',
    loader: 'vue',
    options: {
      compiler,
    },
  },
}

/**
 * Boot the Vue extension.
 */
export const boot: Extension.Module.Boot = bud => {
  /**
   * Add vue loader style rules.
   */
  ;['css', 'sass'].map(
    rule =>
      bud.build.rules.has(rule) &&
      bud.build.rules.mutate(`${rule}.use`, use => [
        ...use.splice(0, 1),
        bud.build.items.get('vue'),
        ...use.splice(1),
      ]),
  )

  /**
   * vue-loader-plugin doesn't recognize the rule
   * as being set if it is set as a `oneOf` rule.
   *
   * So, instead of registering the rule through the normal
   * export function this hook registers the rule in the
   * outer `webpack.module.rules` key.
   */
  bud.hooks.on<Webpack.Module['rules']>(
    'webpack.module.rules',
    rules => [
      ...rules,
      {
        test: /\.vue$/,
        use: bud.build.items.get('vue'),
      },
    ],
  )

  /**
   * Register vue-loader-plugin.
   */
  bud.extensions.set('vue-loader-plugin', {
    make: new VueLoaderPlugin(),
  })

  bud
    .alias({vue$: 'vue/dist/vue.esm.js'})
    .when(
      !bud.config.get('resolve.extensions').includes('.vue'),
      () =>
        bud.config.mutate('resolve.extensions', ext => [
          ...ext,
          '.vue',
        ]),
    )
}
