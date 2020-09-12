import {bud} from '@roots/bud'
import type {Bud, Plugin} from '@roots/bud-types'

import dependencyExtractionPlugin from '@roots/bud-dependency-extraction-webpack-plugin'
import sass from '@roots/bud-sass'
import eslint from '@roots/bud-eslint'
import stylelint from '@roots/bud-stylelint'
import purgecss from '@roots/bud-purgecss'

type SageFeature =
  | typeof purgecss
  | typeof eslint
  | typeof stylelint
  | typeof dependencyExtractionPlugin
  | typeof sass

type SageFeatures = Plugin[]

interface FeatureOption {
  key: SageFeature
  value: boolean
}

type SelectFeatures = FeatureOption[]

const featureSet: SageFeatures = [
  purgecss.plugin,
  eslint,
  stylelint,
  dependencyExtractionPlugin,
  sass,
]

/**
 * ## sage.enableThemeFeatures
 *
 * Customize the features used in your theme.
 */
const enableThemeFeatures = function (features: SelectFeatures) {
  const enabledFeatures: Plugin[] = []

  if (!features) {
    featureSet.forEach(feature => {
      enabledFeatures.push(feature)
    })
  } else {
    Object.entries(featureSet).forEach(([feature, plugin]) => {
      const isEnabled =
        !features ||
        !features.hasOwnProperty(feature) ||
        features[feature] !== false

      isEnabled && enabledFeatures.push(plugin)
    })
  }

  this.use(enabledFeatures)

  enabledFeatures.includes(purgecss) &&
    this.purgecss({
      enabled: this.inProduction,
      options: purgeWordPress,
    })

  return this
}

const sage: Bud = (() => {
  bud.apply('enableThemeFeatures', enableThemeFeatures)

  return bud
    .srcPath('resources/assets')
    .distPath('dist')
    .alias({
      '@fonts': bud.src('fonts'),
      '@images': bud.src('images'),
      '@scripts': bud.src('scripts'),
      '@styles': bud.src('styles'),
    })
    .provide({
      jquery: ['$', 'window.jQuery'],
    })
    .runtimeManifest()
    .mini(bud.mode.is('production'))
    .map(bud.mode.is('development'))
    .hash(bud.mode.is('production'))
    .vendor()
})()

declare type Sage = typeof sage
export {sage, Sage, SageFeature, SageFeatures}
