在使用 webpack 打包项目时, 需要区分开发环境和生产环境, 这点可以通过 package.json 中设置的脚本命令将不同的环境变量 ( NODE_ENV ) 传入我们打包时运行的 webpack 配置文件。但不管是开发环境还是生产环境下都有一些相同的基础配置, 因此才有了 webpack.base.conf.js 文件的存在意义, 之后我们再利用 `webpack-merge` 这个插件将不同环境下的配置与基础配置合并, 通过 NODE_ENV 变量判断脚本运行时应该执行那种环境下的操作。

在基础配置中主要有以下几点需要注意 : 

* 设置打包时的入口文件路径与输出文件路径

暂时这里是单页面代码配置, 会尽快添加多页面的配置

```js
entry: {
    // 单页应用打包时的文件入口
    app: resolve('src/client/pages/home/main.js')
},
output: {
    // 打包后输出的路径
    path: config.build.assetsRoot,
    // 打包后输出的文件名
    filename: '[name].js',
    // 设置打包后的公共路径(根目录), 如设置为 'page' 线上就为 https://xxx.com/page/xxx
    publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath
}
```

* resolve 选项的配置

```js
resolve: {
    // 自动解析文件扩展名 (补全文件后缀) 优先级: 左 => 右
    extensions: ['.js', '.vue'],
    // 指定模块解析路径, 优化 webpack 打包速度
    modules: [
       resolve('src'),
       resolve('node_modules')
    ],
    // 设置别名, 简化了 import 时的路径书写
    alias: {
       'vue$': 'vue/dist/vue.esm.js',
       '@': resolve('src'),
       '@components': resolve('src/client/components'),
       '@router': resolve('src/client/router'),
       '@store': resolve('src/client/store'),
       '@home': resolve('src/client/pages/home/views')
    }
}
```

* rules 的配置

1. eslint-loader

```js
{
    test: /\.(js|vue)$/,
    use: [
        {
          loader: 'eslint-loader'
        }
    ],
    // 前置 loader, 即在其他 loader 执行前进行代码规范检测
    enforce: 'pre',
    // 指定打包时模块解析路径
    include: [resolve('src')],
    // 排除打包时模块解析路径
    exclude: /node_modules/
}
```

2. vue-loader

```js
{
    test: /\.vue$/,
    loader: 'vue-loader',
    include: [resolve('src/client')],
    exclude: /node_modules/,
    options: {
        // 加载 cssLoaders 配置, 即使用 css-loader、postcss-loader、stylus-loader等
        loaders: vueLoaderConfig
    }
}
```

3. babel-loader

```js
// babel 转换 ES6+ 代码时在 webpack 中需要加载 babel-loader
{
    test: /\.js$/,
    loader: 'babel-loader', 
    include: resolve("src"),
    exclude: /node_modules/
}
```

4. url-loader

````js
// 解决项目打包后图片、音频、视频等引用路径不正确的问题, 另外还需安装 file-loader 插件才能运行
{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    include: [resolve('src/client/assets/')],
    // 当图片小于 10000 字节时会转化为 dataURL
    options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
},
{
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[hash:7].[ext]')
    }
}
````

* plugins

```js
// 新版本的 vue-loader 需要加载 VueLoaderPlugin 插件
plugins: [
    new VueLoaderPlugin()
]
```





