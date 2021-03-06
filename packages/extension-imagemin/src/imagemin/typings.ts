import type {Plugin as ImageminPlugin} from 'imagemin'
import type {Extension, Bud} from '@roots/bud-typings'

export namespace Imagemin {
  /**
   * Plugin class.
   */
  export type Plugin = ImageminPlugin

  /**
   * Plugin options.
   */
  export type Options = {
    minimizerOptions: Options.MinimizerOptions
  }

  /**
   * Plugin options
   */
  export namespace Options {
    /**
     * minimizeroptions.plugins
     */
    export type Plugins = Array<[string, {[key: string]: any}]>

    /**
     * minimizeroptions
     */
    export type MinimizerOptions = {
      [key: string]: any

      plugins: Plugins
    }
  }

  /**
   * Make.
   */
  export type Make = Extension.Module.Make<
    Plugin,
    Options.MinimizerOptions
  >

  /**
   * Conditional.
   */
  export type When = Extension.Module.When

  /**
   * Configuration API.
   */
  export declare type Config = (
    this: Bud,
    enabled: boolean,
  ) => Bud

  export declare type ConfigOption = (
    this: Bud,
    key: string,
    value: unknown,
  ) => Bud

  export declare type ConfigOptions = (
    this: Bud,
    options?: Options.MinimizerOptions,
  ) => Bud

  export declare type ConfigPlugins = (
    this: Bud,
    plugins?: Options.Plugins,
  ) => Bud
}
