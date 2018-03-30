/* eslint-disable global-require, import/no-extraneous-dependencies */

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-short'),
    require('cssnano')({
      preset: [
        'advanced',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
}
