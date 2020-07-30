import StylelintPlugin from 'stylelint-webpack-plugin'
import type {WebpackAdapter} from './types'

const stylelint: WebpackAdapter = () => ({
  setOptions: function () {
    return {
      configFile: this.bud.configs.get('stylelint'),
    }
  },
  make: function () {
    return new StylelintPlugin(this.options)
  },
  when: function () {
    return this.bud.features.enabled('stylelint')
  },
})

export {stylelint}
