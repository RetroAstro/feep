
const path = require('path')

module.exports = {
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: false,
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        // npm run build --report
        bundleAnalyzerReport: process.env.npm_config_report,
        bundleIntelligentDashboard: process.env.npm_config_dashboard
    },
    dev: {
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
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
        cssSourceMap: true
    }
}