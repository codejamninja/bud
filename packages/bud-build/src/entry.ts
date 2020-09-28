import Bud from '@roots/bud-types'

const entry: Bud.Build.Entry = function (this: Bud) {
  return this.hooks.filter('webpack.entry', {
    entry: this.options.get('webpack.entry'),
  })
}

export {entry as default}
