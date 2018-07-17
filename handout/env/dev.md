开发环境下的配置需要注意的几个点 : 

* mode 选项

这是 webpack 4 新增的一个属性, 用于改变 process.env.NODE_ENV 的值, 但它只有 development 和 production 

两个选项, 因此我们还是需要自己更改 NODE_ENV 变量以便区分不同环境下要进行的操作如 test 环境。

* devtool 选项

选择一种 source map 格式来增强调试过程，不同的值会明显影响到构建 (build) 和重新构建 (rebuild) 的速度。

* devServer 选项

webpack 为我们提供的方便于项目开发的本地服务器，如可以使用模块热重载、反向代理解决本地跨域问题、方便 vue-router 使用 history 模式等。

```js
const devWebpackConfig = merge(baseWebpackConfig, {
    // 将 process.env.NODE_ENV 的值设为 development
    mode: 'development',
    // 解析外联样式文件
    module: {
      rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // 增强调试
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        // 开发环境下的服务器端口
        port: config.dev.port,
        // 反向代理配置
        proxy: config.dev.proxyTable,
        // 方便 vue-router 使用 history 模式, 基于 HTML5 history API
        historyApiFallback: {
          rewrites: [
            { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
          ],
        },
        // 热加载
        hot: true,
        // 压缩代码, 起到加快开发流程和优化作用
        compress: true,
        // 自动打开浏览器
        open: true,
        // 终端输出的只有初始启动信息, webpack 的警告和错误是不输出到终端的
        quiet: true
    },
    plugins: [
      // 开启模块热重载的插件
      new webpack.HotModuleReplacementPlugin(),
      // 显示模块相对路径
      new webpack.NamedModulesPlugin(),
      // 配置 html 模板入口信息
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/client/pages/home/index.html',
        inject: true
      }),
      // 编译提示插件
      new FriendlyErrorsPlugin()
    ]
})
```

