/**
 * This script builds a production output of all of our bundles.
 */

import webpack from 'webpack'
import webpackConfigFactory from '../webpack/configFactory'
import config from '../config'

// 预留 同构时 server 端的位置
Object.keys(config.bundles).forEach(bundleName => {
  const compiler = webpack(
    webpackConfigFactory({ target: bundleName, mode: 'production' }),
  )

  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      process.exitCode = process.exitCode || 1
      return
    }

    if (stats.hasErrors()) {
      process.exitCode = process.exitCode || 1
    }

    console.log(stats.toString({ colors: true }))
  })
})
