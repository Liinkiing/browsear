import merge from 'webpack-merge'
import path from 'path'
import common, { build, src } from './webpack.common'
import CopyWebpackPlugin from 'copy-webpack-plugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ExtensionReloader = require('webpack-extension-reloader')

export default merge.smart(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    popup: ['react-devtools', path.join(__dirname, 'src/popup/index.tsx')]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(path.resolve(src, '..'), 'manifest.json'),
        to: path.join(build, 'manifest.json'),
        toType: 'file'
      }
    ]),
    new ExtensionReloader({
      manifest: path.resolve(__dirname, 'manifest.json'),
      entries: {
        contentScript: 'contentscript',
        reloadPage: true,
        background: 'background',
        extensionPage: 'popup'
      }
    })
  ]
})
