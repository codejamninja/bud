/**
 * ## bud.dashboard
 *
 * Enable or disable Bud's CLI build output.
 *
 * ## Example
 *
 * ```js
 * bud.dashboard(false) // disable dashboard
 * ```
 *
 * @param   {boolean} enabled - true to enable debug mode
 * @return  {typeof import('./../index')} bud
 */
const dashboard = function (enabled) {
  this.features.dashboard = enabled
  return this
}

export {dashboard}