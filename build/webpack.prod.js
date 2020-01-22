const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const glob = require('glob-all')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new PurgecssPlugin({
      paths: glob.sync([
        path.join(__dirname, '../**/*.html'),
        path.join(__dirname, '../**/*.vue')
      ]),
      extractors: [
        {
          extractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          extensions: ['html', 'vue']
        }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].bundle.css',
      chunkFilename: 'static/css/[id].bundle.css'
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
        test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(woff(2)?|eot|otf|ttf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[ext]'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
})
