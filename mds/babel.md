##### plugins : 

* `babel-core`
* `babel-loader`
* `babel-eslint`

检测 Eslint 暂未支持的类型和语法

* `babel-polyfill`

兼容完整的 ES2015+ 的语法, 但会污染全局作用域而且打包后体积较大

* `babel-preset-env`

默认对 ES2015 、2016、2017 三个版本的 ES 语法进行转化

* `babel-preset-stage-2`

使用 ECMAScript 标准中处于第二阶段即草案阶段的语法

* `babel-plugin-syntax-dynamic-import`

解决动态引入模块的问题, 例如 : 

```js
  import('moment').then(function(moment) {
    console.log(moment().format());
  }).catch(function(err) {
    console.log('Failed to load moment', err);
  });
```

> 如果 .babelrc 配置项中使用了 stage-2 , 也可以不使用该插件，同样支持动态模块引入。

如何使用？ 

首先 npm install -D 上面所提到的你认为必要的插件 

然后是 webpack.config.js 中的配置 : 

```js
module: {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}
```

最后是一般 Vue 项目中 .babelrc 文件配置 : 

```js
// .babelrc

{
  "presets": [
    "stage-2"
  ],
  "plugins": [
    "syntax-dynamic-import"
  ],
  // 在这里根据 NODE_ENV 环境变量的不同从而采取不同操作
  "env": {
    // 客户端
    "browser": {
      "presets": [
        [
          "env", {
            // 默认为 CommonJS 规范
            "modules": false,
            // 指定浏览器兼容版本
            "targets": {
              "browsers": ["last 2 versions", "safari >= 7"]
            }
          }
        ]
      ]
    },
    // Node端
    "node": {
      "presets": [
        [
          "env", {
            // 编译 NodeJS 代码
            "targets": {
              "node": "current"
            }
          }
        ]
      ]
    }
  }
}

```







