const path = require("path")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const packageJson = require("../package.json")

module.exports = {
  entry: [path.join(__dirname, "../src/frontend/app")],
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/"
  },
  resolve: {
    modules: [path.join(__dirname, "../src/"), "node_modules"],
    alias: {
      img: path.join(__dirname, "../static/img/"),
      fonts: path.join(__dirname, "../static/fonts/"),
      components: path.join(__dirname, "../src/frontend/components/"),
      pages: path.join(__dirname, "../src/frontend/pages/"),
      plugins: path.join(__dirname, "../src/frontend/plugins/"),
      store: path.join(__dirname, "../src/frontend/store/"),
      scss: path.join(__dirname, "../src/frontend/scss/")
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
      BUILD_DATE: JSON.stringify(new Date()),
      UUID: JSON.stringify("67d119bc-e8ae-45ff-8cf3-0fc876576a6a")
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: "./static/img/*",
        to: "./"
      },
      {
        from: "./static/manifest.json",
        to: "./static"
      },
      {
        from: "./src/frontend/service-worker.js",
        to: "./"
      }
    ])
  ],
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: ["vue-style-loader", "css-loader"] },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/img/[name].[ext]"
        }
      },
      {
        test: /\.(woff(2)?|eot|otf|ttf|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/fonts/[name].[ext]"
        }
      }
    ]
  }
}
