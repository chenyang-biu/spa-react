import { resolve as pathResolve } from 'path'
const pathFactory = path => pathResolve(__dirname, '../../', path)

const ENTRY_PATH = pathFactory('./src/main.js')
const OUTPUT_PATH = pathFactory('./dist')
const APP_PATH = pathFactory('./src')
const TEMPLATE_PATH = pathFactory('./src', 'template.html')
const APP_THEME = {
  'primary-color': '#53a733',
  '@primary-1': '#f1f8ef',
  'link-color': '#53a733',
  'font-size-base': '14px',
  'animation-duration-slow': '.2s',
  'animation-duration-base': '.1s',
  'animation-duration-fast': '.05s',
}

export default {
  bundles: {
    client: {
      appPath: APP_PATH,
      entryPath: ENTRY_PATH,
      outputPath: OUTPUT_PATH,
      publicPath: process.env.ASSET_PATH || '/',
      appTheme: APP_THEME,
    },
  },
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 2333,
  html: {
    title: 'XXXXX',
    template: TEMPLATE_PATH,
  },
  bundleAssetsFileName: 'assets.json',
  // CDN, moment,
  externals: [],
}
