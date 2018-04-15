import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import createBrowserHistory from 'history/createBrowserHistory'

import createAppStore from './store/createAppStore'

const history = createBrowserHistory();
const store = createAppStore(history, {});


import App from './App.jsx'

const rootEl = document.getElementById("root");

const render = Component => {
  ReactDom.hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Component />
          </Switch>
        </BrowserRouter>
      </Provider>
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
