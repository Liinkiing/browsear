import merge from 'webpack-merge'
import path from "path"
import common from './webpack.common'
const ExtensionReloader  = require('webpack-extension-reloader');

export default merge.smart(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    popup: ['react-devtools', path.join(__dirname, 'src/popup/index.tsx')]
  },
  plugins: [
  new ExtensionReloader({
    manifest: path.resolve(__dirname, "manifest.json"),
    entries: {
      contentScript: 'contentscript',
      reloadPage: true,
      background: 'background',
      extensionPage: 'popup',
    }
  })]
});
