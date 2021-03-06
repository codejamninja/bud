import type {Bud, Factory, Rule} from '@roots/bud-typings'

export const test: Sass.Conditional = ({patterns}) =>
  patterns.get('sass')

export const exclude: Sass.Exclude = ({patterns}) =>
  patterns.get('modules')

export const use: Factory<Rule.Use> = (bud: Bud) => [
  bud.mode.is('production')
    ? bud.build.items.get('mini-css')
    : bud.build.items.get('style'),
  bud.build.items.get('css'),
  bud.build.items.get('postcss'),
  bud.build.items.get('sass'),
  bud.build.items.get('resolve-url'),
]
