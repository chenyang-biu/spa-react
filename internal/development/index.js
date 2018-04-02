import http from 'http'
import path from 'path'
import webpack from 'webpack'
import express from 'express'
import openBrowser from 'openbrowser'
// import WebpackDevServer from 'webpack-dev-server'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfigFactory from '../webpack/configFactory'
import config from '../config'

const webpackConfig = webpackConfigFactory({
  target: 'client',
  mode: 'development',
})
const compiler = webpack(webpackConfig)

const app = express()

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    // quiet: true,
    publicPath: config.bundles.client.publicPath,
  }),
)

app.use(webpackHotMiddleware(compiler))
app.get('*', (request, response) => {
  response.sendFile(
    path.resolve(config.bundles.client.outputPath, 'index.html'),
  )
})

app.listen(config.port, '0.0.0.0')

http.get(
  {
    hostname: config.host,
    port: config.port,
    path: '/',
    agent: false,
  },
  () => openBrowser(`http://${config.host}:${config.port}`),
)
