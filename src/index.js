import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);
root.render(
 <Provider store={store}>
  <Router>
   <App />
  </Router>
 </Provider>
);

// Webpack hot module replacement
if (module.hot) module.hot.accept();
