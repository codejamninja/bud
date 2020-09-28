import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin'
import type DependencyExtractionOptions from '@wordpress/dependency-extraction-webpack-plugin'
import Bud from '@roots/bud-types'

const dependencyExtractionPlugin: Bud.Plugin.Factory = function (
  bud: Bud,
) {
  return {
    bud,

    make: function () {
      this.bud.options.set(
        'webpack.plugins.wordpress-dependency-extraction-webpack-plugin',
        {
          injectPolyfill: false,
          outputFormat: 'json',
          requestToExternal: request => {
            if (request === '@babel/runtime/regenerator')
              return null
          },
        },
      )

      /**
       * ## bud.dependencyExtraction
       *
       * Configures @wordpress/dependency-extraction-webpack-plugin
       *
       * @see https://git.io/JJLxM
       *
       * ```js
       * bud.dependencyExtraction({
       *   outputFormat: 'js',
       *   injectPolyfill: false,
       * })
       * ```
       */
      this.bud.apply('extract', function (
        this: Bud,
        settings?: DependencyExtractionOptions,
      ): Bud {
        settings &&
          this.options.merge(
            'webpack.plugins.wordpress-dependency-extraction-webpack-plugin',
            settings,
          )

        return this
      })

      this.bud.plugins.set(
        'wordpress-dependency-extraction-webpack-plugin',
        (bud: Bud) => ({
          options: bud.options.get(
            'webpack.plugins.wordpress-dependency-extraction-webpack-plugin',
          ),

          make: function () {
            return new DependencyExtractionWebpackPlugin(
              this.options,
            )
          },
        }),
      )
    },
  }
}

module.exports = dependencyExtractionPlugin
