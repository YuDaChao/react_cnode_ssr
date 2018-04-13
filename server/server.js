const express = require('express');
const path = require('path');
const fs = require('fs');
const ReactSSR = require('react-dom/server');
const serverEntry = require('../dist/server-entry').default;

const html = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf-8");

const app = express();

app.use("/public", express.static(path.join(__dirname, "../dist")));

app.get("*", function (req, res) {
  const appString = ReactSSR.renderToString(serverEntry);
  const template = html.replace("<!-- app -->", appString);
  res.send(template)
});

app.listen(3000, function () {
  console.log('server is running at 30000')
})
