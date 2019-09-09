const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const path = require("path")

module.exports = merge(common, {
  mode: "development",
  devServer: {
    https: {
      cert: "./ssl/certificate.crt",
      key: "./ssl/private.key"
    },
    contentBase: path.join(__dirname),
    historyApiFallback: true,
    compress: true,
    port: 8082,
    open: true,
    hot: true,
    host: "localhost"
    // host: "192.168.0.20"
  }
})
