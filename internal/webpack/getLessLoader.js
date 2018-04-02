import config from '../config'

export default function getLessLoaders({ cssModules = true, isProd }) {
  if (isProd) {
    return [
      {
        loader: 'css-loader',
        options: {
          modules: cssModules,
          minimize: true,
          sourceMap: true,
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          javascriptEnabled: true,
          modifyVars: config.bundles.client.appTheme,
        },
      },
    ]
  }

  return [
    {
      loader: 'style-loader',
      sourceMap: true,
    },
    {
      loader: 'css-loader',
      options: {
        modules: cssModules,
        sourceMap: true,
        importLoaders: 1,
        localIdentName: '[name]__[local]--[hash:base64:5]',
      },
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: true,
        javascriptEnabled: true,
        modifyVars: config.bundles.client.appTheme,
      },
    },
  ]
}
