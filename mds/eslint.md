##### plugins : 

* `eslint`
* `eslint-loader`
* `eslint-plugin-html`
* `eslint-plugin-import`
* `eslint-plugin-promise`
* `eslint-plugin-standard`
* `eslint-config-standard`

.eslintrc 文件配置

```js

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'standard',
  plugins: [
    'html'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    // some other rules ...
  }
}

```

.eslintignore 文件配置

```js
build/*
config/*
```



