import {loaders} from '../util/loaders'
import { bud } from '../../../bud'

/**
 * Typescript
 * @type {function}
 */
const typescript = bud => ({
  bud,
  output: {},
  enabled: bud.state.configs.typescript,
  loader: loaders.ts,
  options: {
    configFile: bud.state.configs.typescript,
  },

  /**
   * Make typescript rules.
   */
  make: function () {
    this.pre()

    this.output = this.enabled
      ? {
          loader: this.loader,
          options: this.options,
        }
      : null

    this.post()

    return this.output
  },

  /**
   * Hook: pre_typescript
   */
  pre: function () {
    this.bud.hooks.call('pre_typescript', this)
  },

  /**
   * Hook: post_typescript
   */
  post: function () {
    this.bud.hooks.call(
      'post_typescript',
      this.output,
    )
  },
})

export {typescript}