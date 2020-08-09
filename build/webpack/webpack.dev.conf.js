const { merge } = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const config = require('../config').dev
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackDev = {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      PUBLIC_URL: '/public'
    }),
  ],
  devServer: {
    contentBase: './dist',
    host: config.host,
    port: config.port,
    hot: true,
  }
}

module.exports = merge(base, webpackDev);