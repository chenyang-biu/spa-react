import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'
import { resolve as pathResolve } from 'path'
import { merge, compact } from 'lodash'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { happypackPlugin, ifElse } from '../utils'
import getLessLoaders from './getLessLoader'
import config from '../config'

// * webpack v4 已经做了 一大堆优化 代码压缩 分割(移除空的) chunk 重复包的查找 之类的
// * @see https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a

export default function webpackConfigFactory({
  target = 'client',
  mode = 'development',
}) {
  const isDev = mode === 'development'
  const isProd = !isDev

  const ifDev = ifElse(isDev)
  const ifClient = ifElse(target === 'client')
  const ifProd = ifElse(isProd)
  const stylePath = pathResolve(config.bundles.client.appPath, 'styles')

  const webpackConfig = {
    mode,
    entry: {
      index: [
        'babel-polyfill',
        'react-hot-loader/patch',
        `webpack-hot-middleware/client?path=http://localhost:${
          config.port
        }/__webpack_hmr`,
        config.bundles.client.entryPath,
      ],
    },
    output: {
      path: config.bundles.client.outputPath,
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: config.bundles.client.publicPath,
    },
    module: {
      rules: compact([
        {
          test: /\.jsx?$/,
          use: 'happypack/loader?id=happypack-javascript',
          include: config.bundles.client.appPath,
        },

        merge(
          {
            test: /\.css$/,
            include: config.bundles.client.appPath,
          },
          ifDev(() => ({ use: 'happypack/loader?id=happypack-css' })),
          ifProd(() => ({
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true,
                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  },
                },
                'postcss-loader',
              ],
            }),
          })),
        ),

        {
          test: /\.less$/,
          include: [config.bundles.client.appPath],
          exclude: [stylePath, /node_modules/],
          use: 'happypack/loader?id=happypack-less',
        },

        {
          test: /\.less$/,
          // ant-design 不能走 css-loader 的 module
          include: [stylePath, /antd/],
          use: 'happypack/loader?id=happypack-less-antd',
        },

        {
          test: /\.svg(\?.*)?$/,
          include: config.bundles.client.appPath,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                mimetype: 'image/svg+xml',
              },
            },
          ],
        },
        {
          test: /\.woff(\?.*)?$/,
          exclude: '/node_modules/',
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                mimetype: 'application/font-woff',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          exclude: '/node_modules/',
          loader: 'url-loader',
          options: {
            limit: '10240',
          },
        },
      ]),
    },

    plugins: compact([
      new webpack.EnvironmentPlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),

      happypackPlugin({
        id: 'happypack-javascript',
        loaders: ['babel-loader', 'eslint-loader'],
      }),

      happypackPlugin({
        id: 'happypack-less',
        loaders: getLessLoaders({ cssModules: true }),
      }),

      happypackPlugin({
        id: 'happypack-less-antd',
        loaders: getLessLoaders({ cssModules: false }),
      }),

      happypackPlugin({
        id: 'happypack-css',
        loaders: [
          'postcss-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
            },
          },
        ],
      }),

      ifProd(
        () =>
          new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            allChunks: true,
          }),
      ),

      ...ifDev(
        () => [
          new webpack.NoEmitOnErrorsPlugin(),
          new webpack.HotModuleReplacementPlugin({
            multiStep: true,
          }),
        ],
        [],
      ),
      new AssetsPlugin({
        filename: config.bundleAssetsFileName,
        path: config.bundles.client.outputPath,
      }),
      new HtmlWebpackPlugin({
        title: config.html.title,
        template: 'src/template.html',
        minify: true,
      }),
    ]),

    target: ifClient('web', 'node'),
    performance: {
      hints: isDev ? false : 'warning',
    },
    devtool: ifDev('source-map', 'hidden-source-map'),
    externals: config.externals,
    resolve: {
      modules: [config.bundles.client.appPath, 'node_modules'],
      extensions: ['.js', '.jsx', '.json', '.less'],
    },
  }

  if (isDev) {
    webpackConfig.devServer = {
      hot: true,
      // hotOnly: true,
      stats: 'errors-only',
    }
  }
  return webpackConfig
}
