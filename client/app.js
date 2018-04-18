import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import createBrowserHistory from 'history/createBrowserHistory'
import createAppStore from './store/createAppStore'

import App from './App.jsx'


const history = createBrowserHistory();
const store = createAppStore(history, {});

const rootEl = document.getElementById('root');

const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl,
  )
};

render(App);

// ReactDom.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default;
    render(NextApp)
  })
}
