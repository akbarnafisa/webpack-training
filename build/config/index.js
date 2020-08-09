const resolve = require('../utils/resolve')
const commonConfig = {
  host: '0.0.0.0',
  port: 8080,
  assetsRoot: resolve('dist'),
}
module.exports = {
  dev: {
    ...commonConfig,
    jsFilename: '[name].[hash].js',
    cssFilename: '[name].[hash].css',
  },
  prod: {
    ...commonConfig,
    jsFilename: '[name].[chunkhash].js',
    cssFilename: '[name].[contenthash].css',
  }
}