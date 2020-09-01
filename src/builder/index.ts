/** Constructor props */
import {mode, inProduction} from './base/mode'
import {configs} from './base/configs'
import {features} from './base/features'
import {hooks} from './base/hooks'
import {options} from './base/options'
import {paths} from './base/paths'
import {webpackPlugins} from './base/webpackPlugins'

/** Prototypal methods */
import {alias} from './api/alias'
import {auto} from './api/auto'
import {babel} from './api/babel'
import {bundle} from './api/bundle'
import {copy} from './api/copy'
import {copyAll} from './api/copyAll'
import {dashboard} from './api/dashboard'
import {debug} from './api/debug'
import {dev} from './api/dev'
import {devtool} from './api/devtool'
import {dist} from './api/dist'
import {distPath} from './api/distPath'
import {dependencyManifest} from './api/dependencyManifest'
import {dump} from './api/dump'
import {env} from './api/env'
import {hash} from './api/hash'
import {hot} from './api/hot'
import {inlineManifest} from './api/inlineManifest'
import {map} from './api/map'
import {mini} from './api/mini'
import {postCss} from './api/postcss'
import {preset} from './api/preset'
import {project} from './api/project'
import {projectPath} from './api/projectPath'
import {publicPath} from './api/publicPath'
import {purge} from './api/purge'
import {register} from './api/register'
import {setEnv} from './api/setEnv'
import {src} from './api/src'
import {srcPath} from './api/srcPath'
import {sync} from './api/sync'
import {target} from './api/target'
import {translate} from './api/translate'
import {vendor} from './api/vendor'
import {watch} from './api/watch'

const Bud = function () {
  this.hooks = hooks
  this.configs = configs
  this.features = features
  this.mode = mode
  this.inProduction = inProduction
  this.options = options
  this.paths = paths
  this.webpackPlugins = webpackPlugins
}

Bud.prototype.alias = alias
Bud.prototype.auto = auto
Bud.prototype.babel = babel
Bud.prototype.bundle = bundle
Bud.prototype.copy = copy
Bud.prototype.copyAll = copyAll
Bud.prototype.dashboard = dashboard
Bud.prototype.debug = debug
Bud.prototype.dependencyManifest = dependencyManifest
Bud.prototype.dev = dev
Bud.prototype.devtool = devtool
Bud.prototype.dist = dist
Bud.prototype.distPath = distPath
Bud.prototype.dump = dump
Bud.prototype.env = env
Bud.prototype.hash = hash
Bud.prototype.hot = hot
Bud.prototype.inlineManifest = inlineManifest
Bud.prototype.map = map
Bud.prototype.mini = mini
Bud.prototype.postCss = postCss
Bud.prototype.preset = preset
Bud.prototype.project = project
Bud.prototype.projectPath = projectPath
Bud.prototype.publicPath = publicPath
Bud.prototype.purge = purge
Bud.prototype.register = register
Bud.prototype.setEnv = setEnv
Bud.prototype.src = src
Bud.prototype.srcPath = srcPath
Bud.prototype.sync = sync
Bud.prototype.targete = target
Bud.prototype.translate = translate
Bud.prototype.vendor = vendor
Bud.prototype.watch = watch

/**
 * Bud - Asset management framework
 */
module.exports = new Bud()

/**
 * Typings
 */
import type {Configs} from './base/configs'
import type {Hooks} from './base/hooks'
import type {
  WebpackAdapterTuple,
  WebpackPluginAdapter,
} from './base/webpackPlugins'

import type {InlineManifest} from './api/inlineManifest'
import type {Map} from './api/map'
import type {Register} from './api/register'

export type {
  Hooks,
  WebpackAdapterTuple,
  WebpackPluginAdapter,
}

export type bud = {
  configs: Configs
  features: typeof features
  inProduction: boolean
  mode: string
  options: typeof options
  hooks: Hooks
  paths: typeof paths
  alias: typeof alias
  auto: typeof auto
  babel: typeof babel
  bundle: typeof bundle
  copy: typeof copy
  copyAll: typeof copyAll
  dashboard: typeof dashboard
  debug: typeof debug
  dependencyManifest: typeof dependencyManifest
  dev: typeof dev
  devtool: typeof devtool
  dist: typeof dist
  distPath: typeof distPath
  dump: typeof dump
  env: typeof env
  hash: typeof hash
  hot: typeof hot
  inlineManifest: InlineManifest
  map: Map
  mini: typeof mini
  plugins: any
  postCss: typeof postCss
  preset: typeof preset
  project: typeof project
  projectPath: typeof projectPath
  publicPath: typeof publicPath
  purge: typeof purge
  register: Register
  setEnv: typeof setEnv
  src: typeof src
  srcPath: typeof srcPath
  sync: typeof sync
  target: typeof target
  translate: typeof translate
  vendor: typeof vendor
  watch: typeof watch
}

export type BudConstructor = (bud: bud) => any