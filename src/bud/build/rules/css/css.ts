import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import {postCss} from '../use/postCss'
import {resolveUrl} from '../use/resolveUrl'

/**
 * Css
 * @return {object}
 */
const css = bud => ({
  bud,
  test: patterns.css,
  sourceMap: bud.featureEnabled('map'),

  make: function () {
    this.use = [
      loaders.miniCss(this.bud.featureEnabled('hot')),
      loaders.css,
      resolveUrl(this.bud).make(),
    ]

    if (this.bud.featureEnabled('postCss')) {
      this.use.push({...postCss(this.bud).make()})
    }

    this.bud.hooks.call('pre_css', this)
    this.output = {
      test: this.test,
      use: this.use,
    }

    this.bud.hooks.call('post_css', {
      output: this.output,
    })

    return this.output
  },
})

export {css}