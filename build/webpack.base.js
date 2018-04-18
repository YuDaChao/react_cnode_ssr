const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: path.join(__dirname, "../node_modules")
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [
          path.join(__dirname, './node_modules')
        ]
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader"
      }
    ]
  },
}
