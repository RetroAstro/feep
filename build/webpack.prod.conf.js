
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    performance: {
      hints: false
    },
    module: {
      rules: utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    optimization: {
      runtimeChunk: {
        name: 'manifest'
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: config.build.productionSourceMap,
          uglifyOptions: {
            warnings: false
          }
        }),
        new OptimizeCSSPlugin({
          cssProcessorOptions: config.build.productionSourceMap
            ? { safe: true, map: { inline: false } }
            : { safe: true }
        }),
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            priority: -10,
            reuseExistingChunk: false,
            test: /node_modules\/(.*)\.js/
          }
        }
      }
    },
    plugins: [

      new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/app.[name].css'),
        chunkFilename: utils.assetsPath('css/app.[contenthash:12].css')
      }),

      new HtmlWebpackPlugin({
        filename: config.build.index,
        template: 'src/client/pages/home/index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyCSS: true,
          minifyJS: true
        },
        chunksSortMode: 'dependency'
      }),

      // make your codes run faster on browsers ...
      new webpack.optimize.ModuleConcatenationPlugin(),

      // keep module.id stable when vendor modules does not change
      new webpack.HashedModuleIdsPlugin(),
  
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: config.build.assetsSubDirectory,
          ignore: ['.*']
        }
      ])
    ]
  })
  
  if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
  
    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.build.productionGzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }
  
  if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }

  module.exports = webpackConfig
