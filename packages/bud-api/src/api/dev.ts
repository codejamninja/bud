import Server from '@roots/bud-server'

export const dev: Framework.API.Dev = function (
  this: Framework.Bud,
  config: Server.Config,
) {
  if (config?.proxy?.host || config?.proxy?.port) {
    this.features.enable('proxy')
  }

  this.server.config.repository = {
    ...this.server.config.all(),
    ...config,
  }

  return this
}