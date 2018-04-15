const axios = require('axios');
const webpack = require('webpack');

const serverConfig = require('../../build/webpack.config.server');


const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8000/public/index.html")
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
};


const serverCompiler = webpack(serverConfig);
serverCompiler.watch({}, (err, state) => {
  if (err) {
    throw err
  }
  console.log(state)
});

module.exports = function (app) {
  app.get("*", function (req, res) {

  })
};
