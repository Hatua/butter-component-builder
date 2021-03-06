const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const { config, jsxConfig, cssConfig } = require('./webpack.config');

const CSS_LOADER_OPTIONS = 'sourceMaps&localIdentName=[name]_[local]--[hash:base64:5]&-autoprefixer';

Array.prototype.push.apply(jsxConfig.use.options.plugins, [
  require('babel-plugin-transform-react-jsx-source'), require('react-hot-loader/babel')
])
jsxConfig.use.options.cacheDirectory = true
jsxConfig.exclude = [/node_modules\/[^butter]/, /dist/]

module.exports = Object.assign(config, {
  mode: 'development',

  devtool: 'inline-source-map', // use cheap-eval-source-map for slower builds but better debugging
  devServer: {
    contentBase: [process.cwd()],
    hot: true,
    overlay: {
      // warnings: true,
      errors: true
    },
    port: 3000,
    host: 'localhost',
    progress: true
  },
  entry: Object.assign(config.entry, {
    builder: [path.join(__dirname, '../index.js')],
    app: [
      'react-hot-loader/patch',
      ...(config.entry.app || []),
    ],
  }),

  resolve: config.resolve,

  output: config.output,

  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...config.plugins,
  ],

  module: {
    rules: [
      jsxConfig,
      ...config.module.rules,
      ...cssConfig(CSS_LOADER_OPTIONS),
    ],
  },
});
