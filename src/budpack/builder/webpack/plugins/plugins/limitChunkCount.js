import {LimitChunkCountPlugin} from 'webpack'

const limitChunkCount = () => ({
  setOptions: function () {
    const enabled = this.bud.features.splitting
    const chunks = this.bud.options.splitting.maxChunks

    if (!enabled) {
      return {
        maxChunks: 1,
      }
    }

    if (chunks) {
      return {
        maxChunks: chunks,
      }
    }
  },
  make: function () {
    return new LimitChunkCountPlugin(this.options)
  },
  when: function () {
    return this.options
  },
})

export {limitChunkCount}
