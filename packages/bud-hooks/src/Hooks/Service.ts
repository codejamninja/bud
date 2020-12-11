import Contract from './Contract'
import {Service} from '@roots/bud-support'

/**
 * ## bud.hooks
 *
 * Bud provides a system of 'hooks' to expose values
 * for easier modification.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-hooks)
 * [🔗 Documentation](#)
 *
 * ### Usage
 *
 * ####  Add a new entry to the `webpack.externals` configuration:
 *
 * ```js
 * bud.hooks.on(
 *   'webpack.externals',
 *   externals => ({
 *     ...externals,
 *     $: 'jquery',
 *   }),
 * )
 * ```
 *
 * #### Change the `webpack.output.filename` format:
 *
 * ```js
 * bud.hooks.on(
 *   'webpack.output.filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 *
 * #### Replace the regular expression used for CSS modules:
 *
 * ```js
 * bud.hooks.on(
 *   'webpack.module.rules.oneOf.css.test',
 *   () => /\.css$/,
 * )
 * ```
 */
export default abstract class
  extends Service
  implements Contract {
  /**
   * ## Hooks.store [🏠 Internal]
   *
   * Hooks store.
   */
  protected store: Contract.Store = {}

  /**
   * ## bud.hooks.has
   *
   * Check if anything is hooked to a given name
   *
   * ### Usage
   *
   * ```js
   * bud.hooks.has('namespace.name.value')
   * // => `true` if there is a hook.
   * ```
   */
  public abstract has: Contract.Has

  /**
   * ## bud.hooks.on
   *
   * Register a function to filter a value being produced by Bud.
   *
   * If a filter calls for this name the function is then run,
   * passing whatever data along for modification. If more than one
   * hook is registered to a name, they will be called sequentially
   * in the order they were registered, with each hook's output used
   * as the input for the next.
   *
   * ### Usage
   *
   * ```js
   * bud.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   */
  public abstract on: Contract.On

  /**
   * ## bud.hooks.action
   *
   * Register a function to be executed during a specific bud lifecycle event.
   *
   * This function will have its `this` lexical context bound to the `bud`
   * object. You cannot use an arrow function.
   *
   * ### Usage
   *
   * ```js
   * bud.hooks.action(
   *   'namespace.name.event',
   *   function() {
   *     console.log(`${this} is bud`)
   *   },
   * )
   * ```
   */
  public abstract action: Contract.Action

  /**
   * ## bud.hooks.filter
   *
   * Make a value filterable by hooks.
   *
   * Provide the name of the hook and the initial value. If any
   * `bud.hooks.on` functions are "hooked" to the provided name, the
   * value will be passed through them before being returned to your
   * calling code.
   *
   * ### Usage
   *
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   */
  public abstract filter: Contract.Filter
}
