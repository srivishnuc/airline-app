import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { users } from './Redux/Reducer/user';
import { admins } from './Redux/Reducer/admin';
import { staffs } from './Redux/Reducer/staff';

const store = configureStore({
 reducer: { users, admins, staffs }
});
// Webpack hot module replacement
if (module.hot) module.hot.accept();

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
 <Provider store={store}>
  <Router>
   <App />
  </Router>
 </Provider>
);
