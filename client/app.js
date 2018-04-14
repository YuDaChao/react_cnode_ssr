import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader';

import App from './App.jsx'


const rootEl = document.getElementById("root");

const render = Component => {
  ReactDom.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  )
};

render(App);

// ReactDom.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    const NextApp = require('./App.jsx').default;
    render(NextApp)
  })
}
