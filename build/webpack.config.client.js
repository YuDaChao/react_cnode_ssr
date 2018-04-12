const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]-[hash].js',
    publicPath: '/publish'
  }
};
