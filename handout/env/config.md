在进行前端工程化环境搭建时, 有一些常用的配置信息需要我们单独写文件配置然后再写入到其他文件中, 这样在做一些更改时就可以直接去配置信息的文件中更改而不用每个文件都需要去修改，因而避免了不必要的错误。

```js
// index.js

const path = require('path')

module.exports = {
    build: {
        // 设置 index.html 的正确路径
        index: path.resolve(__dirname, '../dist/index.html'),
        // 设置 dist 文件夹正确输出到项目根目录的路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 设置 dist 文件夹下静态资源的文件名
        assetsSubDirectory: 'static',
        // 设置打包后的公共路径 
        assetsPublicPath: './',
        productionSourceMap: false,
        // 压缩文件
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        // npm run build --report 可视化打包后的各种文件大小
        bundleAnalyzerReport: process.env.npm_config_report,
        bundleIntelligentDashboard: process.env.npm_config_dashboard
    },
    dev: {
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // 反向代理
        proxyTable: {
            // If the agent's protocol is http, you can configure like this:
            '/api': {
                target: 'http://localhost',
                changeOrigin: true
            },
            // If the proxy protocol is https, you need to configure this：
            '/api': {
                target: {
                  host: 'google.com',
                  protocol: 'https:',
                  port: 443
                },
                changeOrigin: true,
                logLevel: 'info',
                secure: false
            }
        },
        // 开发环境下开启 SourceMap, 方便调试
        cssSourceMap: true
    }
}

```

