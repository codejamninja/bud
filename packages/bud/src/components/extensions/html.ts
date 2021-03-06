import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Bud, Extension} from '@roots/bud-typings'

export const options: HtmlWebpackPlugin.Options = ({fs}) => ({
  alwaysWriteToDisk: true,
  base: fs.baseDir,
  publicPath: '/',
  template: fs.path.join(
    fs.path.dirname(require.resolve('@roots/bud-support')),
    '/../publish/template.html',
  ),
})

export const make: Extension.Module.Make = (
  opts,
  {config}: Bud,
) =>
  new HtmlWebpackPlugin({
    ...opts.all(),
    publicPath: config.get('output.publicPath'),
  })

export const when: Extension.Module.When = ({features}) =>
  features.enabled('html')
