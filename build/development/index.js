import http from 'http'
import webpack from 'webpack'
import express from 'express'
import openBrowser from 'openbrowser'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfigFactory from '../webpack/configFactory'
import config from '../config'

const compiler = webpack(
  webpackConfigFactory({ target: 'client', mode: 'development' }),
)

const app = express()

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.bundles.client.publicPath,
  }),
)

app.use(webpackHotMiddleware(compiler))

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
