import path from 'path';
import webpack from 'webpack';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin = require('html-webpack-plugin')

const src = path.join(__dirname, 'src')
const build = path.join(__dirname, 'build')

const config: webpack.Configuration = {
  entry: {
    contentscript: path.join(__dirname, 'src/contentscript/contentscript.ts'),
    background: path.join(__dirname, 'src/background/background.ts'),
    popup: path.join(__dirname, 'src/popup/index.tsx')
  },
  output: {
    path: build,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'popup.html'),
      inject: 'body',
      filename: 'popup.html',
      title: 'React TS Starter',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(src, 'assets'),
        to: path.join(build, 'assets'),
        test: /\.(jpg|jpeg|png|gif|svg)?$/,
      },
      {
        from: path.join(path.resolve(src, '..'), 'manifest.json'),
        to: path.join(build, 'manifest.json'),
        toType: 'file',
      }
    ])
  ]
};

export default config;
