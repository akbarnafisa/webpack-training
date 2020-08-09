const CopyWebpackPlugin = require('copy-webpack-plugin')
const resolve = require('../utils/resolve')
const configBase = require('../config')

const isProd = process.env.NODE_ENV === 'production'
const config = isProd ? configBase.prod : configBase.dev

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')


const webpackBase = {
  entry: resolve('src/index.js'),
  output: {
    path: config.assetsRoot,
    filename: config.jsFilename,
    chunkFilename: config.jsFilename,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: config.cssFilename,
      chunkFilename: config.cssFilename,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less"],
  },
  optimization: {
    minimize: isProd,
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
          priority: 1,
        },
      },
    },
  },
}

module.exports = webpackBase;