const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', path.resolve('src/frontend/app.js')],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    pathinfo: false
  },
  devServer: {
    contentBase: path.join(__dirname),
    historyApiFallback: true,
    publicPath: '/dist',
    compress: true,
    port: 9001,
    open: true,
    hot: true
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      components: path.resolve(__dirname, 'src/frontend/components/'),
      pages: path.resolve(__dirname, 'src/frontend/pages/'),
      store: path.resolve(__dirname, 'src/frontend/store/'),
      scss: path.resolve(__dirname, 'src/frontend/scss/')
    }
  },
  plugins: [new CleanWebpackPlugin(), new VueLoaderPlugin()],
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=100000&name=../img/[name].[ext]'
      },
      {
        test: /\.(woff(2)?|eot|otf|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'file-loader?name=../fonts/[name].[ext]'
      }
    ]
  }
}
