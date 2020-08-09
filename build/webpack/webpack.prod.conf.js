const { merge } = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const config = require('../config').dev
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const webpackDev = {
  mode: 'production',
  performance: {
    hints: 'error'
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8082,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      PUBLIC_URL: '/public'
    }),
  ],
}

module.exports = merge(base, webpackDev);