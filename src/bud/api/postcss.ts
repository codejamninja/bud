import type {Bud, PostCss} from './types'

/**
 * ## bud.postCss
 *
 * Configure PostCSS.
 *
 * If you prefer, you may utilize a postcss.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * ```js
 * bud.postCss({
 *   plugins: [
 *    require('astroturf'),
 *   ],
 * })
 * ```
 */
const postCss: PostCss = function ({
  enabled = true,
  ...options
}): Bud {
  this.state.features.postCss = enabled

  if (this.state.features.postCss) {
    this.state.options.postCss = {
      ...this.state.options.postCss,
      ...options,
    }
  }

  return this
}

export {postCss}