import webpack from 'webpack'
import express from 'express'
import Debug from 'debug'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfigFactory from '../webpack/configFactory'
import config from '../config'

const compiler = webpack(
  webpackConfigFactory({ target: 'web', mode: 'development' }),
)
const debug = new Debug('http')

const app = express()

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.bundle.publicPath,
  }),
)

app.use(webpackHotMiddleware(compiler))

app.listen(config.port, '0.0.0.0', () => {
  debug(`Dev Server is listening on http://localhost:${config.port}`)
})
