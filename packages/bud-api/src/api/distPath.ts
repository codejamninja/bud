import type {Bud} from '@roots/bud-typings'

export const distPath: DistPath = function (segment) {
  /** Bounce early if dist is overwritten from CLI */
  if (this.args.isString('dist')) return this

  this.config.set('output.path', this.project(segment))

  return this
}

export type DistPath<T = Bud> = (this: T, segment: string) => T
