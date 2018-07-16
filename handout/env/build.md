#### plugins : 

* `ora`

实现 node 环境下的 loading 效果, 显示各种状态的图标

* `chalk` 

用于修改控制台中字符串的样式、颜色等

```js

var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')

// 获取生产环境下的 webpack 配置文件
var webpackConfig = require('./webpack.prod.conf')

// 开始打包项目
var spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    // 输出打包后的各项属性
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    // 打包完成
    console.log( chalk.cyan('  Build complete.\n') )
})

```

项目正确打包完成后, 输出应该类似如下 : 

[![PQfv80.png](https://s1.ax1x.com/2018/07/16/PQfv80.png)](https://imgchr.com/i/PQfv80)

