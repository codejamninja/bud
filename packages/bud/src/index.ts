import {framework} from '@roots/bud-framework'
import compiler from '@roots/bud-compiler'
import api from './api'
import {repositories} from './repositories'
import {config} from './config'
import express from 'express'
import {Use} from './repositories/uses'

import {Bud} from '@roots/bud-typings'

/**
 * Bind stores.
 */
repositories.stores.forEach(store => {
  framework.bind(store.name, store)
})

/**
 * Bind file stores.
 */
repositories.files.forEach(store => {
  framework.bindFiles(store.name, store)
})

/**
 * Bind stores.
 */
repositories.plugins.forEach(store => {
  framework.bindPlugins(store.name, store)
})

framework.apply('mode', framework.args.get('mode'))

framework.apply(
  'inProduction',
  framework.args.is('mode', 'production'),
)

framework.apply(
  'inDevelopment',
  framework.args.is('mode', 'development'),
)

framework.apply('hooks', framework.hooks(framework))
framework.apply('controller', framework.pluginController(framework))
framework.apply('fs', framework.util.fs)
framework.apply('format', framework.util.format)
framework.apply('config', config)
framework.apply('compiler', compiler)
framework.apply('server', express())

/**
 * Bind the public API.
 */
Object.values(api).forEach((method: () => any) => {
  framework.apply(method.name, method)
})

framework.configs.has('babel') &&
  framework.options.merge('babel', framework.configs.get('babel'))

framework.configs.has('postcss') &&
  framework.options.merge('postcss', framework.configs.get('postcss'))

/** Type achieved. */
const bud: Bud = framework

export type {Bud, Use}
module.exports = bud
