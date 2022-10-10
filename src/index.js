import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { users } from './Redux/Reducer/user';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const store = configureStore({
    reducer: { users }
})
//Webpack hot module replacement
if (module.hot) module.hot.accept()


root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

