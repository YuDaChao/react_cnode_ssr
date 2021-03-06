const axios = require('axios');
const path = require('path');
const MemoryFs = require('memory-fs');
const webpack = require('webpack');
const ReactDomServer = require('react-dom/server');
const proxy = require('http-proxy-middleware');

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

const mfs = new MemoryFs;
const Module = module.constructor;
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({}, (err, state) => {
  if (err) {
    throw err
  }
  state = state.toJson();
  state.errors.forEach(err => console.log(err));

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename,
  )

  const bundle = mfs.readFileSync(bundlePath, 'utf-8');
  const m = new Module();
  m._compile(bundle, "server-entry.js");
  serverBundle = m.exports.default

});

module.exports = function (app) {

  app.use("/public", proxy({
    target: 'http://localhost:8000'
  }))

  app.get("*", function (req, res) {
    getTemplate()
      .then(template => {
        const content = ReactDomServer.renderToString(serverBundle);
        res.send(template.replace("<!-- app -->", content))
      })
  })
};
