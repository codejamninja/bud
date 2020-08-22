import type {Copy, PostCssConfiguration, Target} from './types'

import {BabelTransformOptions} from '@roots/bud-typings'
const babelFallback: BabelTransformOptions = {
  presets: [require.resolve('@babel/preset-env')],
  plugins: [],
}

const babel: (configs) => BabelTransformOptions = function (configs) {
  return configs.get('babel')
    ? configs.require('babel')
    : babelFallback
}

const browsersync: (flags) => any = flags => ({
  host: flags.has('host') ? flags.get('host') : 'localhost',
  port: flags.get('port') ? flags.get('port') : 3000,
  proxy: flags.get('proxy') ? flags.get('proxy') : 'localhost',
  online: false,
  open: false,
})

const copy: Copy = {patterns: []}

const postcss: (configs) => PostCssConfiguration = function (
  configs,
) {
  const fallback = {
    plugins: [require('postcss-import'), require('autoprefixer')],
  }

  return configs.has('postcss')
    ? configs.require('postcss')
    : fallback
}

const target: Target = 'web'

/**
 * Options container.
 */
const options = {
  resolve: {
    alias: false,
    extensions: ['.css', '.js', '.json', '.svg'],
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':
        'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  devtool: 'source-map',
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtime/${entrypoint.name}`,
    },
    splitChunks: {
      cacheGroup: {
        vendor: {
          test: /node_modules/,
          name: 'vendor.js',
          chunks: 'all',
          priority: -20,
        },
      },
    },
  },
  stats: {
    version: true,
    hash: true,
    assets: true,
    errors: true,
    warnings: true,
  },
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  adapters: {
    browsersync,
    clean: {},
    fixStyleOnlyEntries: {
      silent: true,
    },
    hotModuleReplacement: {},
    terser: {
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      },
      cache: true,
      parallel: true,
    },
  },
  patterns: [],
  postcss,
  babel,
  splitting: {
    maxChunks: null,
  },
  target,
  copy,
  filenameTemplate: {
    hashed: '[name].[hash:8]',
    default: '[name]',
  },
  manifest: {
    name: 'manifest.json',
  },
}

export {options}
