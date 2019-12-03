import { optimize } from 'webpack'
import merge from 'webpack-merge'
import common, { build, src } from './webpack.common'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'

export default merge.smart(common, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(path.resolve(src, '..'), 'manifest.json'),
        to: path.join(build, 'manifest.json'),
        toType: 'file',
        transform(content) {
          const manifest = JSON.parse((content as unknown) as string)
          manifest.content_security_policy = (manifest.content_security_policy as string).replace(
            'ws://localhost:* ',
            ''
          )
          return Buffer.from(JSON.stringify(manifest))
        }
      }
    ]),
    new optimize.AggressiveMergingPlugin(),
    new optimize.OccurrenceOrderPlugin(true)
  ]
})
