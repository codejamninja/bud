import type {
  Bud,
  Extension,
  Item,
  Loader,
  Rule,
} from '@roots/bud-typings'

import * as rule from './rules'
import * as item from './items'

export const registerItem: Extension.RegisterOne<Item.Module> = [
  'sass',
  item,
]

export const registerRule: Extension.RegisterOne<Rule.Module> = [
  'sass',
  rule,
]
export const registerLoader: Extension.RegisterOne<Loader> = [
  'sass-loader',
  require.resolve('sass-loader'),
]

export const boot: Extension.Boot = (bud: Bud): void => {
  /**
   * Resolve sass and scss extensions
   */
  ;['sass', 'scss'].forEach(ext => {
    !bud.config.get('resolve.extensions').includes(ext) &&
      bud.config.merge('resolve.extensions', [`.${ext}`])
  })
}
