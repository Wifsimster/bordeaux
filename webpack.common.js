const path = require("path")
const webpack = require("webpack")
const packageJson = require("./package.json")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  entry: ["@babel/polyfill", path.join(__dirname, "src/frontend/app.js")],
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/"
  },
  resolve: {
    modules: [path.join(__dirname, "src/"), "node_modules"],
    alias: {
      components: path.resolve(__dirname, "src/frontend/components/"),
      fonts: path.resolve(__dirname, "src/frontend/fonts/"),
      pages: path.resolve(__dirname, "src/frontend/pages/"),
      plugins: path.resolve(__dirname, "src/frontend/plugins/"),
      store: path.resolve(__dirname, "src/frontend/store/"),
      scss: path.resolve(__dirname, "src/frontend/scss/")
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
      BUILD_DATE: JSON.stringify(new Date()),
      UUID: JSON.stringify("67d119bc-e8ae-45ff-8cf3-0fc876576a6a")
    })
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
      { test: /\.(woff|woff2)$/, loader: "url-loader" }
    ]
  }
}
