#### 多页面开发增加配置项 :

* 修改 utils.js, 增加工具类函数

1. 安装 `glob` 插件

它允许你使用 * 等符号, 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件。

2. 多入口文件处理

```js
// 拼接 pages 文件夹所在路径
const pagePath = path.resolve(__dirname, '../src/client/pages')

// 多入口文件配置
// 读取 pages 文件夹下的 js 后缀文件并作为入口处理
exports.entries = function () {
  var entriyFiles = glob.sync(pagePath + '/*/*.js')
  var map = {}
  entriyFiles.forEach( filePath => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
  })
  return map
}
```

3. 多页面输出配置

```js

exports.htmlPlugin = function () {
  var entryHtmls = glob.sync(pagePath + '/*/*.html')
  var arr = []
  entryHtmls.forEach( filePath => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    var config = {
      template: filePath,
      filename: filename + '.html',
      /* 
       加这行的目的是让每个页面模板加载对应的文件,不然每个页面就会引入
       打包后的所有文件。
       若在 splitChunks 的 cacheGroups 中自定义分割代码, name 属性
       必须要与下面设置的 chunks 一致, 不然打包后会出现问题。
      */
      chunks: ['manifest', 'vendor', filename],
      // 注入静态资源
      inject: true,
      // 按照依赖情况调整 chunks 的顺序
      chunksSortMode: 'dependency'
    }
    // 生产环境下执行 minify 操作
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

```

* 修改 webpack.base.conf.js

```js
// 将 entry 改为调用多入口配置的函数
entry: utils.entries()
```

* 修改 webpack.dev.conf.js

```js

// 注释掉 HtmlWebpackPlugin 配置, 增加多页面输出函数
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

```

```js
// 在 devServer 中使用 historyApiFallback
devServer: {
    // ...
    historyApiFallback: {
        // 需要开发哪个页面时就更改为哪个页面
        rewrites: [
            { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'home.html') }
        ]
    }
    // ...
}
```

* 修改 webpack.prod.conf.js

```js
// 与 webpack.dev.conf.js 中要修改的地方一样
plugins: [
    ..........
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'src/client/pages/home/index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency'
    // }),
    ..........
    ])
].concat(utils.htmlPlugin())
```

测试下更改完配置后的效果, 在控制台输入 `npm run build --report ` ，输出如下 : 

[![P1nj6H.png](https://s1.ax1x.com/2018/07/18/P1nj6H.png)](https://imgchr.com/i/P1nj6H)

可以看到, 引入的第三方库被打包为 vendor.js，另外还有两个页面的 JS 文件以及 runtime 时的 manifest 文件。

这样一来多页面开发配置就完成啦 😄