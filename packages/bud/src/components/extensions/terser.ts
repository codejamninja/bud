import {Extension} from '@roots/bud-typings'
import TerserPlugin, {
  TerserPluginOptions,
} from 'terser-webpack-plugin'

export const options: TerserPluginOptions = {
  terserOptions: {
    parse: {
      ecma: 2018,
    },
    compress: false,
    mangle: {
      safari10: true,
    },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
  },
  extractComments: false,
  parallel: true,
}

export const make: Extension.Module.Make = (
  options: Extension.Module.RawOptions<TerserPluginOptions>,
) => new TerserPlugin(options.all())

export const when: Extension.Module.When = ({features}) =>
  features.enabled('minify')
