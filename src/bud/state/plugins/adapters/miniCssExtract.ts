import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type {WebpackAdapter} from './types'

const miniCssExtract: WebpackAdapter = () => ({
  setOptions: function () {
    return {
      filename: this.bud.features.enabled('hash')
        ? `[name].[hash:8].css`
        : '[name].css',
    }
  },
  make: function () {
    return new MiniCssExtractPlugin(this.options)
  },
  when: function () {
    return (
      this.bud.features.enabled('css') ||
      this.bud.features.enabled('scss') ||
      this.bud.features.enabled('postcss') ||
      this.bud.features.enabled('scssModules') ||
      this.bud.features.enabled('cssModules')
    )
  },
})

export {miniCssExtract}