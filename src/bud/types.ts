import type {Configuration} from 'webpack'
import type {Hooks} from './hooks/types'
import type {Plugin} from './plugin/types'
import type {State} from './state/types'
import type {Util} from './util/types'
import type {
  Alias,
  Auto,
  Babel,
  Bundle,
  Copy,
  Debug,
  DependencyManifest,
  Dev,
  Devtool,
  Src,
  SrcPath,
  Sync,
  Vendor,
  Watch,
} from './api/types'

export declare type Mode = Configuration['mode']
export declare type Production = boolean
export declare type Bud = {
  hooks: Hooks
  util: Util
  plugin: Plugin
  mode: Mode
  state: State | undefined
  alias: Alias
  auto: Auto
  babel: Babel
  bundle: Bundle
  copy: Copy
  copyAll: Copy
  debug: Debug
  dependencyManifest: DependencyManifest
  dev: Dev
  devtool: Devtool
  src: Src
  srcPath: SrcPath
  sync: Sync
  vendor: Vendor
  watch: Watch
}