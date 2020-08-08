import {join, resolve} from 'path'
import adapter from './adapter'
import api from './api'
type BudPlugin = () => {make: () => void}

/**
 * Bud extension: Stylelint support.
 */
const stylelint: BudPlugin = () => ({
  make: function (this: any) {
    /**
     * Load .stylelintrc.js and bail early if not found.
     */
    const config = join(this.bud.project('stylelint.config.js'))
    if (!this.bud.fs.existsSync(config)) {
      return
    }

    /**
     * Set bud.stylelint API method.
     */
    this.bud.stylelint = api

    /**
     * Set stylelint to config container
     */
    this.bud.configs.set('stylelint', config)

    /**
     * Enable stylelint support
     */
    this.bud.features.set('stylelint', true)

    /**
     * Add stylelint webpack adapter
     */
    this.bud.adapters.add(adapter)
  },
})

const preset = {
  roots: resolve(__dirname, './preset/index.js'),
}

export {stylelint}
export {preset}