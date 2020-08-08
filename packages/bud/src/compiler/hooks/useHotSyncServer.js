import {useState, useEffect} from 'react'
import browserSyncLibrary from 'browser-sync'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const browserSync = browserSyncLibrary.create()

const makeMiddleware = (bud, setDevStats) => {
  const devMiddlewareOptions = {
    headers: bud.options.get('dev').headers,
    logger: bud.logger,
    loglevel: 'trace',
    publicPath: bud.paths.get('public'),
    writeToDisk: false,
    reload: false,
    reporter: (middlewareOptions, reporterOptions) => {
      reporterOptions?.stats &&
        setDevStats(
          reporterOptions.stats.toJson({
            version: true,
            hash: true,
            time: true,
            assets: true,
            errors: true,
            warnings: true,
            chunks: false,
            modules: false,
            entrypoints: false,
            assetsByChunkName: false,
            logging: false,
            children: false,
            namedChunkGroups: false,
          }),
        )
    },
  }

  bud.logger.info(
    {name: 'bud.compiler', options: devMiddlewareOptions},
    'making dev server middleware from options',
  )

  const devMiddleware = webpackDevMiddleware(bud.compiler, devMiddlewareOptions)
  const hotMiddleware = webpackHotMiddleware(bud.compiler, {
    reload: false,
    heartbeat: 2000,
  })

  return [devMiddleware, hotMiddleware]
}

const useHotSyncServer = bud => {
  const [hot] = useState(bud.features.enabled('hot'))
  const [target] = useState(bud.options.get('dev').host)
  const [open] = useState(bud.options.get('dev').open)
  const [files] = useState(bud.options.get('watch'))
  const [hotSyncServer, setHotSyncServer] = useState(null)
  const [devStats, setDevStats] = useState(null)

  useEffect(() => {
    if (!hotSyncServer && hot) {
      const options = {
        hot,
        proxy: {
          target,
          ws: true,
        },
        logLevel: 'silent',
        reload: false,
        reloadOnRestart: false,
        open,
        middleware: makeMiddleware(bud, setDevStats),
        injectChanges: true,
        injectFileTypes: ['js', 'scss', 'css', 'vue', 'jsx', 'ts', 'tsx'],
        watchOptions: {
          ignoreInitial: false,
        },
        files,
      }

      setHotSyncServer(browserSync.init(options))

      bud.logger.info(
        {name: 'bud.compiler', options, hot},
        'using browserSync as hot sync server',
      )
    }
  }, [hotSyncServer, setHotSyncServer, hot, open, files, target])

  useEffect(() => {
    hotSyncServer &&
      bud.logger.info({name: 'bud.compiler'}, 'hot sync server initialized')
  }, [hotSyncServer])

  return [hotSyncServer, devStats]
}

export {useHotSyncServer}