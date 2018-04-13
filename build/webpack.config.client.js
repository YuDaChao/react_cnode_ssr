const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]-[hash].js',
    publicPath: '/public/'
  },
  module: {
    rules: [
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
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "../client/template.html")
    })
  ]
};
