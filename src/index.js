// import Offline from 'offline-plugin/runtime'
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import AppContainer from 'react-hot-loader/lib/AppContainer';

import { createClientStore } from './store';

import { Portal } from './containers';


const initialState = {
  loadUserReducer: {
    // some data if we need it
  },
};

const store = createClientStore(initialState);

delete AppContainer.prototype.unstable_handleError;

export const Root = () => (
  <Provider store={store}>
    <AppContainer>
      <BrowserRouter>
        <Route exact path="/" component={Portal} />
      </BrowserRouter>
    </AppContainer>
  </Provider>
);

if (!module.hot) {
  render(<Root />, document.querySelector('react'));
}
