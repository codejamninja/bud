import type Framework from '@roots/bud-typings'
import * as builders from '../builders'
import {Item} from '../Item'
import {Rule} from '../Rule'

export type Configuration = Framework.Webpack.Configuration

/**
 * ## bud.build
 *
 * Webpack configuration builder for the @roots/bud framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export class Build implements Framework.Build.Contract {
  /** Bud reference [🏠 Internal] */
  public bud: Framework.Bud.Ref

  /**
   * ## bud.build.builders [🏠 Internal]
   *
   * Collection of functions processing loaders, items and rules
   * into a finalized webpack configuration.
   */
  public builders: Partial<Framework.Build.Builder> = builders

  /**
   * ## bud.build.loaders
   *
   * Container of available loaders.
   *
   * @see {webpack.Loader}
   */
  public loaders: Framework.Container

  /**
   * ## bud.build.items
   *
   * Container of available RuleSetRule['use'] items.
   *
   * @see {webpack.Configuration}
   */
  public items: Framework.Container

  /**
   * ## bud.build.rules
   *
   * Container of available RuleSetRules
   *
   * @see {webpack.Configuration}
   */
  public rules: Framework.Container

  /**
   * Constructor
   */
  public constructor(bud: Framework.Bud) {
    this.bud = bud.get

    this.loaders = bud.makeContainer()
    this.items = bud.makeContainer({})
    this.rules = bud.makeContainer({})
  }

  /**
   * ## bud.build.make
   *
   * Produce a final webpack config.
   */
  public make(): Configuration {
    const config = Object.entries(builders).reduce(
      (
        config,
        [, builder]: [
          string,
          (this: Framework.Bud) => Partial<Configuration>,
        ],
      ) => ({
        ...config,
        ...builder.bind(this.bud())(),
      }),
      {},
    )

    return this.filterEmpty(config)
  }

  /**
   * ### bud.build.filterEmpty [🏠 Internal]
   *
   * Filter rubbish config items.
   */
  public filterEmpty(
    object: Partial<Configuration>,
  ): Partial<Configuration> {
    return Object.entries(object).reduce((acc, [key, value]) => {
      return !value || value == {} ? acc : {...acc, [key]: value}
    }, {})
  }

  /**
   * ### bud.build.getLoader
   *
   * Get a loader from the store.
   */
  public getLoader(name: string): Framework.Loader {
    return this.loaders.get(name)
  }

  /**
   * ### bud.build.setLoader
   *
   * Set a loader to the store. Returns the set loader.
   */
  public setLoader(
    this: Build,
    name: string,
    loader: Framework.Loader,
  ): Framework.Loader {
    this.loaders.set(name, loader)

    return this.loaders.get(name)
  }

  /**
   * ### bud.build.getItem
   *
   * Get an item  from the store.
   */
  public getItem(name: string): Framework.Item.Contract {
    return this.items.get(name)
  }

  /**
   * ### bud.build.setItem
   *
   * Set an item to the store. Returns the set item.
   */
  public setItem(
    name: string,
    module: Framework.Item.Module,
  ): Framework.Item.Contract {
    this.items.set(name, new Item(this.bud(), module).make())

    return this.items.get(name)
  }

  /**
   * ### bud.build.getRule
   *
   * Get a rule from the store.
   */
  public getRule(name: string): Framework.Rule.Contract {
    return this.rules.get(name)
  }

  /**
   * ### bud.build.setRule
   *
   * Set a rule to the store. Returns the set rule.
   */
  public setRule(
    name: string,
    module: Framework.Rule.Module,
  ): Framework.Rule.Contract {
    this.rules.set(name, new Rule(this.bud(), module).make())

    return this.rules.get(name)
  }
}
