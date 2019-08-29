const path = require("path")
const webpack = require("webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const uuid = require("uuid")

module.exports = {
  mode: "production",
  entry: ["@babel/polyfill", path.resolve("src/frontend/app.js")],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist/",
    pathinfo: false
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    alias: {
      components: path.resolve(__dirname, "src/frontend/components/"),
      fonts: path.resolve(__dirname, "src/frontend/fonts/"),
      pages: path.resolve(__dirname, "src/frontend/pages/"),
      store: path.resolve(__dirname, "src/frontend/store/"),
      scss: path.resolve(__dirname, "src/frontend/scss/")
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      UUID: JSON.stringify(uuid.v4())
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
