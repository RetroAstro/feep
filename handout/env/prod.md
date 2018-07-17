生产环境下我们需要进行很多的操作来尽量优化我们打包后的代码, 而常见的配置有 : 

* performance

配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。 

```js
  performance: {
    // 有 false | 'error' | 'warning' 三个选项
    hints: 'warning',
    // 入口文件的最大体积 (300kb)
    maxEntrypointSize: 500000,
    // 打包后的文件大小若超过 300kb, 即会触发 hints 性能提示
    maxAssetSize: 500000
  },
```

* Long-term caching

给静态文件一个很长的缓存过期时间，比如一年。然后在给文件名里加上一个 hash，每次构建时，当文件内容改变时，文件名中的 hash 也会改变。浏览器在根据文件名作为文件的标识，所以当 hash 改变时，浏览器就会重新加载这个文件。 

```js
output: {
  path: config.build.assetsRoot,
  filename: utils.assetsPath('js/[name].[chunkhash].js'),
  chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
}
```

* Code Splitting

Code Splitting 一般需要做这些事情

1. 为 Vendor 单独打包（Vendor 指第三方的库或者公共的基础组件，因为 Vendor 的变化比较少，单独打包利于缓存）
2. 为 Manifest （Webpack 的 Runtime 代码）单独打包
3. 为不同入口的公共业务代码打包（同理，也是为了缓存和加载速度）
4. 为异步加载的代码打一个公共的包

常见的配置 : 

```js

optimization: {
    // 打包 Runtime 代码
    runtimeChunk: {
        name: 'manifest'
    },
    minimizer: [
        // 替代 `uglifyjs-webpack-plugin`, 并行运行 UglifyJS 插件, 有效减少构建时间
        new ParallelUglifyPlugin({
          cacheDir: '.cache/',
          uglifyJS: {
            output: {
              comments: false,
              beautify: false
            },
            compress: {
              warnings: false,
              drop_console: true,
              collapse_vars: true,
              reduce_vars: true
            }
          }
        }),
        // 压缩抽离后的 CSS 代码
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
            ? { safe: true, map: { inline: false } }
            : { safe: true }
        }),
    ],
    // Webpack 4 中的代码分割
    splitChunks: {
        // chunks: "initial"，"async"和"all"分别是：初始块，按需块或所有块
        chunks: 'async',
        // （默认值：30000）块的最小大小
        minSize: 30000,
        // （默认值：1）分割前共享模块的最小块数
        minChunks: 1,
        // （缺省值5）按需加载时的最大并行请求数
        maxAsyncRequests: 5,
        // （默认值3）入口点上的最大并行请求数
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
            // 将从 node_modules 中引入的模块打包为一个文件
            vendor: {
                name: 'vendor',
                chunks: 'initial',
                priority: -10,
                reuseExistingChunk: false,
                test: /node_modules\/(.*)\.js/
            }
        }
    }
}

```

* plugins 中的增加项

1. `mini-css-extract-plugin `

```js
// 替换 ExtractTextPlugin, 用于打包时抽离 CSS
new MiniCssExtractPlugin({
    filename: utils.assetsPath('css/app.[name].css'),
    chunkFilename: utils.assetsPath('css/app.[contenthash:12].css')
})
```

2. `html-webpack-plugin `

```js
// 配置 html 模板文件入口信息
new HtmlWebpackPlugin({
    filename: config.build.index,
    template: 'src/client/pages/home/index.html',
    inject: true,
    // 压缩配置
    minify: {
        // 去除注释
        removeComments: true,
        // 去除空格
        collapseWhitespace: true,
        // 去除属性引号
        removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
})
```

3. `webpack`

```js
// 作用域提升,提升代码在浏览器执行速度
new webpack.optimize.ModuleConcatenationPlugin(),

// 根据模块相对路径生成四位数hash值作为模块id
new webpack.HashedModuleIdsPlugin()
```

4. `copy-webpack-plugin `

```js
// 将整个文件复制到构建输出时的指定目录下
new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
    }
])
```

* 压缩打包后的文件

```js
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
```

* 可视化分析项目打包后各个文件的体积大小

```js
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
```



