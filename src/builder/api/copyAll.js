import {join} from 'path'

/**
 * Copy all files from a specified source to a specified destination.
 * @example   bud.copyAll(bud.src('images'), bud.dist('images'))
 * @param     {string} src  - origin dir
 * @param     {string} dest - destination dir
 * @return    {typeof import('./../index')} bud
 */
const copyAll = function (src, dest) {
  this.options.copy.patterns.push({
    from: '**/*',
    context: src,
    to: dest ? dest : join(this.options.dist, src),
    globOptions: {
      ignore: '.*',
    },
    noErrorOnMissing: true,
  })

  return this
}

export {copyAll}