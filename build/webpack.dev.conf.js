
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
      rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        host: config.dev.host,
        port: config.dev.port,
        // proxy: config.dev.proxyTable,
        historyApiFallback: {
          rewrites: [
            { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'square.html') },
          ],
        },
        hot: true,
        contentBase: false,
        compress: true,
        open: true,
        quiet: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      // new HtmlWebpackPlugin({
      //   filename: 'index.html',
      //   template: 'src/client/pages/home/index.html',
      //   inject: true
      // }),
      new FriendlyErrorsPlugin()
    ].concat(utils.htmlPlugin())
})

module.exports = devWebpackConfig