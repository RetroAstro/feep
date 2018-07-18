
const path = require('path')
const glob = require('glob')
const config = require('../config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

const pagePath = path.resolve(__dirname, '../src/client/pages')

exports.entries = function () {
  var entriyFiles = glob.sync(pagePath + '/*/*.js')
  var map = {}
  entriyFiles.forEach( filePath => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
  })
  return map
}

exports.htmlPlugin = function () {
  var entryHtmls = glob.sync(pagePath + '/*/*.html')
  var arr = []
  entryHtmls.forEach( filePath => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    var config = {
      template: filePath,
      filename: filename + '.html',
      chunks: ['manifest', 'vendor', filename],
      inject: true,
      chunksSortMode: 'dependency'
    }
    if (isProd) {
      config = merge(config, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      })
    }
    arr.push(new HtmlWebpackPlugin(config))
  })
  return arr
}

exports.assetsPath = function (_path) {
  var assetsSubDirectory = isProd ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}
  
    var cssLoader = {
      loader: 'css-loader',
      options: {
        minimize: isProd,
        sourceMap: options.sourceMap
      }
    }

    var postcssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: options.sourceMap
      }
    }

    function generateLoaders (loader, loaderOptions) {
      var loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
      if (loader) {
        loaders.push({
          loader: loader + '-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap: options.sourceMap
          })
        })
      }
  
      if (options.extract) {
        return [MiniCssExtractPlugin.loader].concat(loaders)
      } else {
        return ['vue-style-loader'].concat(loaders)
      }
    }

    return {
      // css: generateLoaders(),
      // less: generateLoaders('less'),
      // sass: generateLoaders('sass', { indentedSyntax: true }),
      // scss: generateLoaders('sass'),
      stylus: generateLoaders('stylus'),
      // styl: generateLoaders('stylus')
    }
}

exports.styleLoaders = function (options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
      var loader = loaders[extension]
      output.push({
        test: new RegExp('\\.' + extension + '$'),
        use: loader
      })
    }
    return output
}