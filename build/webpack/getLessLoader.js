import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'
import { ifElse } from '../utils'

export default function getLessLoaders({ cssModules = true, isProd }) {
  if (isProd) {
    return ifElse(isProd)(() => ({
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: cssModules,
              minimize: true,
              sourceMap: false,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: config.bundles.client.appTheme,
            },
          },
        ],
      }),
    }))
  }

  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: cssModules,
        sourceMap: true,
        importLoaders: 1,
      },
    },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
        modifyVars: config.bundles.client.appTheme,
      },
    },
  ]
}
