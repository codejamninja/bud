import {Bud} from '@roots/bud-typings'

export const target: Target = function (target) {
  this.config.set('target', target)

  return this
}

export type Target<T = Bud> = (this: T, target: string) => T
