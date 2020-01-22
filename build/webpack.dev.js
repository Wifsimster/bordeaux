
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(woff(2)?|eot|otf|ttf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[ext]'
        }
      },
    ]
  },
  devServer: {
    contentBase: __dirname,
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: '/index.html' }]
    },
    compress: true,
    port: 80,
    hot: true,
    // open: true,
    host: 'localhost'
    // host: "192.168.0.20"
  }
})
