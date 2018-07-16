#### package.json 文件在整个项目中十分重要, 主要有以下几个点需要注意 :

1. dependencies ( 项目依赖 ) 与 devDependencies ( 开发环境依赖 )

像 vue 、vue-router、vuex 这些项目中需要依赖的库应该使用 `npm install -S` , 而其他的很多插件只是辅助开发就直接 `npm install -D` 就可以了。

2. "scripts" 的书写

项目中不同环境下需要运行不同的脚本指令, 如常用的有 : 

```js
// 开始打包项目
"build": "rimraf dist && npm run build:client",
"build:client": "cross-env NODE_ENV=production node build/build.js"
```

```js
// 运行开发环境
"dev": "npm run dev:client",
"dev:client": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.dev.conf.js"
```

```js
// 检测代码规范与自动修复
"lint": "eslint --ext .js --ext .vue src/",
"lint-fix": "eslint --fix --ext .js --ext .vue src/"
```

```js
// 使用 Git hooks 自动检查代码, 在每次 commit 前修复为正确的代码规范
"precommit": "npm run lint-fix"
```

涉及到的几个插件 : 

* `rimraf`

删除指定文件夹及其以下的所有文件

* `cross-env`

兼容性的设置环境变量 NODE_ENV 

* `husky`

使用 Git 钩子可以用来自动检查代码等

3. 设置 browserslist 

这样可以使 .babelrc 里和 .postcssrc 中 autoprefixer 设置的浏览器兼容选项得到统一

```js
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
```







