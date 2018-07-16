在用 webpack 构建项目时需要使用到一些工具类来简化配置，例如 : 

* 打包时静态资源前缀路径的拼接

```js
// utils.js
// 若此时的 assetsSubDirectory 为 'static' 字符串
exports.assetsPath = function (_path) {
  var assetsSubDirectory = isProd ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// webpack.base.conf.js
utils.assetsPath('img/[name].[hash:7].[ext]')

// webpack.prod.conf.js
utils.assetsPath('css/app.[name].css')
utils.assetsPath('js/[name].[chunkhash].js')

// 最终 dist 目录类似于
dist
 └─static
 │   ├─css
 │   ├─img
 │   └─js
 │─ index.html

```

* 生成 cssLoaders 配置, 并在 vue-loader 中使用, 最终使得 .vue 文件中的 css 样式生效

````js

exports.cssLoaders = function (options) {
    options = options || {}
    
    // 编译 CSS
    var cssLoader = {
      loader: 'css-loader',
      options: {
        minimize: isProd,
        sourceMap: options.sourceMap
      }
    }
    // 使用 PostCSS
    var postcssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: options.sourceMap
      }
    }
    // 生成 loaders
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
      // 生产环境下将 CSS 文件抽离出来
      if (options.extract) {
        return [MiniCssExtractPlugin.loader].concat(loaders)
      } else {
        return ['vue-style-loader'].concat(loaders)
      }
    }
    // 选择指定的 loaders 组合, 这里我选择的是 stylus
    return {
      // css: generateLoaders(),
      // less: generateLoaders('less'),
      // sass: generateLoaders('sass', { indentedSyntax: true }),
      // scss: generateLoaders('sass'),
      stylus: generateLoaders('stylus'),
      // styl: generateLoaders('stylus')
    }
}

````

* 外联样式文件的打包

即不在 .vue 直接写样式而是单独在外联文件中书写时需要用到。

```js
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
```



