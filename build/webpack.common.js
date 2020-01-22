/* eslint-disable no-undef */
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const packageJson = require('../package.json')

module.exports = {
  entry: [path.join(__dirname, '../src/app')],
  output: {
    filename: 'static/js/[name].bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    modules: [path.join(__dirname, '../src/'), 'node_modules'],
    alias: {
      img: path.join(__dirname, '../static/img/'),
      fonts: path.join(__dirname, '../static/fonts/'),
      components: path.join(__dirname, '../src/components/'),
      pages: path.join(__dirname, '../src/pages/'),
      plugins: path.join(__dirname, '../src/plugins/'),
      store: path.join(__dirname, '../src/store/'),
      scss: path.join(__dirname, '../src/scss/')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
      BUILD_DATE: JSON.stringify(new Date()),
      UUID: JSON.stringify('67d119bc-e8ae-45ff-8cf3-0fc876576a6a')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: './static/img/*',
        to: './'
      },
      {
        from: './static/manifest.json',
        to: './static'
      },
      {
        from: './src/service-worker.js',
        to: './'
      }
    ]),
  ]
}
