import {join} from 'path'
import {Api} from '@roots/bud-typings'

const dist: Api.Dist = function (path?: string) {
  return path
    ? join(this.paths.get('dist'), path)
    : this.paths.get('dist')
}

export {dist}