/**
 * Enable or disable hot module reloading
 * @example bud.hot(true) // enable HMR
 * @typedef {function (enabled: {boolean}) => {bud: typeof import('./../index')}} hot
 * @param   {boolean} enabled - true to enable hot module reloading. default: !bud.inProduction.
 * @return  {typeof import('./../index')} bud
 */
const hot = enabled => {
  this.features.hot = enabled

  return this
}

export {hot}