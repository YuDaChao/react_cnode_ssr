const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
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

if (isDev) {
  config.entry = {
    app: [
      "react-hot-loader/patch",
      config.entry.app
    ]
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
  config.devServer = {
    host: "0.0.0.0",
    port: 8000,
    contentBase: path.join(__dirname, "../dist"),
    publicPath: "/public/",
    overlay: {
      error: true
    },
    hot: true,
    historyApiFallback: {
      index: "/public/index.html"
    }
  }
}


module.exports = config;
