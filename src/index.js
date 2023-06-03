import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);
root.render(
 <GoogleOAuthProvider clientId="774473172124-e09fsid29td3npr5f77jd29cm15cq84v.apps.googleusercontent.com">
  <Provider store={store}>
   <Router>
    <App />
   </Router>
  </Provider>
 </GoogleOAuthProvider>
);

// Webpack hot module replacement
if (module.hot) module.hot.accept();
