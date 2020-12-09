import {Bud, Webpack} from '@roots/bud-typings'

export type Entry = Webpack.Configuration['entry']

export namespace Entry {
  export type Build = (this: Bud) => {entry: Entry}
}

export const entry: Entry.Build = function () {
  return {
    entry: this.hooks.filter<Entry>(
      'webpack.entry',
      this.config.get('entry'),
    ),
  }
}
