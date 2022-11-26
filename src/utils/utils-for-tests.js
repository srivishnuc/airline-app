import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// As a basic setup, import your same slice reducers
import { users } from '../Redux/Reducer/user';
import { admins } from '../Redux/Reducer/admin';
import { staffs } from '../Redux/Reducer/staff';
import PropTypes from 'prop-types';

export function renderWithProviders(
 ui,
 {
  preloadedState = {},
  // Automatically create a store instance if no store was passed in
  store = configureStore({
   reducer: { users, admins, staffs },
   preloadedState
  }),
  ...renderOptions
 } = {}
) {
 function Wrapper({ children }) {
  return (
   <Provider store={store}>
    <Router>{children}</Router>
   </Provider>
  );
 }
 Wrapper.propTypes = {
  children: PropTypes.element
 };

 // Return an object with the store and all of RTL's query functions
 return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
