import path from 'path'
import webpack from 'webpack'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin = require('html-webpack-plugin')
import CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')

export const src = path.join(__dirname, 'src')
export const build = path.join(__dirname, 'build')

const config: webpack.Configuration = {
  entry: {
    contentscript: path.join(__dirname, 'src/contentscript/contentscript.ts'),
    background: path.join(__dirname, 'src/background/background.ts'),
    popup: path.join(__dirname, 'src/popup/index.tsx')
  },
  output: {
    path: build,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf|png|jpg|jpeg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'popup.html'),
      inject: 'body',
      filename: 'popup.html',
      title: "Brows'ear",
      chunks: ['popup']
    }),
    new CspHtmlWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(src, 'assets'),
        to: path.join(build, 'assets'),
        test: /\.(jpg|jpeg|png|gif|svg)?$/
      }
    ])
  ]
}

export default config
