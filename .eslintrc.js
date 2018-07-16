
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