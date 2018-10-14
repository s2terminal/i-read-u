const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const SizePlugin = require('size-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new SizePlugin()
  ]
});
